import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { api, sendEmailOtp, verifyEmailOtp } from "../../lib/api";
import { useAuth } from "../../context/useAuthHook";
import { Eye, EyeOff, GraduationCap, ArrowLeft } from "lucide-react";
import authHeroImg from "../../assets/login.webp";

/* ═══════════════════════════════════════════════════════════
   WARM EARTHY PALETTE
   cream #F2E6D9 | terracotta #B86A45 | caramel #D19A5B
   cinnamon #A46A3F | chocolate #5A3626
═══════════════════════════════════════════════════════════ */

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  /* ── Glass Input ── */
  .glass-input {
    background:rgba(255,251,245,0.4) !important;
    backdrop-filter:blur(16px) saturate(180%);
    -webkit-backdrop-filter:blur(16px) saturate(180%);
    border:1px solid rgba(209,154,91,0.28) !important;
    color:#3a1f10 !important;
    transition:all 0.3s ease;
    font-family:'DM Sans',sans-serif;
  }
  .glass-input:focus {
    background:rgba(255,251,245,0.65) !important;
    border-color:rgba(184,106,69,0.65) !important;
    box-shadow:0 0 0 3px rgba(209,154,91,0.12),inset 0 1px 0 rgba(255,255,255,0.5) !important;
  }
  .glass-input::placeholder { color:rgba(90,54,38,0.38) !important; }

  /* ── Animations ── */
  @keyframes mandala-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .mandala-spin { animation:mandala-spin 120s linear infinite; }
  .mandala-spin-rev { animation:mandala-spin 80s linear infinite reverse; }

  @keyframes shimmer {
    0%{background-position:-200% center;}
    100%{background-position:200% center;}
  }
  .btn-shimmer { background-size:200% auto; animation:shimmer 3s linear infinite; }

  @keyframes float-up {
    0%{transform:translateY(0) scale(1);opacity:0.7;}
    100%{transform:translateY(-140px) scale(0.2);opacity:0;}
  }
  .particle { position:absolute; border-radius:50%; pointer-events:none; animation:float-up linear infinite; }

  /* Grain */
  .grain::after {
    content:''; position:absolute; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events:none; z-index:1; border-radius:inherit; opacity:0.6;
  }

  .font-serif-display { font-family:'Cormorant Garamond',Georgia,serif; }
  .font-body { font-family:'DM Sans',system-ui,sans-serif; }
