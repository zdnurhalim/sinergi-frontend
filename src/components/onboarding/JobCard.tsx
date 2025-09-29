import React, { useState, useEffect } from 'react';
import { Banknote, MapPin, Eye, BriefcaseBusiness } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  workplace: string;
  experience: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, salary, type, workplace, experience }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`group rounded-2xl border border-black/10 bg-white/50 p-5 backdrop-blur-xl shadow-lg transform transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        hover:scale-105 hover:bg-slate-500/[0.1]
      `}
      style={{ transitionDelay: '50ms' }}
    >
      <div className="flex items-start justify-between">
      {/* Kiri: Avatar + Info */}
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt={company} />
          <AvatarFallback>{company?.[0]}</AvatarFallback>
        </Avatar>

        <div>
          <h3
            className="text-lg font-semibold tracking-tight text-black/70"
            style={{ letterSpacing: "-0.01em" }}
          >
            {title}
          </h3>
          <p className="text-sm text-black/70">
            {company} • {location}
          </p>
        </div>
      </div>

      {/* Kanan: Label Type */}
      <span className="rounded-md bg-gradient-to-r from-[#aacde5]/20 to-[#f6c178]/20 px-2 py-1 text-xs text-black/80">
        {type}
      </span>
    </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-black/80">
        <div className="inline-flex items-center gap-1">
          <Banknote size={20} />
          {salary}
        </div>
        <div className="inline-flex items-center gap-1">
          <MapPin size={20} />
          {workplace}
        </div>
        <div className="inline-flex items-center gap-1">
          <BriefcaseBusiness size={20} />
          {experience}
        </div>
      </div>

      <div className="mt-5 flex justify-start">
        <button className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-gradient-to-r from-[#aacde5] to-[#deebf4] px-3 py-2 text-sm transition hover:bg-white/[0.1] hover:scale-105">
          <Eye size={20} />
          See Details
        </button>
        {/* <a href="#jobs" className="inline-flex items-center gap-2 text-sm text-black/70 underline-offset-4 transition hover:text-black hover:underline hover:scale-105">
          Selengkapnya
          <ChevronRight size={20} />
        </a> */}
      </div>
    </div>
  );
};

export default JobCard;
