import React from 'react';
import { Sparkles, Briefcase, ArrowRight, BrainCircuit, FileText, TrendingUp } from 'lucide-react';

function Hero() {
  return (
    <div>
    <section id="homePage" className="relative">
      <section className="relative transition-all duration-700" data-animate="" style={{ transitionDelay: '0ms' }}>
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 md:px-6 md:pb-16 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left: Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 backdrop-blur transition hover:bg-white/[0.1]">
                <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-[#f6c178] to-[#aacde5]"></span>
                Dirancang untuk recruiter modern
              </div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl" style={{ letterSpacing: '-0.02em' }}>
                Temukan Talent Berkualitas dalam Sekejap
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Sinergi.AI memudahkan recruiter menciptakan job description dan menentukan gaji hanya dengan 2 input: <span className="text-white/90">Company Description</span> & <span className="text-white/90">Posisi yang diinginkan</span>.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#ai" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#f6c178] to-[#aacde5] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aacde5]/40">
                  <Sparkles size={24} />
                  Coba AI Prompting Sekarang
                </a>
                <a href="#jobs" className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aacde5]/40">
                  <Briefcase size={24} />
                  <span>Jelajahi Job List</span>
                  <ArrowRight size={24} className="transition group-hover:translate-x-0.5" />
                </a>
              </div>
              {/* Social proof / stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>50K+</div>
                  <div className="text-xs text-white/60">Talent terindeks</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>3 Menit</div>
                  <div className="text-xs text-white/60">Rata-rata buat JD</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>98%</div>
                  <div className="text-xs text-white/60">Kesesuaian rekomendasi</div>
                </div>
              </div>
            </div>
            {/* Right: Aurora + AI Illustration */}
            <div className="relative">
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition-all duration-700" data-animate="" style={{ transitionDelay: '60ms' }}>
                {/* Aurora layers and other elements as in the original HTML */}
                <div className="absolute -left-10 -top-16 h-80 w-80 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ background: 'radial-gradient(closest-side, rgba(170,205,229,0.45), transparent)', animationDuration: '6s', animationDelay: '0.3s' }}></div>
                <div className="absolute bottom-4 -right-12 h-96 w-96 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ background: 'radial-gradient(closest-side, rgba(246,193,120,0.42), transparent)', animationDuration: '7s', animationDelay: '0.8s' }}></div>
                <div className="absolute left-1/3 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 mix-blend-screen animate-spin" style={{ background: 'conic-gradient(from 90deg, rgba(246,193,120,0.28), rgba(170,205,229,0.32), rgba(246,193,120,0.28))', animationDuration: '24s' }}></div>
                <div className="opacity-25 absolute top-0 right-0 bottom-0 left-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px, 28px 28px' }}></div>
                
                {/* AI glass modules */}
                <div className="absolute left-6 top-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md shadow-sm transition hover:bg-white/15">
                  <BrainCircuit size={24} />
                  <div className="text-sm">
                    <div className="font-medium">AI Matching</div>
                    <div className="text-xs text-white/70">Smart ranking kandidat</div>
                  </div>
                </div>

                <div className="absolute right-6 top-24 flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md shadow-sm transition hover:bg-white/15">
                  <FileText size={24} />
                  <div className="text-sm">
                    <div className="font-medium">Auto JD Builder</div>
                    <div className="text-xs text-white/70">Sekali klik, langsung jadi</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#aacde5] to-[#f6c178] opacity-90"></div>
                      <div className="text-sm">
                        <div className="font-medium">Prediksi Gaji</div>
                        <div className="text-xs text-white/70">Rp 12-18jt • Jakarta</div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-white/15">
                      <TrendingUp size={24} />
                      Lihat detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    </div>
  );
}

export default Hero;