`;

/* ─── Floating particles ─── */
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="particle" style={{
        width: `${3 + Math.random() * 5}px`, height: `${3 + Math.random() * 5}px`,
        left: `${10 + Math.random() * 80}%`, bottom: `${Math.random() * 25}%`,
        background: ['#D19A5B','#B86A45','#A46A3F'][i % 3],
        animationDuration: `${4 + Math.random() * 7}s`,
        animationDelay: `${Math.random() * 5}s`,
      }} />
    ))}
  </div>
);

/* ─── Colour tokens ─── */
const C = { cream:'#F2E6D9', terracotta:'#B86A45', caramel:'#D19A5B', cinnamon:'#A46A3F', chocolate:'#5A3626' };

/* ─── Glass Input ─── */
const GlassInput = ({ name, type='text', value, onChange, placeholder, required, rightSlot, style }) => (
  <div className="relative">
    <input
      name={name} type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      className="glass-input font-body w-full px-5 py-3 rounded-2xl outline-none text-sm"
      style={{ paddingRight: rightSlot ? '2.8rem' : undefined, ...style }}
    />
    {rightSlot && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</div>}
  </div>
);

/* ─── InputGroup ─── */
const InputGroup = ({ label, name, value, onChange, placeholder, type='text' }) => (
  <div className="space-y-1 flex-1">
    <label className="font-body text-[10px] font-semibold uppercase tracking-widest ml-1" style={{ color: C.chocolate }}>{label}</label>
    <GlassInput name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required />
  </div>
);

/* ─── OTP Email Field ─── */
const OtpEmailField = ({ formData, handleChange, isEmailVerified, isOtpSent, otp, setOtp, otpStatus, isVerifying, otpCooldown, handleSendOtp, handleVerifyOtp }) => (
  <div className="space-y-1.5">
    <label className="font-body text-[10px] font-semibold uppercase tracking-widest ml-1 flex items-center gap-2" style={{ color: C.chocolate }}>
      Email Address
      {isEmailVerified && <span className="text-[9px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold lowercase tracking-normal">✓ verified</span>}
    </label>
    <div className="flex gap-2">
      <GlassInput name="email" type="email" value={formData.email} onChange={handleChange} placeholder="shastri@kaumudi.com" required />
      {!isEmailVerified && (
        <button type="button" onClick={handleSendOtp} disabled={isVerifying || otpCooldown > 0}
          className="font-body px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all"
          style={{ background: isVerifying || otpCooldown > 0 ? `${C.cinnamon}90` : `linear-gradient(135deg,${C.chocolate},${C.terracotta})`, color: C.cream, border: '1px solid rgba(255,255,255,0.2)' }}>
          {isVerifying ? '…' : otpCooldown > 0 ? `${otpCooldown}s` : isOtpSent ? 'Resend' : 'Send OTP'}
        </button>
      )}
    </div>
    {!isEmailVerified && isOtpSent && (
      <div className="flex gap-2 mt-2">
        <GlassInput type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter 4-digit OTP" />
        <button type="button" onClick={handleVerifyOtp}
          className="font-body px-5 py-3 rounded-2xl font-bold text-sm transition-all"
          style={{ background: C.caramel, color: C.chocolate, border: '1px solid rgba(255,255,255,0.3)' }}>
          {isVerifying ? '…' : 'Verify'}
        </button>
      </div>
    )}
    {otpStatus.msg && (
      <p className={`font-body text-[11px] mt-1 font-semibold ${otpStatus.type==='success'?'text-emerald-700':'text-red-600'}`}>{otpStatus.msg}</p>
    )}
  </div>
);

/* ─── Submit Button ─── */
const SubmitButton = ({ loading, text, disabled }) => (
  <motion.button
    whileHover={!disabled&&!loading?{scale:1.02,y:-2}:{}}
    whileTap={!disabled&&!loading?{scale:0.98}:{}}
    disabled={disabled||loading} type="submit"
    className="font-body w-full py-4 rounded-2xl font-bold uppercase tracking-[0.3em] flex items-center justify-center mt-5 text-xs relative overflow-hidden btn-shimmer"
    style={{
      background: disabled||loading ? `${C.cinnamon}70`
        : `linear-gradient(135deg,${C.chocolate} 0%,${C.terracotta} 50%,${C.caramel} 100%)`,
      color: C.cream,
      boxShadow: disabled||loading ? 'none' : `0 8px 32px rgba(90,54,38,0.38),inset 0 1px 0 rgba(255,255,255,0.18)`,
      border: '1px solid rgba(255,255,255,0.18)',
      cursor: disabled||loading ? 'not-allowed' : 'pointer',
    }}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
        Processing...
      </span>
    ) : text}
  </motion.button>
);

/* ══════════════════════════════════════════
   MAIN AUTH PAGE
══════════════════════════════════════════ */
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { token } = useParams();

  useEffect(() => {
    if (token) return;
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode==='signup'){setIsLogin(false);setIsForgot(false);}
    else if(mode==='login'){setIsLogin(true);setIsForgot(false);}
    else if(mode==='forgot'){setIsLogin(true);setIsForgot(true);}
  }, [location.search, token]);

  const initialFormData = { firstName:'',lastName:'',email:'',password:'',confirmPassword:'',phoneNumber:'',address:'',role:'STUDENT' };
  const [loading,setLoading]=useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [isOtpSent,setIsOtpSent]=useState(false);
  const [otp,setOtp]=useState('');
  const [isEmailVerified,setIsEmailVerified]=useState(false);
  const [isVerifying,setIsVerifying]=useState(false);
  const [otpStatus,setOtpStatus]=useState({type:'',msg:''});
  const [otpCooldown,setOtpCooldown]=useState(0);

  useEffect(()=>{
    if(otpCooldown<=0)return;
    const t=setInterval(()=>setOtpCooldown(s=>s-1),1000);
    return()=>clearInterval(t);
  },[otpCooldown]);

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData({...formData,[name]:value});
    if(!isLogin&&name==='email'){
      if(isEmailVerified)setIsEmailVerified(false);
      if(isOtpSent)setIsOtpSent(false);
      if(otp)setOtp('');
      if(otpStatus.msg)setOtpStatus({type:'',msg:''});
      if(otpCooldown)setOtpCooldown(0);
    }
  };

  const handleSendOtp=async()=>{
    try{
      const userData={firstName:formData.firstName,lastName:formData.lastName,email:formData.email,password:formData.password,
        ...(formData.phoneNumber?.trim()&&{phoneNumber:formData.phoneNumber.trim()}),
        ...(formData.address?.trim()&&{address:formData.address.trim()})};
      const resp=await sendEmailOtp(formData.email,userData);
      if(resp?.success){setIsOtpSent(true);setOtpCooldown(60);setOtpStatus({type:'success',msg:'OTP sent to your email'});}
      else{const msgs=resp?.errors?.length?resp.errors.map(e=>e.message).join(', '):resp?.message||'Failed to send OTP';setOtpStatus({type:'error',msg:msgs});toast.error(msgs);}
    }catch(err){
      const errors=err.response?.data?.errors;
      const msg=errors?.length?errors.map(e=>e.message).join(', '):err.response?.data?.message||'Failed to send OTP';
      setOtpStatus({type:'error',msg});toast.error(msg);
    }finally{setIsVerifying(false);}
  };

  const handleVerifyOtp=async()=>{
    if(!otp||!formData.email){setOtpStatus({type:'error',msg:'Enter the OTP received'});return;}
    setIsVerifying(true);setOtpStatus({type:'',msg:''});
    try{
      const resp=await verifyEmailOtp(formData.email,otp.trim());
      if(resp?.success){setIsEmailVerified(true);setIsOtpSent(false);setOtp('');setOtpStatus({type:'success',msg:'Email verified'});}
      else{setOtpStatus({type:'error',msg:resp?.message||'Invalid or expired OTP'});}
    }catch{setOtpStatus({type:'error',msg:'Verification failed'});}
    finally{setIsVerifying(false);}
  };

  const handleForgotPassword=async(e)=>{
    e.preventDefault();setLoading(true);
    try{const res=await api.post('/auth/forgot-password',{email:formData.email,role:'STUDENT'});toast.success(res.data.message||'Reset link sent!');setIsForgot(false);}
    catch(err){toast.error(err.response?.data?.message||'Error sending reset link');}
    finally{setLoading(false);}
  };

  const handleResetPassword=async(e)=>{
    e.preventDefault();
    if(formData.password!==formData.confirmPassword){toast.error('Passwords do not match!');return;}
    setLoading(true);
    try{const res=await api.post(`/auth/reset-password/${token}`,{newPassword:formData.password,confirmPassword:formData.confirmPassword});toast.success(res.data.message||'Password updated!');navigate('/auth');}
    catch(err){toast.error(err.response?.data?.message||'Token invalid or expired');}
    finally{setLoading(false);}
  };

  const handleAuth=async(e)=>{
    e.preventDefault();setLoading(true);
    try{
      if(isLogin){
        const res=await api.post('/auth/login',{email:formData.email,password:formData.password,role:formData.role});
        if(res?.data?.token){
          const up=res?.data?.user||res?.data?.student||res?.data?.data||{};
          const firstName=up?.firstName||up?.firstname||formData.firstName||null;
          const lastName=up?.lastName||up?.lastname||formData.lastName||null;
          const name=up?.name||up?.fullName||(firstName||lastName?[firstName,lastName].filter(Boolean).join(' '):null);
          login({email:formData.email,role:res.data.role||formData.role,firstName,lastName,name},res.data.token);
        }
        setFormData(initialFormData);
        const from=location?.state?.from;const intended=typeof from==='string'?from:from?.pathname;
        const userRole=res?.data?.role||formData.role;
        navigate(intended||(userRole==='STUDENT'?'/student/overview':userRole==='ADMIN'||userRole==='SUPER_ADMIN'?'/admin':'/profile'));
      }else{
        if(!formData.firstName.trim()||!formData.lastName.trim()||!formData.email.trim()){toast.error('Please fill first name, last name, and email.');setLoading(false);return;}
        if(formData.password.length<8){toast.error('Password must be at least 8 characters.');setLoading(false);return;}
        if(!/[A-Za-z]/.test(formData.password)){toast.error('Password must contain at least one letter.');setLoading(false);return;}
        if(!/\d/.test(formData.password)){toast.error('Password must contain at least one number.');setLoading(false);return;}
        if(formData.phoneNumber?.trim()&&!/^[6-9]\d{9}$/.test(formData.phoneNumber.trim())){toast.error('Phone number must be a valid 10-digit Indian number.');setLoading(false);return;}
        if(formData.address?.trim()&&formData.address.trim().length<5){toast.error('Address must be at least 5 characters.');setLoading(false);return;}
        if(formData.password!==formData.confirmPassword){toast.error('Passwords do not match!');setLoading(false);return;}
        if(!isEmailVerified){toast.error('Please verify your email with OTP before creating account.');setLoading(false);return;}
        const payload={firstName:formData.firstName,lastName:formData.lastName,email:formData.email,password:formData.password};
        if(formData.phoneNumber?.trim())payload.phoneNumber=formData.phoneNumber.trim();
        if(formData.address?.trim())payload.address=formData.address.trim();
        const response=await api.post('/auth/student/register',payload);
        if(!response.data.success){if(response.data.errors?.length)response.data.errors.forEach(err=>toast.error(err.message));else toast.error(response.data.message||'Registration failed');return;}
        setFormData(initialFormData);setIsEmailVerified(false);setIsOtpSent(false);setOtp('');setIsLogin(true);toast.success('Registration Successful! Please Login.');
      }
    }catch(err){toast.error(err.response?.data?.errors?err.response.data.errors[0].message:err.response?.data?.message||'Something went wrong');}
    finally{setLoading(false);}
  };

  const fadeUp={
    initial:{opacity:0,y:24,filter:'blur(8px)'},
    animate:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:0.45,ease:[0.22,1,0.36,1]}},
    exit:{opacity:0,y:-14,filter:'blur(6px)',transition:{duration:0.28}},
  };

  const isReversed = !isLogin || isForgot || token;

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <div
        className="font-body w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#EDD9BE 0%,#F2E6D9 40%,#E0CAA8 80%,#D4B896 100%)' }}
      >
        {/* Mandala rings */}
        <div className="mandala-spin absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]" style={{border:`2px solid ${C.terracotta}`}}/>
        <div className="mandala-spin absolute -top-36 -left-36 w-[550px] h-[550px] rounded-full pointer-events-none opacity-[0.04]" style={{border:`1px dashed ${C.cinnamon}`}}/>
        <div className="mandala-spin-rev absolute -bottom-48 -right-48 w-[620px] h-[620px] rounded-full pointer-events-none opacity-[0.05]" style={{border:`2px solid ${C.caramel}`}}/>

        {/* Ambient glow blobs */}
        <motion.div animate={{scale:[1,1.2,1],opacity:[0.15,0.28,0.15]}} transition={{duration:9,repeat:Infinity}}
          className="absolute top-10 right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{background:C.caramel,filter:'blur(90px)'}}/>
        <motion.div animate={{scale:[1,1.1,1],opacity:[0.1,0.2,0.1]}} transition={{duration:12,repeat:Infinity,delay:3}}
          className="absolute bottom-0 left-10 w-72 h-72 rounded-full pointer-events-none"
          style={{background:C.terracotta,filter:'blur(100px)'}}/>

        {/* ── MAIN CARD ── */}
        <motion.div
          layout
          initial={{opacity:0,y:60,scale:0.96}}
          animate={{opacity:1,y:0,scale:1}}
          transition={{duration:0.9,ease:[0.22,1,0.36,1]}}
          className={`grain relative w-full max-w-[1040px] min-h-[640px] rounded-[52px] overflow-hidden flex flex-col md:flex-row transition-all duration-1000 ease-in-out ${isReversed?'md:flex-row-reverse':''}`}
          style={{
            background: 'rgba(242,230,217,0.12)',
            backdropFilter:'blur(40px) saturate(160%)',
            WebkitBackdropFilter:'blur(40px) saturate(160%)',
            boxShadow:`0 60px 140px rgba(90,54,38,0.28),0 0 0 1px rgba(255,255,255,0.38),inset 0 1px 0 rgba(255,255,255,0.55)`,
            border:'1px solid rgba(255,255,255,0.42)',
          }}
        >
          {/* ── LEFT HERO ── */}
          <motion.div
            layout
            className="relative w-full md:w-[48%] min-h-[340px] md:min-h-auto overflow-hidden"
            style={{background:`linear-gradient(160deg,${C.chocolate} 0%,#3a1a0a 100%)`,borderRadius:'52px'}}
          >
            <motion.img
              initial={{scale:1.25}} animate={{scale:1}}
              transition={{duration:12,repeat:Infinity,repeatType:'reverse'}}
              src={authHeroImg}
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
            <div className="absolute inset-0" style={{background: `linear-gradient(to top, rgba(90,54,38,0.7) 0%, rgba(90,54,38,0.3) 45%, rgba(0,0,0,0.1) 100%)`}}/>
            <div className="absolute top-0 left-0 right-0 h-px" style={{background:'rgba(255,255,255,0.12)'}}/>

            <Particles />

            {/* Text content */}
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20 text-white">
              {/* Logo chip — clicking navigates to home */}
              <motion.button
                whileHover={{scale:1.04,y:-1}}
                onClick={() => navigate('/')}
                className="flex items-center gap-3 w-fit p-3 rounded-2xl cursor-pointer"
                style={{
                  background:'rgba(242,230,217,0.1)',
                  backdropFilter:'blur(20px)',
                  border:'1px solid rgba(255,255,255,0.16)',
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,0.18)',
                }}
              >
                <div className="p-2 rounded-xl" style={{background:C.caramel,boxShadow:`0 4px 14px rgba(209,154,91,0.45)`}}>
                  <GraduationCap size={24} style={{color:C.chocolate}}/>
                </div>
                <span className="font-body font-bold tracking-[0.18em] text-[11px]" style={{color:C.cream}}>KAUMUDI ACADEMY</span>
              </motion.button>

              {/* Sanskrit + headline */}
              <div className="space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div key={isLogin?'h1':'h2'} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} className="space-y-3">
                    <div className="inline-block px-3 py-1 text-[9px] font-bold rounded-full tracking-widest uppercase"
                      style={{background:`${C.caramel}28`,color:C.caramel,border:`1px solid ${C.caramel}45`}}>
                      {token?'पासवर्ड परिवर्तनम्':isForgot?'संकेतशब्द विस्मरणम्':isLogin?'पुनरागतं स्वागतम्':'नूतन पञ्जीकरणम्'}
                    </div>
                    <h2 className="font-serif-display text-4xl md:text-5xl font-bold leading-[1.1]">
                      {isLogin?'Deepen Your':'Start Your'}<br/>
                      <span style={{color:C.caramel}}>Vedic Journey.</span>
                    </h2>
                    <div className="space-y-0.5">
                      <p className="font-serif-display italic text-[13px] font-semibold" style={{color:C.caramel}}>
                        {isLogin?'"सा विद्या या विमुक्त"':'"न हि ज्ञानेन सदृशं पवित्रमिह विद्यते"'}
                      </p>
                      <p className="font-body text-[11px] leading-relaxed" style={{color:'rgba(242,230,217,0.5)'}}>
                        {isLogin?'Knowledge is that which liberates.':'Nothing is more sacred than knowledge.'}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{background:`linear-gradient(to right,${C.caramel}55,transparent)`}}/>
                  <span className="font-body text-[9px] uppercase tracking-[0.2em] font-bold" style={{color:C.caramel}}>Kaumudi Academy</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT FORM ── */}
          <motion.div
            layout
            className="w-full md:w-[52%] p-6 md:p-12 flex flex-col justify-center relative"
            style={{background:'rgba(255,251,245,0.5)',backdropFilter:'blur(20px)'}}
          >
            <div className="absolute top-0 left-8 right-8 h-px" style={{background:`linear-gradient(to right,transparent,rgba(209,154,91,0.35),transparent)`}}/>

            <AnimatePresence mode="wait">
              {/* 1. RESET PASSWORD */}
              {token ? (
                <motion.div key="reset" {...fadeUp} className="w-full space-y-8">
                  <header>
                    <h1 className="font-serif-display text-4xl font-bold mb-1" style={{color:C.chocolate}}>New Password</h1>
                    <p className="font-body text-[12px]" style={{color:C.cinnamon}}>Set a strong new password for your account.</p>
                  </header>
                  <form className="space-y-5" onSubmit={handleResetPassword}>
                    <InputGroup label="New Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••"/>
                    <InputGroup label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"/>
                    <SubmitButton loading={loading} text="Update Password"/>
                  </form>
                </motion.div>

              ) : isForgot ? (
                /* 2. FORGOT */
                <motion.div key="forgot" {...fadeUp} className="w-full space-y-8">
                  <button onClick={()=>setIsForgot(false)} className="font-body flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:gap-3 transition-all" style={{color:C.chocolate}}>
                    <ArrowLeft size={13}/> Back to Login
                  </button>
                  <header>
                    <h1 className="font-serif-display text-4xl font-bold mb-1" style={{color:C.chocolate}}>Recover Access</h1>
                    <p className="font-body text-[12px]" style={{color:C.cinnamon}}>Enter your email to receive a divine reset link.</p>
                  </header>
                  <form className="space-y-5" onSubmit={handleForgotPassword}>
                    <div className="space-y-1">
                      <label className="font-body text-[10px] font-semibold uppercase tracking-widest ml-1" style={{color:C.chocolate}}>Email Address</label>
                      <GlassInput name="email" type="email" value={formData.email} onChange={handleChange} placeholder="shastri@kaumudi.com" required/>
                    </div>
                    <SubmitButton loading={loading} text="Send Recovery Link"/>
                  </form>
                </motion.div>

              ) : (
                /* 3. LOGIN / SIGNUP */
                <motion.div key={isLogin?'login':'signup'} {...fadeUp} className="w-full">
                  <header className={isLogin?'mb-8':'mb-5'}>
                    <h1 className="font-serif-display text-4xl font-bold mb-1" style={{color:C.chocolate}}>
                      {isLogin?'Welcome Back':'Join the Gurukul'}
                    </h1>
                    <p className="font-body text-[12px]" style={{color:C.cinnamon}}>
                      {isLogin?'Sign in to access your Vedas.':'Register for the divine wisdom.'}
                    </p>
                  </header>

                  <form className={`space-y-${isLogin?'5':'4'}`} onSubmit={handleAuth}>
                    {!isLogin && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <InputGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Vikram"/>
                          <InputGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Shastri"/>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <InputGroup label="Phone" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="9876543210"/>
                          <InputGroup label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Varanasi"/>
                        </div>
                      </>
                    )}

                    {isLogin ? (
                      <InputGroup label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="shastri@kaumudi.com"/>
                    ) : (
                      <OtpEmailField formData={formData} handleChange={handleChange} isEmailVerified={isEmailVerified}
                        isOtpSent={isOtpSent} otp={otp} setOtp={setOtp} otpStatus={otpStatus}
                        isVerifying={isVerifying} otpCooldown={otpCooldown}
                        handleSendOtp={handleSendOtp} handleVerifyOtp={handleVerifyOtp}/>
                    )}

                    <div className="space-y-1">
                      <div className="flex justify-between px-1">
                        <label className="font-body text-[10px] font-semibold uppercase tracking-widest" style={{color:C.chocolate}}>Password</label>
                        {isLogin && (
                          <button type="button" onClick={()=>setIsForgot(true)} className="font-body text-[10px] font-bold hover:underline transition-all" style={{color:C.terracotta}}>
                            Forgot?
                          </button>
                        )}
                      </div>
                      <GlassInput name="password" type={showPass?'text':'password'} value={formData.password} onChange={handleChange} placeholder="••••••••" required
                        rightSlot={<button type="button" onClick={()=>setShowPass(!showPass)} style={{color:C.cinnamon}}>{showPass?<EyeOff size={16}/>:<Eye size={16}/>}</button>}/>
                    </div>

                    {!isLogin && (
                      <InputGroup label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"/>
                    )}

                    <SubmitButton loading={loading} disabled={!isLogin&&!isEmailVerified}
                      text={isLogin?'Enter Gurukul':isEmailVerified?'Create Account':'Verify Email First'}/>
                  </form>

                  <div className="relative flex items-center justify-center my-6">
                    <div className="w-full h-px" style={{background:`linear-gradient(to right,transparent,${C.caramel}38,transparent)`}}/>
                    <span className="absolute font-body text-[10px] tracking-widest px-3 font-semibold" style={{background:'rgba(255,251,245,0.65)',color:`${C.cinnamon}70`}}>ॐ</span>
                  </div>

                  <footer className="text-center">
                    <p className="font-body text-xs" style={{color:C.cinnamon}}>
                      {isLogin?'New to the Academy?':'Already a Vidhyarthi?'}
                      <button onClick={()=>setIsLogin(!isLogin)}
                        className="ml-2 font-bold transition-all hover:opacity-70"
                        style={{color:C.chocolate,borderBottom:`2px solid ${C.caramel}`,paddingBottom:'1px'}}>
                        {isLogin?'Create Account':'Login Now'}
                      </button>
                    </p>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;