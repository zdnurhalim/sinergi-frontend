import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Here you would typically send the email to your backend
      console.log('Newsletter subscription:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="self-center flex w-full items-center gap-6 justify-center flex-wrap mt-20 py-16 max-md:mt-10" style={{ backgroundImage: 'var(--gradient-newsletter)' }}>
      <div className="self-stretch min-w-60 text-[rgba(200,200,200,1)] w-[548px] my-auto px-6 max-md:max-w-full max-md:px-5">
        <h2 className="text-[32px] font-semibold max-md:max-w-full">
          We are just getting started
        </h2>
        <p className="text-base font-normal leading-6 tracking-[0.8px] mt-8 max-md:max-w-full">
          Subscribe our newsletter untuk jadi yang terdepan dalam revolusi
          HR tools dari SinergiAI dan update info info terbaru segera
        </p>
      </div>
      <div className="self-stretch min-w-60 w-[548px] my-auto px-6 max-md:max-w-full max-md:px-5">
        {isSubmitted ? (
          <div className="text-green-500 text-center py-4">
            Thank you for subscribing! We'll keep you updated.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border flex min-h-[54px] w-full items-center gap-2 justify-center flex-wrap pl-6 rounded-2xl border-[rgba(160,160,160,1)] border-solid max-md:max-w-full max-md:pl-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="text-[rgba(200,200,200,1)] text-base font-normal tracking-[0.8px] self-stretch flex-1 shrink basis-16 my-auto bg-transparent border-none outline-none placeholder-[rgba(200,200,200,1)]"
            />
            <button
              type="submit"
              className="self-stretch flex items-center gap-2.5 text-lg text-[rgba(29,31,34,1)] font-medium whitespace-nowrap justify-center my-auto px-8 py-4 rounded-[0px_16px_16px_0px] bg-white hover:bg-gray-100 transition-colors max-md:px-5"
            >
              <span className="self-stretch my-auto">Subscribe</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
