import React, { useState } from 'react';

interface RegistrationCardProps {
  onBack?: () => void;
  onRegister?: (data: { email: string; password: string; fullName: string; company: string }) => void;
  onLogin?: () => void;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({ onBack, onRegister, onLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (onLogin) {
        onLogin();
      }
    } else {
      if (onRegister) {
        onRegister({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          company: formData.company
        });
      }
    }
  };

  return (
    <main className="relative shadow-[2px_2px_24px_12px_rgba(255,255,255,0.25)_inset,1px_24px_40px_0_rgba(0,0,0,0.25)] backdrop-blur-[30px] bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.05)_100%),linear-gradient(150deg,rgba(255,255,255,0.05)_4.38%,rgba(203,203,203,0.05)_35.03%,rgba(255,255,255,0.05)_63.26%,rgba(203,203,203,0.05)_96.5%)] self-center w-[726px] max-w-full font-normal mt-[113px] p-6 rounded-3xl border-[0.6px] border-solid border-[rgba(255,255,255,0.50)] max-md:mt-10 max-md:px-5">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-white text-base leading-loose tracking-[0.24px] max-md:max-w-full">
          {isLogin ? 'Welcome back to Sinergi.AI' : 'Create your Sinergi.AI account'}
        </h1>
      </div>
      
      <hr className="border min-h-0 w-full mt-4 border-[rgba(255,255,255,0.5)] border-solid max-md:max-w-full" />
      
      <form className="w-full mt-4 max-md:max-w-full" onSubmit={handleSubmit}>
        <div className="w-full pb-6 space-y-4 max-md:max-w-full">
          {!isLogin && (
            <>
              <div className="w-full">
                <label className="flex w-full gap-0.5 text-sm text-white tracking-[0.28px] leading-[22px] px-2 py-0.5 max-md:max-w-full">
                  <span className="flex-1 shrink basis-[0%] max-md:max-w-full">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full text-xs text-[#F3F0F2] tracking-[0.24px] leading-loose mt-2 px-6 py-3 rounded-lg border border-[#A49098] bg-transparent focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-[#F3F0F2] max-md:px-5"
                  required
                />
              </div>

              <div className="w-full">
                <label className="flex w-full gap-0.5 text-sm text-white tracking-[0.28px] leading-[22px] px-2 py-0.5 max-md:max-w-full">
                  <span className="flex-1 shrink basis-[0%] max-md:max-w-full">
                    Company Name
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full text-xs text-[#F3F0F2] tracking-[0.24px] leading-loose mt-2 px-6 py-3 rounded-lg border border-[#A49098] bg-transparent focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-[#F3F0F2] max-md:px-5"
                  required
                />
              </div>
            </>
          )}

          <div className="w-full">
            <label className="flex w-full gap-0.5 text-sm text-white tracking-[0.28px] leading-[22px] px-2 py-0.5 max-md:max-w-full">
              <span className="flex-1 shrink basis-[0%] max-md:max-w-full">
                Email Address
              </span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full text-xs text-[#F3F0F2] tracking-[0.24px] leading-loose mt-2 px-6 py-3 rounded-lg border border-[#A49098] bg-transparent focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-[#F3F0F2] max-md:px-5"
              required
            />
          </div>

          <div className="w-full">
            <label className="flex w-full gap-0.5 text-sm text-white tracking-[0.28px] leading-[22px] px-2 py-0.5 max-md:max-w-full">
              <span className="flex-1 shrink basis-[0%] max-md:max-w-full">
                Password
              </span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              className="w-full text-xs text-[#F3F0F2] tracking-[0.24px] leading-loose mt-2 px-6 py-3 rounded-lg border border-[#A49098] bg-transparent focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-[#F3F0F2] max-md:px-5"
              required
            />
          </div>

          {!isLogin && (
            <div className="w-full">
              <label className="flex w-full gap-0.5 text-sm text-white tracking-[0.28px] leading-[22px] px-2 py-0.5 max-md:max-w-full">
                <span className="flex-1 shrink basis-[0%] max-md:max-w-full">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="w-full text-xs text-[#F3F0F2] tracking-[0.24px] leading-loose mt-2 px-6 py-3 rounded-lg border border-[#A49098] bg-transparent focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-[#F3F0F2] max-md:px-5"
                required
              />
            </div>
          )}
        </div>
        
        <div className="flex w-full flex-col gap-4 mt-6 max-md:max-w-full">
          <button
            type="submit"
            className="flex justify-center items-center gap-2 text-[13px] text-[#66575C] font-semibold whitespace-nowrap tracking-[0.52px] leading-none px-6 py-3 rounded-lg bg-white hover:bg-gray-100 transition-colors duration-200 max-md:px-5"
          >
            <span className="self-stretch my-auto">
              {isLogin ? 'Sign In' : 'Create Account'}
            </span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08" stroke="#66575C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white text-sm underline hover:text-gray-300 transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>

          {!isLogin && (
            <p className="text-[#F3F0F2] text-xs text-center opacity-70 px-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default RegistrationCard;