import React from 'react';
import { LogIn } from "lucide-react";
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
        className="flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#f6c178] to-[#aacde5] text-black font-semibold shadow-md hover:brightness-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#aacde5]/50 focus:ring-offset-2"
        aria-label="Login to your account"
      >
        <LogIn className="w-5 h-5" />
        <span>Login</span>
      </button>
    </header>
  );
};

export default Header;
