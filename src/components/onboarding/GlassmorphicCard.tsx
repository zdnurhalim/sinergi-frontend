import React, { useState } from 'react';
import FormSection from './FormSection';

interface GlassmorphicCardProps {
  onNext?: (companyInfo: string, talentInfo: string) => void;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ onNext }) => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [talentInfo, setTalentInfo] = useState('');

  const handleNext = () => {
    if (onNext) {
      onNext(companyInfo, talentInfo);
    }
  };

  return (
    <main className="relative shadow-[2px_2px_24px_12px_rgba(255,255,255,0.25)_inset,1px_24px_40px_0_rgba(0,0,0,0.25)] backdrop-blur-[30px] bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.05)_100%),linear-gradient(150deg,rgba(255,255,255,0.05)_4.38%,rgba(203,203,203,0.05)_35.03%,rgba(255,255,255,0.05)_63.26%,rgba(203,203,203,0.05)_96.5%)] self-center w-[726px] max-w-full font-normal mt-[113px] p-6 rounded-3xl border-[0.6px] border-solid border-[rgba(255,255,255,0.50)] max-md:mt-10 max-md:px-5">
      <h1 className="text-white text-base leading-loose tracking-[0.24px] max-md:max-w-full">
        Let's try Our Sinergi.AI recruiter module
      </h1>
      
      <hr className="border min-h-0 w-full mt-4 border-[rgba(255,255,255,0.5)] border-solid max-md:max-w-full" />
      
      <form className="w-full mt-4 max-md:max-w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full pb-10 max-md:max-w-full">
          <FormSection
            id="company-info"
            label="Start with short description about your company industry, employee size, company size (small, micro, middle or enterprise) and any other information that you'd like to share"
            value={companyInfo}
            onChange={setCompanyInfo}
          />
          
          <div className="mt-8">
            <FormSection
              id="talent-info"
              label="Describe the talent that you looking for. What is their position, what is their daily task, range of salary that you can offer to this talent, and any other specific detail that you want to add"
              value={talentInfo}
              onChange={setTalentInfo}
            />
          </div>
        </div>
        
        <div className="flex w-full flex-col text-[13px] text-[#66575C] font-semibold whitespace-nowrap tracking-[0.52px] leading-none mt-4 max-md:max-w-full">
          <button
            type="button"
            onClick={handleNext}
            className="justify-center items-center bg-[linear-gradient(90deg,#D7B991_0%,#FFF5E7_100%)] flex min-h-12 w-40 max-w-full gap-2 px-4 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#D7B991] focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Proceed to next step"
          >
            <span className="self-stretch my-auto">
              Next
            </span>
            <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
          </button>
        </div>
      </form>
    </main>
  );
};

export default GlassmorphicCard;
