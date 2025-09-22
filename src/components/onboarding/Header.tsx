import React from 'react';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="relative flex w-[643px] max-w-full gap-[40px_100px] flex-wrap">
      <div className="flex flex-col items-stretch text-xs text-white font-normal text-center tracking-[0.36px] flex-1">
        <img
          src="https://api.builder.io/api/v1/image/assets/045f585faf5c4f438ec40d189666e0a5/5a8a5eb15d5cff55878e3a040d07054f285b0589?placeholderIfAbsent=true"
          alt="Sinergi.AI Logo"
          className="aspect-[4.63] object-contain w-[167px]"
        />
        <div className="opacity-50 self-center mt-1">
          Beta 0.002.0
        </div>
      </div>
      <button
        onClick={onLoginClick}
        className="justify-center items-center border flex min-h-10 gap-2 text-[13px] text-white font-semibold whitespace-nowrap tracking-[0.52px] leading-none flex-1 px-4 py-2 rounded-lg border-solid border-white hover:bg-white hover:text-black transition-colors duration-200"
        aria-label="Login to your account"
      >
        <span className="self-stretch my-auto">
          Login
        </span>
        <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
      </button>
    </header>
  );
};

export default Header;
