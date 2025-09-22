import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'coming-soon';
  reverse?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonVariant = 'primary',
  reverse = false
}) => {
  const renderButton = () => {
    if (!buttonText) return null;

    if (buttonVariant === 'coming-soon') {
      return (
        <div className="border flex min-h-10 items-center gap-2 text-xs text-[rgba(91,81,81,1)] justify-center mt-8 px-2 py-[13px] rounded-[100px] border-[rgba(91,81,81,1)] border-solid">
          <span className="self-stretch my-auto">{buttonText}</span>
        </div>
      );
    }

    return (
      <Link 
        to="/dashboard"
        className="flex items-center gap-2.5 text-lg text-[rgba(29,31,34,1)] font-medium justify-center mt-8 px-8 py-4 rounded-[10px] transition-colors max-md:px-5 hover:opacity-90" 
        style={{ backgroundImage: 'var(--gradient-cta-button)' }}
      >
        <span className="self-stretch my-auto">{buttonText}</span>
      </Link>
    );
  };

  const content = (
    <div className="self-stretch flex min-w-60 flex-col items-stretch grow shrink w-[438px] my-auto px-6 max-md:max-w-full max-md:px-5">
      <h2 className="text-[rgba(40,68,83,1)] text-[32px] font-semibold max-md:max-w-full">
        {title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <p className="text-black text-base font-normal leading-6 tracking-[0.8px] mt-8 max-md:max-w-full">
        {description.split('\n\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < description.split('\n\n').length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </p>
      {renderButton()}
    </div>
  );

  const image = (
    <img
      src={imageSrc}
      alt={imageAlt}
      className="aspect-[1.22] object-contain w-[438px] self-stretch min-w-60 grow shrink my-auto rounded-[32px] max-md:max-w-full"
    />
  );

  return (
    <section className="flex w-full items-center gap-6 flex-wrap max-md:max-w-full">
      {reverse ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </section>
  );
};

export default FeatureSection;
