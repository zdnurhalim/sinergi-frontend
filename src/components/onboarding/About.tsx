import React, { useState, useEffect } from 'react';
import { Zap, Target, ShieldCheck, Sparkle, Users, CheckCircle2, Wand, List } from 'lucide-react';

function AboutSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: '360ms' }}
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Text Column */}
          <div
            className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '360ms' }}
          >
            <h3 className="mb-3 text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Tentang Sinergi.AI
            </h3>
            <p className="text-white/75">
              Sinergi.AI adalah platform rekrutmen berbasis AI yang membantu perusahaan menemukan kandidat terbaik lebih cepat.
              Dengan pemahaman konteks bisnis dari deskripsi perusahaan dan posisi, sistem kami merekomendasikan job description, kisaran gaji, dan ranking kandidat yang relevan.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Zap className="mt-1 text-[#aacde5]" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Cepat & Akurat</div>
                  <div className="text-white/70">Kurangi waktu membuat JD dari jam menjadi menit.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Target className="mt-1 text-[#f6c178]" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Match yang Tepat</div>
                  <div className="text-white/70">Skor kesesuaian kandidat dengan kebutuhan.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mt-1 text-[#aacde5]" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Keamanan Data</div>
                  <div className="text-white/70">Data Anda terenkripsi dan private.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Sparkle className="mt-1 text-[#f6c178]" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Pengalaman Modern</div>
                  <div className="text-white/70">UI yang bersih, intuitif, dan responsif.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '360ms' }}
          >
            <div
              className="absolute inset-0 -z-10 opacity-40 blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(170,205,229,0.25), transparent), radial-gradient(closest-side, rgba(246,193,120,0.25), transparent 60%)',
              }}
            ></div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
              <Users size={24} />
              Manfaat untuk Recruiter & Pelamar
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium">Untuk Recruiter</div>
                <ul className="mt-2 space-y-1.5 text-sm text-white/75">
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#aacde5]" size={20} />
                    JD otomatis
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#aacde5]" size={20} />
                    Prediksi gaji
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#aacde5]" size={20} />
                    Ranking kandidat
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium">Untuk Pelamar</div>
                <ul className="mt-2 space-y-1.5 text-sm text-white/75">
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#f6c178]" size={20} />
                    Rekomendasi cocok
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#f6c178]" size={20} />
                    Profil terstruktur
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#f6c178]" size={20} />
                    Notifikasi cepat
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#ai"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#f6c178] to-[#aacde5] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
              >
                <Wand size={24} />
                Mulai Sekarang
              </a>
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/[0.08]"
              >
                <List size={24} />
                Lihat Lowongan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
