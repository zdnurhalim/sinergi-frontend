import React from 'react';

interface AIContextSectionProps {
  className?: string;
}

export const AIContextSection: React.FC<AIContextSectionProps> = ({ className = '' }) => {
  return (
    <section className={`flex h-[282px] items-start gap-4 self-stretch relative bg-[rgba(242,240,242,1)] px-0 py-4 rounded-2xl ${className}`}>
      <div className="flex flex-col items-start gap-4 flex-[1_0_0] relative px-4 py-0">
        <div className="flex justify-between items-center self-stretch relative">
          <h3 className="text-[#31272A] text-sm font-semibold leading-[22px] tracking-[0.28px] relative">
            Context :
          </h3>
          <button className="flex h-7 justify-center items-center gap-4 relative rounded-2xl border-[0.6px] border-solid border-[#867178] px-2 hover:bg-gray-50 transition-colors">
            <span className="text-[#867178] text-[11px] font-normal tracking-[0.03em]">
              edit with sinergi AI
            </span>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.598 3.78445C11.571 3.71846 11.541 3.65247 11.511 3.58647C11.029 2.53968 10.217 1.59756 9.124 0.928516C8.103 0.300446 6.981 6.10352e-05 5.895 6.10352e-05C4.312 6.10352e-05 2.81 0.639516 1.816 1.83423C0.116 3.42945 -1.186 6.58801 -0.41 9.77168C-0.025 8.89778 0.584 8.31068 1.094 7.94428C1.133 7.91698 1.172 7.88968 1.208 7.86468C1.208 7.86468 1.217 7.85788 1.224 7.85328C1.308 7.79638 1.356 7.70538 1.363 7.60748C1.365 7.56878 1.363 7.53018 1.349 7.49378C1.315 7.40268 1.285 7.31398 1.26 7.22288C0.944 6.05778 1.37 4.83348 2.373 4.26458C2.733 4.06208 3.126 3.96423 3.52 3.96423C3.527 3.96423 3.531 3.96423 3.538 3.96423C4.469 3.97106 5.409 4.51038 5.936 5.44568C6.005 5.56858 6.066 5.69138 6.116 5.81888C6.134 5.86208 6.15 5.90758 6.166 5.95088C6.453 6.66308 7.017 7.26388 7.786 7.57338C8.144 7.71678 8.515 7.78498 8.876 7.78498C9.086 7.78498 9.293 7.76228 9.495 7.71898C10.371 7.53018 11.147 6.93848 11.541 6.06688C11.557 6.03048 11.573 5.99178 11.589 5.95538C11.88 5.23178 11.862 4.45798 11.593 3.78445H11.598ZM-0.034 8.13548C-0.084 6.88388 0.177 5.69828 0.607 4.67878C0.539 5.12938 0.523 5.59588 0.571 6.06458C0.571 6.07598 0.578 6.08508 0.58 6.09648C0.534 6.51288 0.564 6.94528 0.68 7.37768C0.682 7.38678 0.68 7.38678 0.685 7.39128C0.691 7.42088 0.701 7.44818 0.71 7.47778C0.439 7.67578 0.189 7.89648 -0.037 8.13548H-0.034ZM11.036 5.72788C11.024 5.75738 11.011 5.78698 10.997 5.81888C10.697 6.48558 10.089 6.97488 9.372 7.12958C9.211 7.16378 9.047 7.18198 8.881 7.18198C8.585 7.18198 8.294 7.12508 8.016 7.01358C7.429 6.77688 6.974 6.32408 6.735 5.73918C6.717 5.68918 6.699 5.63908 6.681 5.59128C6.621 5.44108 6.549 5.29318 6.467 5.14528C5.848 4.05068 4.728 3.36798 3.549 3.35888H3.527C3.019 3.35888 2.521 3.48858 2.082 3.73668C1.656 3.97788 1.313 4.31698 1.058 4.71748C1.178 3.94148 1.479 3.21548 1.948 2.59648C1.968 2.57148 1.979 2.54188 1.986 2.51228C2.064 2.42808 2.143 2.34848 2.225 2.27338C2.246 2.25518 2.264 2.23698 2.28 2.21648C3.133 1.18788 4.453 0.598516 5.895 0.598516C6.908 0.598516 7.916 0.887516 8.81 1.43598C9.766 2.02308 10.512 2.85138 10.965 3.83448C10.993 3.89138 11.018 3.95058 11.043 4.00968C11.261 4.56498 11.259 5.17258 11.036 5.72558V5.72788Z" fill="#867178"/>
            </svg>
          </button>
        </div>
        <div className="self-stretch text-[#31272A] text-sm font-normal leading-[22px] tracking-[0.28px] relative whitespace-pre-line max-sm:text-[13px] max-sm:leading-5">
          I have generated two distinct versions of the job advertisement for your Social Media role. Version A (Social Media & Community Specialist) is crafted to attract a creative candidate focused on content, brand voice, and community engagement. In contrast, Version B (Social Media Strategist) is tailored for an analytical candidate who excels at driving measurable growth, managing campaigns, and interpreting data. To make your selection, consider your most immediate priority. Choose Version A if your primary goal is to build brand awareness and an active online community. Choose Version B if your focus is on performance, analytics, and turning social media into a direct driver for business growth. Please select the version that most closely aligns with your needs; you can then easily edit the details to perfect it.
        </div>
      </div>
    </section>
  );
};
