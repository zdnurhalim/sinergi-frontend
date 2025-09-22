import React, { useState } from 'react';

interface FormData {
  companyDescription: string;
  jobDescription: string;
  includeCompanyName: boolean;
  includeSalaryRange: boolean;
  includeAgeLimit: boolean;
  includeGenderPreference: boolean;
}

interface JobCreationFormProps {
  className?: string;
}

export const JobCreationForm: React.FC<JobCreationFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    companyDescription: "We are KopiKreatif, a modern coffee brand based in Bandung, operating in the Food & Beverage (F&B) industry. As a Small to Medium Enterprise (SME) with 25-50 employees, our focus is on high-quality local coffee and building a strong, authentic community around our brand. Our company voice is creative and energetic. Social media is a key channel for our customer engagement and growth.",
    jobDescription: "I am looking for Social Media Specialist. Daily Tasks: The talent will manage our primary social media channels (Instagram, TikTok, Twitter). This includes developing a content calendar, creating daily engaging content (videos, graphics, copy), and actively engaging with our online community. They will also be responsible for tracking and analyzing performance metrics, managing small ad campaigns to boost reach, and staying on top of the latest digital trends. Salary Range: IDR 5,000,000 - 8,000,000 per month. Specific Details: We are looking for a candidate who is both highly creative and data-aware. They must have a portfolio of previous social media work. The ideal person is passionate about coffee, understands local culture, and has excellent communication skills. This is a hybrid role based in Bandung.",
    includeCompanyName: true,
    includeSalaryRange: false,
    includeAgeLimit: false,
    includeGenderPreference: false,
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    console.log('Generating job ad with data:', formData);
  };

  const CheckboxIcon = ({ checked }: { checked: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="checkbox">
      <g clipPath="url(#clip0_checkbox)">
        <path 
          d="M0.90918 0.75H19.0908C19.1787 0.75 19.25 0.821315 19.25 0.90918V19.0908C19.25 19.1787 19.1787 19.25 19.0908 19.25H0.90918C0.821315 19.25 0.75 19.1787 0.75 19.0908V0.90918C0.75 0.821316 0.821316 0.75 0.90918 0.75Z" 
          fill={checked ? "#867178" : "transparent"} 
          stroke="#867178" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {checked && (
          <path 
            d="M15 7L8.33333 14L5 10.5002" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        )}
      </g>
      <defs>
        <clipPath id="clip0_checkbox">
          <rect width="20" height="20" rx="4" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <form className={`flex flex-col items-center gap-8 self-stretch relative pb-6 max-sm:gap-6 ${className}`}>
      <div className="flex flex-col items-start gap-4 self-stretch relative">
        <div className="flex flex-col items-start gap-2 self-stretch relative max-sm:gap-1.5">
          <div className="flex items-start gap-0.5 self-stretch relative px-2 py-0.5">
            <label className="flex-[1_0_0] text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
              1. Start with short description about your company industry, employee size, company size (small, micro, middle or enterprise) and any other information that you'd like to share
            </label>
          </div>
          <div className="flex justify-between items-start self-stretch border relative bg-[rgba(248,247,248,0.50)] px-6 py-2 rounded-lg border-solid border-[#BBABB1]">
            <textarea
              value={formData.companyDescription}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
              className="flex-[1_0_0] text-[rgba(49,39,42,0.80)] text-sm font-normal leading-[22px] tracking-[0.28px] relative whitespace-pre-line max-sm:text-[13px] max-sm:leading-5 bg-transparent border-none outline-none resize-none min-h-[120px]"
              placeholder="Describe your company..."
            />
            <div className="flex gap-2 items-center ml-4">
              <button type="button" className="p-1 hover:bg-gray-100 rounded transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66675 13.0367C3.17342 13.0367 2.68675 12.85 2.31342 12.4767C1.95342 12.1167 1.75342 11.6367 1.75342 11.1233C1.75342 10.61 1.95342 10.13 2.31342 9.77L10.9801 1.10333C11.7268 0.356668 12.9401 0.356668 13.6868 1.10333C14.0468 1.46333 14.2468 1.94333 14.2468 2.45667C14.2468 2.97 14.0468 3.45 13.6868 3.81L5.02008 12.4767C4.64675 12.85 4.16008 13.0367 3.66675 13.0367ZM12.3334 1.54333C12.1001 1.54333 11.8668 1.63 11.6868 1.81L3.02008 10.4767C2.84675 10.65 2.75342 10.8767 2.75342 11.1233C2.75342 11.37 2.84675 11.5967 3.02008 11.77C3.37342 12.1233 3.96008 12.1233 4.31342 11.77L12.9801 3.10333C13.1534 2.93 13.2468 2.70333 13.2468 2.45667C13.2468 2.21 13.1534 1.98334 12.9801 1.81C12.8001 1.63 12.5668 1.54333 12.3334 1.54333Z" fill="#292D32"/>
                  <path d="M12.3401 4.95001C12.2135 4.95001 12.0868 4.90334 11.9868 4.80334L9.9868 2.80334C9.79346 2.61001 9.79346 2.29001 9.9868 2.09668C10.1801 1.90334 10.5001 1.90334 10.6935 2.09668L12.6935 4.09668C12.8868 4.29001 12.8868 4.61001 12.6935 4.80334C12.5935 4.90334 12.4668 4.95001 12.3401 4.95001Z" fill="#292D32"/>
                  <path d="M14.0002 14.1233C14.3684 14.1233 14.6668 14.4218 14.6668 14.79C14.6668 15.1582 14.3684 15.4567 14.0002 15.4567H2.00016C1.63197 15.4567 1.3335 15.1582 1.3335 14.79C1.3335 14.4218 1.63197 14.1233 2.00016 14.1233H14.0002Z" fill="#292D32"/>
                </svg>
              </button>
              <button type="button" className="p-1 hover:bg-gray-100 rounded transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.9999 4.48666C13.9866 4.48666 13.9666 4.48666 13.9466 4.48666C10.4199 4.13333 6.89994 3.99999 3.41328 4.35333L2.05328 4.48666C1.77328 4.51333 1.52661 4.31333 1.49994 4.03333C1.47328 3.75333 1.67328 3.51333 1.94661 3.48666L3.30661 3.35333C6.85328 2.99333 10.4466 3.13333 14.0466 3.48666C14.3199 3.51333 14.5199 3.75999 14.4933 4.03333C14.4733 4.29333 14.2533 4.48666 13.9999 4.48666Z" fill="#292D32"/>
                  <path d="M5.66651 3.81333C5.63984 3.81333 5.61318 3.81333 5.57984 3.80666C5.31318 3.75999 5.12651 3.49999 5.17318 3.23333L5.31984 2.35999C5.42651 1.71999 5.57318 0.833328 7.12651 0.833328H8.87318C10.4332 0.833328 10.5798 1.75333 10.6798 2.36666L10.8265 3.23333C10.8732 3.50666 10.6865 3.76666 10.4198 3.80666C10.1465 3.85333 9.88651 3.66666 9.84651 3.39999L9.69984 2.53333C9.60651 1.95333 9.58651 1.83999 8.87984 1.83999H7.13318C6.42651 1.83999 6.41318 1.93333 6.31318 2.52666L6.15984 3.39333C6.11984 3.64 5.90651 3.81333 5.66651 3.81333Z" fill="#292D32"/>
                  <path d="M10.1401 15.1667H5.8601C3.53343 15.1667 3.4401 13.88 3.36676 12.84L2.93343 6.12666C2.91343 5.85332 3.12676 5.61332 3.4001 5.59332C3.6801 5.57999 3.91343 5.78666 3.93343 6.05999L4.36676 12.7733C4.4401 13.7867 4.46676 14.1667 5.8601 14.1667H10.1401C11.5401 14.1667 11.5668 13.7867 11.6334 12.7733L12.0668 6.05999C12.0868 5.78666 12.3268 5.57999 12.6001 5.59332C12.8734 5.61332 13.0868 5.84666 13.0668 6.12666L12.6334 12.84C12.5601 13.88 12.4668 15.1667 10.1401 15.1667Z" fill="#292D32"/>
                  <path d="M9.10672 11.5H6.88672C6.61339 11.5 6.38672 11.2733 6.38672 11C6.38672 10.7267 6.61339 10.5 6.88672 10.5H9.10672C9.38005 10.5 9.60672 10.7267 9.60672 11C9.60672 11.2733 9.38005 11.5 9.10672 11.5Z" fill="#292D32"/>
                  <path d="M9.66683 8.83334H6.3335C6.06016 8.83334 5.8335 8.60668 5.8335 8.33334C5.8335 8.06001 6.06016 7.83334 6.3335 7.83334H9.66683C9.94016 7.83334 10.1668 8.06001 10.1668 8.33334C10.1668 8.60668 9.94016 8.83334 9.66683 8.83334Z" fill="#292D32"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch relative max-sm:gap-1.5">
          <div className="flex items-start gap-0.5 self-stretch relative px-2 py-0.5">
            <label className="flex-[1_0_0] text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
              2. Describe the talent that you looking for. What is their position, what is their daily task, range of salary that you can offer to this talent, and any other specific detail that you want to add
            </label>
          </div>
          <div className="flex justify-between items-start self-stretch border relative bg-[rgba(248,247,248,0.50)] px-6 py-2 rounded-lg border-solid border-[#BBABB1]">
            <textarea
              value={formData.jobDescription}
              onChange={(e) => handleInputChange('jobDescription', e.target.value)}
              className="flex-[1_0_0] text-[rgba(49,39,42,0.80)] text-sm font-normal leading-[22px] tracking-[0.28px] relative whitespace-pre-line max-sm:text-[13px] max-sm:leading-5 bg-transparent border-none outline-none resize-none min-h-[120px]"
              placeholder="Describe the position and requirements..."
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 self-stretch relative">
          <div className="flex flex-col items-start gap-2 self-stretch relative">
            <div className="flex items-start gap-0.5 self-stretch relative px-2 py-0.5">
              <label className="flex-[1_0_0] text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
                3. Choose what to include in the job ad
              </label>
            </div>
            <div className="flex items-start gap-10 relative max-md:flex-col max-md:gap-4">
              <div className="flex flex-col items-start gap-2 relative">
                <label className="flex items-center gap-2 relative px-2 py-0.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => handleInputChange('includeCompanyName', !formData.includeCompanyName)}
                    className="flex items-center justify-center"
                  >
                    <CheckboxIcon checked={formData.includeCompanyName} />
                  </button>
                  <span className="text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
                    Mention Your Company Name
                  </span>
                </label>
                <label className="flex items-center gap-2 relative px-2 py-0.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => handleInputChange('includeSalaryRange', !formData.includeSalaryRange)}
                    className="flex items-center justify-center"
                  >
                    <CheckboxIcon checked={formData.includeSalaryRange} />
                  </button>
                  <span className="text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
                    Mention Salary Range
                  </span>
                </label>
              </div>
              <div className="flex flex-col items-start gap-2 relative">
                <label className="flex items-center gap-2 relative px-2 py-0.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => handleInputChange('includeAgeLimit', !formData.includeAgeLimit)}
                    className="flex items-center justify-center"
                  >
                    <CheckboxIcon checked={formData.includeAgeLimit} />
                  </button>
                  <span className="text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
                    Add Age limitation
                  </span>
                </label>
                <label className="flex items-center gap-2 relative px-2 py-0.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => handleInputChange('includeGenderPreference', !formData.includeGenderPreference)}
                    className="flex items-center justify-center"
                  >
                    <CheckboxIcon checked={formData.includeGenderPreference} />
                  </button>
                  <span className="text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative max-sm:text-[13px] max-sm:leading-5">
                    Add Gender preference
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="flex w-40 h-12 justify-center items-center gap-2 relative cursor-pointer px-4 py-3 rounded-lg bg-[#7CB4F1] hover:bg-[#6BA3E0] transition-colors max-sm:w-full max-sm:h-11"
      >
        <span className="text-white text-[13px] font-semibold leading-4 tracking-[0.52px] relative">
          Generate Job Ad
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.99988 21.87C4.25988 21.87 3.52988 21.59 2.96988 21.03C2.42988 20.49 2.12988 19.77 2.12988 19C2.12988 18.23 2.42988 17.51 2.96988 16.97L15.9699 3.97C17.0899 2.85 18.9099 2.85 20.0299 3.97C20.5699 4.51 20.8699 5.23 20.8699 6C20.8699 6.77 20.5699 7.49 20.0299 8.03L7.02988 21.03C6.46988 21.59 5.73988 21.87 4.99988 21.87ZM17.9999 4.63001C17.6499 4.63001 17.2999 4.76001 17.0299 5.03001L4.02988 18.03C3.76988 18.29 3.62988 18.63 3.62988 19C3.62988 19.37 3.76988 19.71 4.02988 19.97C4.55988 20.5 5.43988 20.5 5.96988 19.97L18.9699 6.97C19.2299 6.71 19.3699 6.37 19.3699 6C19.3699 5.63 19.2299 5.29001 18.9699 5.03001C18.6999 4.76001 18.3499 4.63001 17.9999 4.63001Z" fill="white"/>
          <path d="M18.0102 9.73999C17.8202 9.73999 17.6302 9.66999 17.4802 9.51999L14.4802 6.51999C14.1902 6.22999 14.1902 5.74999 14.4802 5.45999C14.7702 5.16999 15.2502 5.16999 15.5402 5.45999L18.5402 8.45999C18.8302 8.74999 18.8302 9.22999 18.5402 9.51999C18.3902 9.66999 18.2002 9.73999 18.0102 9.73999Z" fill="white"/>
          <path d="M10.0001 5.49999C9.95005 5.49999 9.91005 5.48999 9.86005 5.47999L8.50005 5.07999L7.14005 5.47999C6.96005 5.52999 6.77005 5.47999 6.65005 5.34999C6.52005 5.21999 6.47005 5.03999 6.52005 4.85999L6.92005 3.49999L6.52005 2.13999C6.47005 1.95999 6.52005 1.76999 6.65005 1.64999C6.78005 1.51999 6.97005 1.46999 7.14005 1.51999L8.50005 1.91999L9.86005 1.51999C10.0401 1.46999 10.2201 1.51999 10.3501 1.64999C10.4801 1.77999 10.5301 1.96999 10.4801 2.13999L10.0801 3.49999L10.4801 4.85999C10.5301 5.03999 10.4801 5.22999 10.3501 5.34999C10.2601 5.44999 10.1301 5.49999 10.0001 5.49999ZM8.50005 4.05999C8.55005 4.05999 8.59005 4.06999 8.64005 4.07999L9.26005 4.25999L9.08005 3.63999C9.05005 3.54999 9.05005 3.44999 9.08005 3.35999L9.26005 2.73999L8.64005 2.91999C8.55005 2.94999 8.45005 2.94999 8.36005 2.91999L7.74005 2.73999L7.92005 3.35999C7.95005 3.44999 7.95005 3.54999 7.92005 3.63999L7.74005 4.25999L8.36005 4.07999C8.41005 4.06999 8.45005 4.05999 8.50005 4.05999Z" fill="white"/>
          <path d="M6.00005 11.5C5.95005 11.5 5.91005 11.49 5.86005 11.48L4.50005 11.08L3.14005 11.48C2.96005 11.53 2.78005 11.48 2.65005 11.35C2.52005 11.22 2.47005 11.03 2.52005 10.86L2.92005 9.49999L2.52005 8.13999C2.47005 7.95999 2.52005 7.76999 2.65005 7.64999C2.78005 7.52999 2.97005 7.46999 3.14005 7.51999L4.50005 7.91999L5.86005 7.51999C6.03005 7.46999 6.22005 7.51999 6.35005 7.64999C6.48005 7.77999 6.53005 7.96999 6.48005 8.13999L6.08005 9.49999L6.48005 10.86C6.53005 11.04 6.48005 11.23 6.35005 11.35C6.26005 11.45 6.13005 11.5 6.00005 11.5ZM4.50005 10.06C4.55005 10.06 4.59005 10.07 4.64005 10.08L5.26005 10.26L5.08005 9.63999C5.05005 9.54999 5.05005 9.44999 5.08005 9.35999L5.26005 8.73999L4.64005 8.91999C4.55005 8.94999 4.45005 8.94999 4.36005 8.91999L3.74005 8.73999L3.92005 9.35999C3.95005 9.44999 3.95005 9.54999 3.92005 9.63999L3.74005 10.26L4.36005 10.08C4.41005 10.07 4.45005 10.06 4.50005 10.06Z" fill="white"/>
          <path d="M21.0001 16.5C20.9501 16.5 20.9101 16.49 20.8601 16.48L19.5001 16.08L18.1401 16.48C17.9601 16.53 17.7801 16.48 17.6501 16.35C17.5201 16.22 17.4701 16.03 17.5201 15.86L17.9201 14.5L17.5201 13.14C17.4701 12.96 17.5201 12.77 17.6501 12.65C17.7801 12.53 17.9701 12.47 18.1401 12.52L19.5001 12.92L20.8601 12.52C21.0301 12.47 21.2201 12.52 21.3501 12.65C21.4801 12.78 21.5301 12.97 21.4801 13.14L21.0801 14.5L21.4801 15.86C21.5301 16.04 21.4801 16.23 21.3501 16.35C21.2601 16.45 21.1301 16.5 21.0001 16.5ZM19.5001 15.06C19.5501 15.06 19.5901 15.07 19.6401 15.08L20.2601 15.26L20.0801 14.64C20.0501 14.55 20.0501 14.45 20.0801 14.36L20.2601 13.74L19.6401 13.92C19.5501 13.95 19.4501 13.95 19.3601 13.92L18.7401 13.74L18.9201 14.36C18.9501 14.45 18.9501 14.55 18.9201 14.64L18.7401 15.26L19.3601 15.08C19.4101 15.07 19.4501 15.06 19.5001 15.06Z" fill="white"/>
        </svg>
      </button>
    </form>
  );
};
