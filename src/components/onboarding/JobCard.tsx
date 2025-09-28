import React, { useState, useEffect } from 'react';
import { CircleDollarSign, MapPin, Eye, ChevronRight } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  workplace: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, salary, type, workplace }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl shadow-lg transform transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        hover:scale-105 hover:bg-white/[0.08]
      `}
      style={{ transitionDelay: '50ms' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight" style={{ letterSpacing: '-0.01em' }}>{title}</h3>
          <p className="text-sm text-white/70">{company} • {location}</p>
        </div>
        <span className="rounded-md bg-gradient-to-r from-[#aacde5]/20 to-[#f6c178]/20 px-2 py-1 text-xs text-white/80">{type}</span>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
        <div className="inline-flex items-center gap-1">
          <CircleDollarSign size={20} />
          {salary}
        </div>
        <div className="inline-flex items-center gap-1">
          <MapPin size={20} />
          {workplace}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/[0.1] hover:scale-105">
          <Eye size={20} />
          Lihat Detail
        </button>
        <a href="#jobs" className="inline-flex items-center gap-2 text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline hover:scale-105">
          Selengkapnya
          <ChevronRight size={20} />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
