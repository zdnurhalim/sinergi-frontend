import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt
}) => {
  return (
    <article className="border self-stretch flex min-w-60 min-h-[500px] flex-col items-stretch grow shrink w-[286px] my-auto rounded-[32px] border-white border-solid" style={{ backgroundImage: 'var(--gradient-feature-card)' }}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-[1.79] object-contain w-[358px] self-center max-w-full rounded-[32px_32px_0px_0px]"
      />
      <div className="w-full mt-6 pb-8 px-8 max-md:px-5">
        <h3 className="w-full text-2xl text-[rgba(40,68,83,1)] font-semibold">
          {title}
        </h3>
        <p className="text-black text-base font-normal leading-6 tracking-[0.8px] mt-4">
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
      </div>
    </article>
  );
};

export default FeatureCard;
