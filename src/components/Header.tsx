import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 relative bg-[rgba(40,40,53,0.5)] flex w-full items-center gap-[40px_100px] text-sm font-normal justify-between flex-wrap px-6 py-2 rounded-[100px] border-[rgba(255,255,255,0.3)] border-t border-l max-md:max-w-full max-md:px-5">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/20a2ce9b08d26b3662412abbaddb91c775a372f4?placeholderIfAbsent=true"
        alt="Sinergi.AI Logo"
        className="aspect-[4.63] object-contain w-[167px] self-stretch shrink-0 my-auto"
      />
      <nav className="self-stretch flex min-w-60 items-center gap-[26px] my-auto">
        <a href="#solutions" className="self-stretch my-auto hover:opacity-80 transition-opacity">
          Our Solutions
        </a>
        <a href="#waitlist" className="self-stretch my-auto hover:opacity-80 transition-opacity">
          Join Waitlist
        </a>
        <button className="border self-stretch flex min-h-10 items-center gap-2 justify-center my-auto px-4 py-3 rounded-lg border-white border-solid hover:bg-white hover:text-black transition-colors">
          <span className="self-stretch my-auto">
            Try Sinergi.AI
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
