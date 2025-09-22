import React from 'react';

interface FormSectionProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  label,
  placeholder = "Type your answer",
  value,
  onChange,
  id
}) => {
  return (
    <section className="w-full max-md:max-w-full">
      <label 
        htmlFor={id}
        className="flex w-full gap-0.5 text-sm text-white tracking-[0.28px] leading-[22px] px-2 py-0.5 max-md:max-w-full"
      >
        <span className="flex-1 shrink basis-[0%] max-md:max-w-full">
          {label}
        </span>
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="justify-between border flex min-h-[86px] w-full text-xs text-[#F3F0F2] tracking-[0.24px] leading-loose mt-2 pt-2 pb-[58px] px-6 rounded-lg border-solid border-[#A49098] bg-transparent resize-none focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-[#F3F0F2] max-md:max-w-full max-md:px-5"
        rows={3}
      />
    </section>
  );
};

export default FormSection;
