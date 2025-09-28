import React, { useState, useEffect } from 'react';
import { Cpu, Lock, Building2, Briefcase, Wand2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AIPrompting() {
  const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      id="ai"
      className={`relative transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="rounded-2xl border border-white/10 bg-black/[0.15] p-6 backdrop-blur md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                AI Prompting
              </h2>
              <p className="text-sm text-white/70">
                Start with short description about your company industry, employee size, company size and any other information that you'd like to share.
              </p>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                <Cpu size={24} /> Model Adaptif
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                <Lock size={24} /> Privasi Terjaga
              </span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              {/* <label htmlFor="company" className="mb-2 block text-sm font-medium text-white/90">
                Company Description & Position
              </label> */}
              <div className="relative mb-3">
                <div className="pointer-events-none absolute left-3 top-3 text-black/50">
                  <Building2 size={24} />
                </div>
                <textarea
                  rows={5}
                  id="company"
                  placeholder="Example: A financial technology company focused on digital payments for MSMEs in Southeast Asia."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-14 pr-3 pt-3 text-sm text-slate-800 placeholder:text-black/40 outline-none transition focus:border-[#fff]/50 focus:ring-2 focus:ring-[#fff]/30"
                ></textarea>
              </div>
              {/* <label htmlFor="position" className="mb-2 block text-sm font-medium text-white/90">
                Posisi yang diinginkan
              </label> */}
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-3 text-black/50">
                  <Briefcase size={24} />
                </div>
                <input
                  id="position"
                  type="text"
                  placeholder="Example: Senior Backend Engineer"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-14 px-10 py-2.5 text-sm text-slate-800 placeholder:text-black/40 outline-none transition focus:border-[#fff]/50 focus:ring-2 focus:ring-[#fff]/30"
                />
              </div>
            </div>
            
            <div className="md:col-span-1">
              <button className=" inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f6c178] to-[#aacde5] px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:brightness-110">
                <Wand2 size={24} /> Generate Job Requirement
              </button>
              <button 
                onClick={() => navigate('/onboarding')}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2">
                <ExternalLink size={24} /> More Detail Prompt Page
              </button>
              <p className="mt-2 text-xs text-white/60">Hasil AI akan dialihkan ke halaman lain.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIPrompting;
