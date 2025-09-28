import React from 'react';
import { Menu } from 'lucide-react'; // Gunakan library ikon React
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/0">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <a href="#home" className="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aacde5]/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 shadow-sm">
            <span className="text-[0.9rem] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>S</span>
          </div>
          <span className="text-base font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Sinergi.AI</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          <a href="#home" className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white hover:outline hover:outline-1 hover:outline-white/10">Home</a>
          <a href="#jobs" className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white hover:outline hover:outline-1 hover:outline-white/10">Job List</a>
          <a href="#ai" className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white hover:outline hover:outline-1 hover:outline-white/10">AI Prompting</a>
        </nav>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-4 py-2 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2">
            Login
          </button>
          <button 
            onClick={() => navigate('/onboarding')}
            className="hidden rounded-lg bg-gradient-to-r from-[#f6c178] to-[#aacde5] px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aacde5]/40 md:inline-flex">
            Coba AI Prompting
          </button>
          <button className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 transition hover:text-white hover:bg-white/[0.08] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aacde5]/40 md:hidden" aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </header>
  );
}

export default Navbar;