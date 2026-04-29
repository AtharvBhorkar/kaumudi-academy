import razorpay from "../configs/razorpay.js";
import Payment from "../models/Payment.model.js";
import Enrollment from "../models/Enrollment.model.js";
import crypto from "crypto";
import { config } from "../configs/env.js";
import Course from "../models/Course.model.js";
import Coupon from "../models/Coupon.model.js";
import { createEnrollment } from "./enrollment.controller.js";
import { createNotification, notifyAdmins, notifyStudent, notifyBoth } from "../services/notification.service.js";
import axios from "axios"
import StudentFee from "../models/StudentFee.model.js";
import { sendCourseEnrollmentSuccessMail } from "../services/mail.service.js";
import Student from "../models/Student.model.js"
import { formatEnrollmentId } from "../utils/enrollment.utils.js";

// Helper function price clean karne ke liye (6,499 -> 6499)
const sanitizePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(price.toString().replace(/[^0-9.]/g, ""));
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { courseId, couponCode, paymentMode, captchaToken } = req.body;

    // CAPTCHA VERIFY
    // Skip captcha verification in development mode or when SKIP_CAPTCHA is set
    const skipCaptcha = process.env.NODE_ENV === "development" || process.env.SKIP_CAPTCHA === "true" || process.env.SKIP_CAPTCHA === true;
    
    if (!skipCaptcha) {
      if (!captchaToken) {
        return res.status(400).json({
          success: false,
          message: "Captcha verification required"
        });
      }
      
      try {
        const captchaVerify = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify`,
          null,
          {
            params: {
              secret: process.env.RECAPTCHA_SECRET_KEY,
              response: captchaToken
            },
            timeout: 5000 // 5 second timeout
          }
        );

        if (!captchaVerify.data.success) {
          return res.status(400).json({
            success: false,
            message: "Captcha verification failed"
          });
        }
      } catch (captchaError) {
        console.error("CAPTCHA VERIFICATION ERROR:", captchaError.message);
        // Allow payment to proceed if captcha verification fails due to network issues
        if (captchaError.code === 'ETIMEDOUT' || captchaError.code === 'ENOTFOUND') {
          console.warn("Captcha verification timed out - allowing request (network issue)");
        } else {
          return res.status(400).json({
            success: false,
            message: "Captcha verification error. Please try again."
          });
        }
      }
    } else {
      console.log("CAPTCHA VERIFICATION SKIPPED (development mode or SKIP_CAPTCHA=true)");
    }

    // 1. Course find
    const course = await Course.findById(courseId);
    if (!course || course.status !== "ACTIVE") {
      return res.status(404).json({
        success: false,
        message: "Course not available"
      });
    }

    // Get user details for notification
    const user = await Student.findById(req.user._id).select("firstName lastName fullName email");

    // 2. Price clean
    const originalAmount = Number(course.price.toString().replace(/,/g, ""));
    if (isNaN(originalAmount)) {
      throw new Error("Invalid price format in database");
    }

    let discountAmount = 0;
    let appliedCoupon = null;

    // 3. Coupon Logic
    if (couponCode && couponCode.trim() !== "") {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        startTime: { $lte: new Date() },
        endTime: { $gte: new Date() }
      });

      if (coupon) {
        const type = coupon.discountType || "percentage";
        const value =
          coupon.discountValue !== undefined && coupon.discountValue !== null
            ? Number(coupon.discountValue)
            : Number(coupon.discountPercentage || 0);

        if (!Number.isNaN(value) && value > 0) {
          if (type === "flat") {
            discountAmount = value;
          } else {
            discountAmount = (originalAmount * value) / 100;
          }
          discountAmount = Math.min(discountAmount, originalAmount);
          appliedCoupon = coupon.code;
        }
      }
    }

    // Calculate discounted amount AFTER coupon is applied
    const discountedAmount = Math.max(originalAmount - discountAmount, 0);

    // Add processing fee - only once (for full payment or first EMI installment)
    const processingFee = 99;

    // Calculate payable amount based on payment mode
    // For EMI: First payment = 1/3 of discounted amount + processing fee (only once)
    // For FULL: Pay the full discounted amount + processing fee
    let finalAmount = discountedAmount;
    if (paymentMode === "EMI") {
      const emiBase = Math.round((discountedAmount / 3) * 100) / 100;
      finalAmount = emiBase + processingFee;
    } else {
      finalAmount = discountedAmount + processingFee;
    }

    // 4. Razorpay Order
    // Validate amount before creating order (Razorpay max: 10,00,000 INR)
    const maxRazorpayAmount = 1000000; // 10 lakh INR in rupees
    if (finalAmount > maxRazorpayAmount) {
      return res.status(400).json({
        success: false,
        message: `Course price exceeds maximum allowed amount (₹${maxRazorpayAmount.toLocaleString('en-IN')}). Please contact support.`
      });
    }

    const options = {
      amount: Math.round(finalAmount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };

    // ── DEMO MODE: generate a fake order when Razorpay keys are not configured ──
    let order;

    if (!razorpay) {
      console.warn("Razorpay not initialised – running in DEMO MODE. Using fake order.");
      order = {
        id: "fake_order_" + Date.now(),
        amount: options.amount,
        currency: options.currency,
      };
    } else {
      try {
        order = await razorpay.orders.create(options);
      } catch (razorpayError) {
        console.error("RAZORPAY API ERROR:", razorpayError);

        if (razorpayError.statusCode === 400) {
          return res.status(400).json({
            success: false,
            message: razorpayError.error?.description || "Invalid payment amount. Please check course pricing."
          });
        }

        return res.status(500).json({
          success: false,
          message: "Payment gateway error",
        });
      }
    }
    // ─────────────────────────────────────────────────────────────────────────────

    // 5. Payment Create
    console.log("Creating payment for user:", req.user._id, "course:", courseId);
    
    // For EMI, store the base amount without processing fee
    const paymentFinalAmount = paymentMode === "EMI" 
      ? Math.round((discountedAmount / 3) * 100) / 100  // Base EMI without processing fee
      : finalAmount;
    
    const payment = await Payment.create({
      user: req.user._id,
      course: courseId,
      originalAmount,
      discountAmount,
      finalAmount: paymentFinalAmount,
      processingFee: paymentMode === "EMI" ? processingFee : (paymentMode === "FULL" ? processingFee : 0),
      paymentMode: paymentMode || "FULL",
      couponCode: appliedCoupon,
      razorpayOrderId: order.id,
      status: "PENDING"
    });

    // 🔔 NOTIFICATION: Payment Initiated
    const payerName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : (user.fullName || 'A student');
      
    await notifyAdmins({
      title: "Payment Initiated",
      message: `${payerName} started payment for ${course.title} - ₹${finalAmount}`,
      type: "PAYMENT",
      subType: "PAYMENT_INITIATED",
      actionUrl: "/admin/payments",
      priority: "MEDIUM",
      metadata: { 
        courseId, 
        courseName: course.title,
        paymentId: payment._id, 
        amount: finalAmount 
      },
      userId: req.user._id,
      userRole: "STUDENT"
    });

    // Build EMI details if EMI mode is selected
    const emiBase = Math.round((discountedAmount / 3) * 100) / 100;
    const emiDetails = paymentMode === "EMI" ? {
      isEmi: true,
      totalAmount: discountedAmount,
      processingFee: processingFee,
      firstPayment: emiBase + processingFee,
      remainingAmount: discountedAmount - emiBase,
      installments: 3,
      installmentAmount: emiBase,
      perMonth: emiBase
    } : null;

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      originalAmount,
      discountAmount,
      discountedAmount,
      finalAmount: paymentFinalAmount,
      processingFee: paymentMode === "EMI" ? processingFee : processingFee,
      emiDetails
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create order"
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = req.body;

    // ── DEMO MODE: skip signature verification for fake orders ──
    const isDemoOrder = razorpayOrderId?.startsWith("fake_order_");

    if (!isDemoOrder) {
      const body = razorpayOrderId + "|" + razorpayPaymentId;

      const expectedSignature = crypto
        .createHmac("sha256", config.RAZORPAY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment signature"
        });
      }
    } else {
      console.warn("DEMO MODE – skipping signature verification for fake order:", razorpayOrderId);
    }
    // ────────────────────────────────────────────────────────────

    const payment = await Payment.findOne({ razorpayOrderId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    payment.status = "SUCCESS";
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    await payment.save();

    console.log("Payment verified - creating enrollment for student:", payment.user, "course:", payment.course);

    try {
      await createEnrollment({
        studentId: payment.user,
        courseId: payment.course,
        paymentId: payment._id
      });
      console.log("Enrollment created successfully!");
    } catch (enrollmentError) {
      console.error("ERROR creating enrollment:", enrollmentError);
    }

    const course = await Course.findById(payment.course);

    const discountedTotal = payment.originalAmount - payment.discountAmount;
    const remainingAmount = Math.max(discountedTotal - payment.finalAmount, 0);

    const student = await Student.findById(payment.user).select('_id createdAt studentId');
    const formattedEnrollmentId = student ? formatEnrollmentId(student._id, student.createdAt) : null;

    console.log("Creating/updating StudentFee for student:", payment.user, "course:", payment.course);

    const existingFee = await StudentFee.findOne({
      student: payment.user,
      course: payment.course
    });

    if (existingFee) {
      existingFee.paidAmount = payment.finalAmount;
      existingFee.remainingAmount = remainingAmount;
      existingFee.payment = payment._id;
      existingFee.paymentStatus = payment.paymentMode === "EMI" ? "PARTIAL" : "PAID";
      await existingFee.save();
      console.log("StudentFee updated:", existingFee._id);
    } else {
      await StudentFee.create({
        student: payment.user,
        course: payment.course,
        totalAmount: discountedTotal,
        paidAmount: payment.finalAmount,
        remainingAmount: remainingAmount,
        paymentMode: payment.paymentMode,
        payment: payment._id,
        paymentStatus: payment.paymentMode === "EMI" ? "PARTIAL" : "PAID"
      });
      console.log("StudentFee created");
    }

    const user = await Student.findById(payment.user);

    await sendCourseEnrollmentSuccessMail({
      studentEmail: user.email,
      studentName: user.fullName,
      courseTitle: course.title,
      amountPaid: payment.finalAmount,
      paymentMode: payment.paymentMode
    });

    // 🔔 NOTIFICATION: Payment Success
    await notifyBoth({
      adminTitle: "Payment Successful",
      adminMessage: `${user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.fullName || 'A student')} paid ₹${payment.finalAmount} for ${course.title}`,
      studentId: payment.user,
      studentTitle: "Enrollment Confirmed!",
      studentMessage: `You have successfully enrolled in ${course.title}. Your payment of ₹${payment.finalAmount} has been received.`,
      type: "PAYMENT",
      subType: "PAYMENT_SUCCESS",
      adminActionUrl: "/admin/payments",
      studentActionUrl: "/student/courses",
      priority: "HIGH",
      metadata: { 
        courseId: payment.course, 
        courseName: course.title,
        paymentId: payment._id, 
        amount: payment.finalAmount,
        enrollmentId: formattedEnrollmentId
      },
      userId: payment.user,
      userRole: "STUDENT"
    });

    // 🔔 NOTIFICATION: New Enrollment
    await notifyAdmins({
      title: "New Enrollment",
      message: `${user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.fullName || 'A student')} enrolled in ${course.title} - ₹${payment.finalAmount}`,
      type: "ENROLLMENT",
      subType: "NEW_ENROLLMENT",
      actionUrl: "/admin/enrollments",
      priority: "HIGH",
      metadata: { 
        studentId: payment.user, 
        courseId: payment.course, 
        courseName: course.title,
        paymentId: payment._id,
        totalPrice: payment.originalAmount,
        discountAmount: payment.discountAmount,
        paidPrice: payment.finalAmount,
        amount: payment.finalAmount,
        enrollmentId: formattedEnrollmentId
      },
      userId: payment.user,
      userRole: "STUDENT"
    });

    return res.json({
      success: true,
      message: "Payment verified successfully"
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
};

export const fakeVerifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId } = req.body;
    const payment = await Payment.findOne({ razorpayOrderId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    payment.status = "SUCCESS";
    payment.razorpayPaymentId = "FAKE_PAYMENT_ID_" + Date.now();
    payment.razorpaySignature = "FAKE_SIGNATURE";
    await payment.save();

    await createEnrollment({
      studentId: payment.user,
      courseId: payment.course,
      paymentId: payment._id
    });

    const course = await Course.findById(payment.course);
    const user = await Student.findById(payment.user);

    // 🔔 NOTIFICATION: Test Payment Success
    const testPayerName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : (user.fullName || 'A student');
      
    await notifyAdmins({
      title: "Test Payment Verified",
      message: `${testPayerName} paid ₹${payment.finalAmount} for ${course.title}`,
      type: "PAYMENT",
      subType: "PAYMENT_SUCCESS",
      actionUrl: "/admin/payments",
      priority: "MEDIUM",
      metadata: { courseId: payment.course, paymentId: payment._id, isTest: true, amount: payment.finalAmount },
      userId: payment.user,
      userRole: "STUDENT"
    });

    return res.json({
      success: true,
      message: "Fake payment verified"
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

// Create a new Razorpay order for continuing EMI installments
export const createEmiInstallment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user._id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required"
      });
    }

    // Find the student's enrollment for this course with EMI mode
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    }).populate("payment").select('_id createdAt');

    const student = await Student.findById(studentId).select('_id createdAt studentId');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "No enrollment found for this course"
      });
    }

    const payment = enrollment.payment;
    const formattedEnrollmentId = student ? formatEnrollmentId(student._id, student.createdAt) : null;

    const course = await Course.findById(courseId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "No payment record found for this enrollment"
      });
    }

    // Verify this is an EMI payment
    const discountedTotal = payment.originalAmount - payment.discountAmount;
    const paidPercentage = discountedTotal > 0 ? (payment.finalAmount / discountedTotal) * 100 : 0;
    const isEmiPattern = paidPercentage > 0 && paidPercentage < 50;
    
    if (payment.paymentMode !== "EMI" && !isEmiPattern) {
      return res.status(400).json({
        success: false,
        message: "This enrollment is not on EMI mode. Please use full payment."
      });
    }

    const totalPaidSoFar = payment.finalAmount;
    const remainingAmount = discountedTotal - totalPaidSoFar;

    if (remainingAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "EMI is already fully paid"
      });
    }

    const firstPaymentAmount = Math.round((discountedTotal / 3) * 100) / 100;
    const processingFee = 99;
    const expectedPerInstallment = Math.round((discountedTotal - firstPaymentAmount) / 2 * 100) / 100;
    
    const amountPaidBeyondFirst = totalPaidSoFar - firstPaymentAmount - processingFee;
    let installmentsPaid = 0;
    if (amountPaidBeyondFirst > 0) {
      installmentsPaid = Math.round(amountPaidBeyondFirst / expectedPerInstallment);
    }

    console.log("EMI Installment Tracking:", {
      discountedTotal,
      firstPaymentAmount,
      expectedPerInstallment,
      totalPaidSoFar,
      amountPaidBeyondFirst,
      installmentsPaid,
      remainingAmount
    });

    let installmentAmount;
    if (installmentsPaid >= 2) {
      return res.status(400).json({
        success: false,
        message: "All EMI installments have already been paid"
      });
    } else if (installmentsPaid >= 1) {
      installmentAmount = remainingAmount;
    } else {
      installmentAmount = remainingAmount / 2;
    }
    
    console.log("EMI Installment Calculation:", {
      originalAmount: payment.originalAmount,
      discountAmount: payment.discountAmount,
      finalAmount: payment.finalAmount,
      discountedTotal,
      remainingAmount,
      installmentAmount
    });

    const maxRazorpayAmount = 1000000;
    if (installmentAmount > maxRazorpayAmount) {
      return res.status(400).json({
        success: false,
        message: `Installment amount exceeds maximum allowed amount (₹${maxRazorpayAmount.toLocaleString('en-IN')}). Please contact support.`
      });
    }

    const options = {
      amount: Math.round(installmentAmount * 100),
      currency: "INR",
      receipt: `emi_${Date.now()}`
    };

    // ── DEMO MODE: generate a fake EMI order when Razorpay keys are not configured ──
    let order;

    if (!razorpay) {
      console.warn("Razorpay not initialised – running in DEMO MODE. Using fake EMI order.");
      order = {
        id: "fake_emi_order_" + Date.now(),
        amount: options.amount,
        currency: options.currency,
      };
    } else {
      try {
        order = await razorpay.orders.create(options);
      } catch (razorpayError) {
        console.error("RAZORPAY EMI INSTALLMENT ERROR:", razorpayError);
        return res.status(500).json({
          success: false,
          message: "Payment gateway error",
        });
      }
    }
    // ──────────────────────────────────────────────────────────────────────────────────

    const installmentPayment = await Payment.create({
      user: studentId,
      course: courseId,
      originalAmount: payment.originalAmount,
      discountAmount: payment.discountAmount,
      finalAmount: installmentAmount,
      paymentMode: "EMI_INSTALLMENT",
      couponCode: payment.couponCode,
      razorpayOrderId: order.id,
      status: "PENDING",
      isInstallment: true,
      parentPayment: payment._id
    });

    // 🔔 NOTIFICATION: EMI Installment Initiated
    const courseName = course ? course.title : "the course";
    await notifyBoth({
      adminTitle: "EMI Installment Initiated",
      adminMessage: `Student started EMI installment payment for ${courseName}`,
      studentId: studentId,
      studentTitle: "EMI Payment Started",
      studentMessage: `Your next installment payment for ${courseName} has been initiated. Amount: ₹${Math.round(installmentAmount * 100) / 100}`,
      type: "PAYMENT",
      subType: "EMI_INSTALLMENT_INITIATED",
      adminActionUrl: "/admin/payments",
      studentActionUrl: "/student/fees",
      priority: "MEDIUM",
      metadata: { courseId, courseName, installmentPaymentId: installmentPayment._id, amount: installmentAmount, enrollmentId: formattedEnrollmentId },
      userId: studentId,
      userRole: "STUDENT"
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: installmentPayment._id,
      remainingAmount: remainingAmount - installmentAmount,
      installmentNumber: installmentsPaid >= 1 ? 3 : 2,
      debug: {
        originalAmount: payment.originalAmount,
        discountAmount: payment.discountAmount,
        finalAmount: payment.finalAmount,
        discountedTotal,
        remainingAmount,
        installmentAmount,
        installmentsPaid
      }
    });
  } catch (error) {
    console.error("CREATE EMI INSTALLMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create EMI installment order"
    });
  }
};

// Verify EMI installment payment
export const verifyEmiInstallmentPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentId
    } = req.body;

    // ── DEMO MODE: skip signature verification for fake EMI orders ──
    const isDemoOrder = razorpayOrderId?.startsWith("fake_emi_order_");

    if (!isDemoOrder) {
      const body = razorpayOrderId + "|" + razorpayPaymentId;

      const expectedSignature = crypto
        .createHmac("sha256", config.RAZORPAY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment signature"
        });
      }
    } else {
      console.warn("DEMO MODE – skipping signature verification for fake EMI order:", razorpayOrderId);
    }
    // ────────────────────────────────────────────────────────────────

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    const course = await Course.findById(payment.course);
    const studentId = payment.user;
    const courseId = payment.course;

    const enrollment = await Enrollment.findOne({ student: studentId, course: courseId }).select('_id createdAt');
    const student = await Student.findById(studentId).select('_id createdAt studentId');
    const formattedEnrollmentId = student ? formatEnrollmentId(student._id, student.createdAt) : null;

    payment.status = "SUCCESS";
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    await payment.save();

    let newRemaining = 0;
    const parentPayment = await Payment.findById(payment.parentPayment);
    if (parentPayment) {
      parentPayment.finalAmount += payment.finalAmount;
      await parentPayment.save();

      const discountedTotal = parentPayment.originalAmount - parentPayment.discountAmount;
      newRemaining = discountedTotal - parentPayment.finalAmount;

      await StudentFee.findOneAndUpdate(
        { payment: parentPayment._id },
        {
          paidAmount: parentPayment.finalAmount,
          remainingAmount: newRemaining,
          paymentStatus: newRemaining <= 0 ? "PAID" : "PARTIAL"
        }
      );
    }

    // 🔔 NOTIFICATION: EMI Installment Success
    const courseName = course ? course.title : "the course";
    
    const parentPaymentData = parentPayment ? await Payment.findById(payment.parentPayment) : null;
    const totalPrice = parentPaymentData?.originalAmount || payment.originalAmount;
    const totalPaid = parentPaymentData?.finalAmount || payment.finalAmount;
    
    await notifyBoth({
      adminTitle: "EMI Installment Paid",
      adminMessage: `EMI installment of ₹${payment.finalAmount} received for ${courseName}`,
      studentId: studentId,
      studentTitle: "EMI Installment Received",
      studentMessage: `Your installment payment of ₹${payment.finalAmount} for ${courseName} has been received. Remaining: ₹${newRemaining}`,
      type: "PAYMENT",
      subType: "EMI_INSTALLMENT_PAID",
      adminActionUrl: "/admin/payments",
      studentActionUrl: "/student/fees",
      priority: "HIGH",
      metadata: { 
        courseId, 
        courseName, 
        installmentPaymentId: payment._id, 
        amount: payment.finalAmount, 
        totalPrice: totalPrice,
        totalPaid: totalPaid,
        remainingAmount: newRemaining,
        enrollmentId: formattedEnrollmentId
      },
      userId: studentId,
      userRole: "STUDENT"
    });

    return res.json({
      success: true,
      message: "EMI installment payment verified successfully"
    });
  } catch (error) {
    console.error("VERIFY EMI INSTALLMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
};