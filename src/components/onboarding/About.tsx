import React, { useState, useEffect } from 'react';
import { Zap, Target, ShieldCheck, Sparkle, Users, CheckCircle2, Wand, List, Briefcase } from 'lucide-react';

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
            className={`rounded-2xl  border border-gray-200/50 shadow-sm  bg-white/[0.8] p-6 backdrop-blur transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '360ms' }}
          >
            <h3 className=" text-black mb-3 text-2xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              About Sinergi.AI
            </h3>
            <p className="text-black/75">
              Sinergi.AI is an AI-powered recruitment platform that helps companies find the best candidates faster.
              By understanding the business context of company and position descriptions, our system recommends relevant job descriptions, salary ranges, and candidate rankings.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/5 p-4">
                <Zap className="mt-1 text-[#aacde5]" size={24} />
                <div className="text-sm">
                  <div className="font-medium text-black">Fast & Acurate</div>
                  <div className="text-black/70">Reduce the time to create job descriptions from hours to minutes.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/5 p-4">
                <Target className="mt-1 text-[#f6c178]" size={24} />
                <div className="text-sm">
                  <div className="font-medium text-black">The Right Match</div>
                  <div className="text-black/70">Candidate suitability score to needs.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/5 p-4">
                <ShieldCheck className="mt-1 text-[#aacde5]" size={24} />
                <div className="text-sm">
                  <div className="font-medium text-black">Data Security</div>
                  <div className="text-black/70">Your data is encrypted and private.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/5 p-4">
                <Sparkle className="mt-1 text-[#f6c178]" size={24} />
                <div className="text-sm">
                  <div className="font-medium text-black">Modern Experience</div>
                  <div className="text-black/70">Clean UI, intuitive, dan responsive.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div
            className={`relative overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm bg-white/[0.8] p-6 backdrop-blur transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '360ms' }}
          >
            <div
              className="absolute inset-0 -z-10 opacity-40 blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(170,205,229,0.25), transparent), radial-gradient(closest-side, rgba(246,193,120,0.25), transparent 60%)',
              }}
            ></div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/5 px-3 py-1.5 text-xs text-black/80">
              <Users size={24} />
              Benefit for Recruiter & Applicant
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-black/75">
              <div className="rounded-xl border border-black/10 bg-white/5 p-4">
                <div className="text-sm font-medium">For Recruiter</div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#aacde5]" size={20} />
                    Automatic Job Desc
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#aacde5]" size={20} />
                    Salary Prediction
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#aacde5]" size={20} />
                    Candidate Rank
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-black/10 bg-white/5 p-4 text-black/75">
                <div className="text-sm font-medium">For Applicant</div>
                <ul className="mt-2 space-y-1.5 text-sm ">
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#f6c178]" size={20} />
                    Match Recomendation
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#f6c178]" size={20} />
                    Structured Profile
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CheckCircle2 className="text-[#f6c178]" size={20} />
                    Fast Notification
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
                Start Now
              </a>
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/5 px-4 py-2.5 text-sm text-black/85 transition hover:bg-black/[0.02]"
              >
                <Briefcase size={24} />
                See Job Ads
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
