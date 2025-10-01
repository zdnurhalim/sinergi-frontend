import React, { useState } from 'react';
import { JobRequirementService } from '@/services/JobRequirementService';
import { AuthenticationService } from "@/services/AuthenticationService";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/onboarding/Header';
import GlassmorphicCard from '@/components/onboarding/GlassmorphicCard';
import RegistrationCard from '@/components/onboarding/RegistrationCard';
import { setJobRequirement, setError, setLoading } from '@/store/JobRequirementSlice';
import { setAuth, setAuthLoading } from '@/store/AuthSlice';
import { useDispatch } from 'react-redux';

const jobRequirementService = new JobRequirementService();
const authService = new AuthenticationService();

const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState<'form' | 'register'>('form');
  const [onboardingData, setOnboardingData] = useState<{ companyInfo: string; talentInfo: string; claimToken: string } | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});

  const handleNext = async (companyInfo: string, talentInfo: string) => {
    setFormErrors({});
    dispatch(setLoading(true));
    try {
      const response = await jobRequirementService.createGuestJobAd({
        company_description: companyInfo,
        talent_description: talentInfo,
      });

      const rawData = response.data;  
      dispatch(setJobRequirement(rawData));
      dispatch(setError(null));

      setOnboardingData({ companyInfo, talentInfo, claimToken: rawData.claim_token });
      setStep('register');
    } catch (error: any) {
      if (error.status === 422 && error.errors) {
        setFormErrors(error.errors);
      } else {
        dispatch(setError(error.message || "Terjadi kesalahan"));
        alert(error.message || "Terjadi kesalahan");
      }
    }
  };

  const handleRegister = async (data: { email: string; password: string; fullName: string; company: string }) => {
    try {
      const response = await authService.register({
        name: data.fullName,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        company_name: data.company,
        claim_token: onboardingData?.claimToken || '', 
      });

      localStorage.setItem("authToken", response.token);
      const authData = response.data;
      const token = response.token;

      dispatch(setAuth({ data: authData, token }));
      dispatch(setAuthLoading(false));
      
      navigate('/dashboard/create-job');
    } catch (error: any) {
      if (error.status === 422 && error.errors) {
        setFormErrors(error.errors);
      } else {
        dispatch(setError(error.message || "Terjadi kesalahan"));
        alert(error.message || "Terjadi kesalahan");
      }
    }
  };

  const handleLogin = () => navigate('/login');
  const handleBack = () => setStep('form');

  return (
    <div className="min-h-screen relative flex flex-col antialiased overflow-hidden"
    style={{
        backgroundImage:
          "url('https://api.builder.io/api/v1/image/assets/TEMP/df095bc2f4e8115febab0386b8096ac19c3a4553?placeholderIfAbsent=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="pointer-events-none absolute inset-x-0 top-[-20rem] mx-auto h-[40rem] w-[80rem] opacity-60 blur-3xl" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center, rgba(170,205,229,0.25), rgba(246,193,120,0.18) 40%, rgba(170,205,229,0.1) 60%, transparent 70%)' }}></div>
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(120,119,198,0.3)_0%,_rgba(255,255,255,0)_70%)]" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-2xl space-y-8">
          <Header/>
          {step === 'form' ? (
            // <div className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl shadow-2xl p-8 transform transition duration-300 hover:scale-105">
              <GlassmorphicCard onNext={handleNext} errors={formErrors} />
            // </div>
          ) : (
            // <div className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl shadow-2xl p-8 transform transition duration-300 hover:scale-105">
              <RegistrationCard 
                onBack={handleBack}
                onRegister={handleRegister}
                onLogin={handleLogin}
                errors={formErrors}
              />
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;