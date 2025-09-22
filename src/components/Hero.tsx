import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col relative min-h-[673px] w-full items-stretch text-white pt-[22px] pb-[158px] px-10 max-md:max-w-full max-md:pb-[100px] max-md:px-5">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/df095bc2f4e8115febab0386b8096ac19c3a4553?placeholderIfAbsent=true"
        alt="Hero background"
        className="absolute h-full w-full object-cover inset-0"
      />
      
      <div className="relative self-center flex w-[525px] max-w-full flex-col items-center mt-[135px] -mb-8 max-md:mt-10 max-md:mb-2.5">
        <h1 className="text-[40px] font-semibold text-center max-md:max-w-full">
          The Intelligent Way
          <br />
          to <span style={{ backgroundImage: 'var(--gradient-hire)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hire</span> and <span style={{ backgroundImage: 'var(--gradient-develop)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Develop</span> Talent
        </h1>
        <p className="text-base font-normal leading-6 tracking-[0.8px] text-center self-stretch mt-10 max-md:max-w-full">
          Attract better candidates by starting smarter,
          <br />
          Sinergi AI help you define your ideal role and requirements{" "}
          <span className="font-medium">before you even write the ad</span>
        </p>
        <button className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center gap-2.5 text-lg text-[rgba(29,31,34,1)] font-medium justify-center mt-10 px-8 py-4 rounded-[10px] transition-colors max-md:px-5" style={{ backgroundImage: 'var(--gradient-hero-cta)' }}>
          <span className="self-stretch my-auto">
            Try Sinergi.AI Now
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
