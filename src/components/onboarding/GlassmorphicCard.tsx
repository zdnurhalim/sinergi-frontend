import React, { useState } from 'react';
import FormSection from './FormSection';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal } from 'lucide-react';
import { LoadingSpinner } from '@/components/reusable/LoadingSpinner';

interface GlassmorphicCardProps {
  onNext?: (companyInfo: string, talentInfo: string) => void;
  errors?: { [key: string]: string[] };
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ onNext, errors }) => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [talentInfo, setTalentInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleNext = async () => {
    if (!onNext) return;
    try {
      setLoading(true);
      // kalau onNext bisa async, tunggu dulu
      await Promise.resolve(onNext(companyInfo, talentInfo));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative w-full max-w-2xl p-8 rounded-3xl border border-white/20 backdrop-blur-xl bg-white/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-transform duration-300 hover:scale-105"
    >
      <h1 className="text-white text-lg font-semibold tracking-tight mb-4">
        Let's try our Sinergi.AI recruiter module
      </h1>
      <hr className="border-white/20 mb-6" />
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-6">
          <FormSection
            id="company-info"
            label="Start with short description about your company industry, employee size, company size (small, micro, middle or enterprise) and any other information that you'd like to share"
            value={companyInfo}
            onChange={setCompanyInfo}
          />
          {errors?.company_description && (
            <div className="text-red-500 text-sm break-words">
              {errors.company_description[0]}
            </div>
          )}

          <FormSection
            id="talent-info"
            label="Describe the talent that you are looking for. Include position, daily tasks, salary range, and any other specific details."
            value={talentInfo}
            onChange={setTalentInfo}
          />
          {errors?.talent_description && (
            <div className="text-red-500 text-sm break-words">
              {errors.talent_description[0]}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 border-white/30 text-white bg-white/5 py-5 rounded-xl"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>

          <button
            type="button"
            onClick={handleNext}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-semibold shadow-md transition-all duration-300
                      bg-gradient-to-r from-[#f6c178] to-[#aacde5] text-black 
                      hover:brightness-110 hover:shadow-[0_0_25px_rgba(246,193,120,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-[#aacde5]/50 focus:ring-offset-2
                      ${loading ? "opacity-70 cursor-not-allowed hover:brightness-100" : ""}`}
          >
            {loading ? (
              <LoadingSpinner label="Processing..." />
            ) : (
              <>
                <Terminal className="w-4 h-4" />
                Generate Prompt
              </>
            )}
          </button>
        </div>

      </form>
    </main>
  );
};

export default GlassmorphicCard;
