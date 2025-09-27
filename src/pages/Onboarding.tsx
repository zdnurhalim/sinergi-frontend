import React, { useState } from 'react';
import { JobRequirementService } from '@/services/JobRequirementService';
import { AuthenticationService } from "@/services/AuthenticationService";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/onboarding/Header';
import GlassmorphicCard from '@/components/onboarding/GlassmorphicCard';
import RegistrationCard from '@/components/onboarding/RegistrationCard';
import { setJobRequirement, setError, setLoading } from '@/store/jobRequirementSlice';
import { setAuth, setAuthLoading, setAuthError } from '@/store/AuthSlice';
import { useDispatch } from 'react-redux';

const jobRequirementService = new JobRequirementService();
const authService = new AuthenticationService();

const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState<'form' | 'register'>('form');
  const [onboardingData, setOnboardingData] = useState<{
    companyInfo: string;
    talentInfo: string;
    claimToken: string;
  } | null>(null);
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
      console.log('Received Job Requirement Data:', rawData);
      dispatch(setJobRequirement(rawData));
      dispatch(setError(null));

      setOnboardingData({ companyInfo, talentInfo, claimToken: rawData.claim_token });
      setStep('register');
    } catch (error) {

      if (error.status === 422 && error.errors) {
        setFormErrors(error.errors);
      } else {
        dispatch(setError(error.message || "Terjadi kesalahan"));
        alert(error.message || "Terjadi kesalahan");
      }
    }
  };

  const handleRegister = async  (data: { email: string; password: string; fullName: string; company: string }) => {
    // Store registration data (you can later integrate with a backend)
    console.log('Registration Data:', data);
    console.log('Onboarding Data:', onboardingData);

    try {
      const response = await authService.register({
        name: data.fullName,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        company_name: data.company,
        claim_token: onboardingData?.claimToken || '', 
      });

      console.log("Register success:", response);

      // contoh: simpan token ke localStorage
      localStorage.setItem("authToken", response.token);
      const authData = response.data;
      const token = response.token;

      dispatch(setAuth({ data: authData, token }));
      dispatch(setAuthLoading(false));
      
      navigate('/dashboard/create-job');
    } catch (error) {
      if (error.status === 422 && error.errors) {
        setFormErrors(error.errors);
      } else {
        dispatch(setError(error.message || "Terjadi kesalahan"));
        alert(error.message || "Terjadi kesalahan");
      }
    }
  };

  const handleLogin = () => {
    // Handle login (you can later integrate with authentication)
    console.log('Login requested');
    navigate('/dashboard');
  };

  const handleBack = () => {
    setStep('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,119,198,0.3)_0%,_rgba(255,255,255,0)_70%)]" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-center pt-8 px-4">
        <Header onLoginClick={handleLogin} />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        {step === 'form' ? (
          <GlassmorphicCard onNext={handleNext} errors={formErrors} />
        ) : (
          <RegistrationCard 
            onBack={handleBack}
            onRegister={handleRegister}
            onLogin={handleLogin}
            errors={formErrors}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;