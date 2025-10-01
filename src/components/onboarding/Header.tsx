import React from "react";
import { LogIn } from "lucide-react";

function Header(){
  return (
    <header className="relative flex items-center justify-between w-full mx-auto px-6 py-4 mb-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md">
      {/* Logo + Version */}
      <div className="flex items-center gap-3 mx-auto">
        <img
          src="https://api.builder.io/api/v1/image/assets/045f585faf5c4f438ec40d189666e0a5/5a8a5eb15d5cff55878e3a040d07054f285b0589?placeholderIfAbsent=true"
          alt="Sinergi.AI Logo"
          className="h-10 w-auto object-contain"
        />
        <div className="text-white/60 text-xs font-light tracking-wide">
          Beta 0.002.0
        </div>
      </div>

      {/* Login Button */}
      {/* <button
        onClick={onLoginClick}
        className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#f6c178] to-[#aacde5] text-black font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:brightness-110 hover:shadow-[0_0_25px_rgba(246,193,120,0.4)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#aacde5]/50 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Login to your account"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button> */}

      {/* Optional glow background */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-56 w-[600px] opacity-60 blur-3xl -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(170,205,229,0.25), rgba(246,193,120,0.2), transparent 70%)",
        }}
      ></div>
    </header>
  );
};

export default Header;
