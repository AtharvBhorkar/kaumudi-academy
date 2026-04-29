import Razorpay from "razorpay";
import { config } from "./env.js";

let razorpay = null;

if (config.RAZORPAY_KEY_ID && config.RAZORPAY_SECRET) {
  razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_SECRET,
  });
} else {
  console.warn("⚠️ Razorpay keys missing — running in DEMO MODE");
}

export default razorpay;