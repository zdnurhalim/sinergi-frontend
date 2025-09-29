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
        <div className="rounded-2xl bg-white p-6 backdrop-blur md:p-8 border border-gray-200/50 shadow-sm ">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-black text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                AI Prompting
              </h2>
              <p className="text-sm text-black/70">
                Start with short description about your company industry, employee size, company size and any other information that you'd like to share.
              </p>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/5 px-3 py-1.5 text-xs text-black/80">
                <Cpu size={24} /> Adaptive Model
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/5 px-3 py-1.5 text-xs text-black/80">
                <Lock size={24} /> Secure Privacy
              </span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              {/* <label htmlFor="company" className="mb-2 block text-sm font-medium text-black/90">
                Company Description & Position
              </label> */}
              <div className="relative mb-3">
                <div className="pointer-events-none absolute left-3 top-3 text-black/80">
                  <Building2 size={24} />
                </div>
                <textarea
                  rows={5}
                  id="company"
                  placeholder="Example: A financial technology company focused on digital payments for MSMEs in Southeast Asia."
                  className="w-full rounded-xl border border-black/10 bg-white/[0.04] pl-14 pr-3 pt-3 text-sm text-black placeholder:text-black/40 outline-none transition focus:border-[#000]/30 focus:ring-2 focus:ring-[#000]/10"
                ></textarea>
              </div>
              {/* <label htmlFor="position" className="mb-2 block text-sm font-medium text-black/90">
                Posisi yang diinginkan
              </label> */}
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-3 text-black/80">
                  <Briefcase size={24} />
                </div>
                <input
                  id="position"
                  type="text"
                  placeholder="Example: Senior Backend Engineer"
                  className="w-full rounded-xl border border-black/10 bg-white/[0.04] pl-14 px-10 py-2.5 text-sm text-black placeholder:text-black/40 outline-none transition focus:border-[#000]/30 focus:ring-2 focus:ring-[#000]/10"
                />
              </div>
            </div>
            
            <div className="md:col-span-1">
              <button className=" inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f6c178] to-[#aacde5] px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:brightness-110">
                <Wand2 size={24} /> Generate Job Requirement
              </button>
              <button 
                onClick={() => navigate('/onboarding')}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm font-semibold text-black/90 shadow-sm transition hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2">
                <ExternalLink size={24} /> More Detail Prompt Page
              </button>
              <p className="mt-2 text-xs text-black/60 text-center">*AI Result will redirect to another page</p>
            </div>
          </div>
          <div className="md:flex justify-between gap-6 mt-5">
            {/* <!-- Card 1 --> */}
            <div className="flex flex-col w-full p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-md transition mb-5 md:mb-0">
              <img src="https://images.pexels.com/photos/17485709/pexels-photo-17485709.png" alt="AI illustration" className="w-full h-20 object-cover rounded-md mb-4"/>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 whitespace-pre-line">
                Sinergi AI help you even
                before you write job ad
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                Ever wonder why some job ads attract quality talent while others fall flat?

                The title, tone, and skills you wrote determine who applies, even their salary expectations. 
                Sinergi AI helps you optimize every detail to ensure you attract the talent you actually want.
              </p>
            </div>

            {/* <!-- Card 2 --> */}
            <div className="flex flex-col w-full p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-md transition">
              <img src="https://images.pexels.com/photos/17485657/pexels-photo-17485657.png" alt="Learning illustration" className="w-full h-20 object-cover rounded-md mb-4"/>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 whitespace-pre-line">
                Customized Learning,
                Made Effortless
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                Employee specialized training has always been expensive, or generic online video courses.

                With the Talent Development Module from SinergiAI, you can instantly create specific curriculum tailored to your company's goals, a division's needs, or even an individual's growth path—all from a single prompt.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AIPrompting;
