import React from "react";
import { FileText, Users, Wand } from "lucide-react";

const features = [
  {
    title: "AI CV Screener",
    description:
      "Effortlessly screen hundreds or even thousands of CVs with our smart screener in minutes.\n\nOur AI instantly delivers a shortlist of the best candidates, complete with summaries.",
    icon: <FileText className="w-6 h-6" />,
    iconBg: "bg-[#aacde5]/20 text-[#aacde5]",
  },
  {
    title: "Talent Pool & Sourcing",
    description:
      "Source candidates using our private job links to maintain company confidentiality.\n\nAll applicant data is automatically captured and organized into your own, searchable talent pool.",
    icon: <Users className="w-6 h-6" />,
    iconBg: "bg-[#f6c178]/20 text-[#f6c178]",
  },
  {
    title: "Generated Interviewer Scripts",
    description:
      "Our AI generates a unique script of insightful questions tailored specifically to each candidates.\n\nEmpowers you to uncover their true skills and get to know them on a deeper level.",
    icon: <Wand className="w-6 h-6" />,
    iconBg: "bg-[#aacde5]/20 text-[#aacde5]",
  },
];

const MoreFeatures: React.FC = () => {
  return (
    <section
      id="moreFeatures"
      className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 rounded-2xl shadow-sm overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/17483907/pexels-photo-17483907.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay putih semi-transparan + blur */}
      <div className="absolute inset-0 bg-white/65 backdrop-blur-sm"></div>
      <div className="mb-10 text-center relative z-10">
        <h2 className="text-4xl font-semibold tracking-tight text-black" style={{ letterSpacing: "-0.02em" }}>
          Featured product
        </h2>
        <p className="mt-2 text-lg text-black/70">
          Innovative solutions to speed up the recruitment process and improve candidate quality.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200/50 shadow-sm  bg-white/[0.3] p-6 backdrop-blur-md transform transition-all duration-500 hover:scale-105 hover:bg-black/[0.01]"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${feature.iconBg}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
            <p className="text-black/70 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

        <section className="relative mx-auto max-w-3xl mt-10 p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-black/10 shadow-md ring-1 ring-[#aacde5]/20 overflow-hidden">
          {/* Efek gradient lembut di background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#aacde5]/20 via-transparent to-[#f6c178]/20 pointer-events-none"></div>

          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              We are just getting started 🚀
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                Subscribe to our newsletter to stay ahead of <br/><span className="font-semibold text-[#2e4057]">SinergiAI</span> HR tools revolution and get the latest updates immediately.
            </p>

            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-2/3 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#aacde5] focus:outline-none transition"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#aacde5] to-[#f6c178] text-black font-medium shadow-sm hover:shadow-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
    </section>
  );
};

export default MoreFeatures;
