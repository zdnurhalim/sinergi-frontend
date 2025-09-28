import React from "react";
import { FileText, Users, Wand } from "lucide-react";

const features = [
  {
    title: "AI CV Screener",
    description:
      "Otomatis menilai CV kandidat, memfilter berdasarkan skill, pengalaman, dan kecocokan posisi.",
    icon: <FileText className="w-6 h-6" />,
    iconBg: "bg-[#aacde5]/20 text-[#aacde5]",
  },
  {
    title: "Talent Pool & Sourcing",
    description:
      "Bangun database kandidat berkualitas dan temukan talenta terbaik lebih cepat untuk kebutuhan rekrutmen.",
    icon: <Users className="w-6 h-6" />,
    iconBg: "bg-[#f6c178]/20 text-[#f6c178]",
  },
  {
    title: "Generated Interviewer Scripts",
    description:
      "Membuat skrip wawancara otomatis sesuai posisi dan kompetensi kandidat, mempercepat persiapan HR.",
    icon: <Wand className="w-6 h-6" />,
    iconBg: "bg-[#aacde5]/20 text-[#aacde5]",
  },
];

const MoreFeatures: React.FC = () => {
  return (
    <section
      id="moreFeatures"
      className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>
          Produk Unggulan
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Solusi inovatif untuk mempercepat proses rekrutmen dan kualitas kandidat.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transform transition-all duration-500 hover:scale-105 hover:bg-white/[0.08]"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${feature.iconBg}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-white/70 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreFeatures;
