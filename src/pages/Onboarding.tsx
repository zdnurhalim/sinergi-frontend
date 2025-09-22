import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/onboarding/Header';
import GlassmorphicCard from '@/components/onboarding/GlassmorphicCard';
import RegistrationCard from '@/components/onboarding/RegistrationCard';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'register'>('form');
  const [onboardingData, setOnboardingData] = useState<{
    companyInfo: string;
    talentInfo: string;
  } | null>(null);

  const handleNext = (companyInfo: string, talentInfo: string) => {
    // Store the onboarding data
    setOnboardingData({ companyInfo, talentInfo });
    console.log('Company Info:', companyInfo);
    console.log('Talent Info:', talentInfo);
    
    // Move to registration step
    setStep('register');
  };

  const handleRegister = (data: { email: string; password: string; fullName: string; company: string }) => {
    // Store registration data (you can later integrate with a backend)
    console.log('Registration Data:', data);
    console.log('Onboarding Data:', onboardingData);
    
    // Navigate to dashboard after registration
    navigate('/dashboard');
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
          <GlassmorphicCard onNext={handleNext} />
        ) : (
          <RegistrationCard 
            onBack={handleBack}
            onRegister={handleRegister}
            onLogin={handleLogin}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;