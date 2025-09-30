import React, { useState, useEffect } from "react";
import { Banknote, MapPin, BriefcaseBusiness, Timer } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { JobRequirement } from "@/types/JobRequirement";

interface JobCardProps extends JobRequirement {
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  benefits,
  industry,
  salary_max,
  salary_min,
  daily_tasks,
  company_name,
  company_size,
  age_limitation,
  desired_position,
  specific_details,
  work_arrangement,
  gender_preference,
  other_information,
  skills_requirement,
  application_process,
  education_requirement,
  description,
  experience_requirement,
  vacancy_deadline,
  onClick,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={onClick}
      className={`group rounded-2xl border border-black/10 bg-white/50 backdrop-blur-xl shadow-lg transform transition-all duration-500 cursor-pointer 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        hover:border-[#f6c178] hover:shadow-[0_0_25px_6px_#aacde580]
      `}
      style={{ transitionDelay: "50ms" }}
    >
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between">
          {/* Kiri: Avatar + Info */}
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt={company_name} />
              <AvatarFallback>{company_name?.[0]}</AvatarFallback>
            </Avatar>

            <div>
              <h3
                className="text-lg font-semibold tracking-tight text-black/70"
                style={{ letterSpacing: "-0.01em" }}
              >
                {desired_position}
              </h3>
              <p className="text-sm text-black/70">
                {company_name}
              </p>
            </div>
          </div>

          {/* Kanan: Work arrangement */}
          <span className="rounded-full flex gap-1 border bg-gradient-to-r from-[#aacde5]/20 to-[#f6c178]/20 px-2 py-1 text-xs text-black/80">
            <Timer size={18} />
            {work_arrangement}
          </span>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 text-sm text-black/80 flex-wrap">
          <div className="inline-flex items-center gap-2 border rounded-full py-1 px-2">
            <Banknote size={18} />
            Rp {salary_min} - Rp {salary_max}
          </div>
          <div className="inline-flex items-center gap-2 border rounded-full py-1 px-2">
            <MapPin size={18} />
            {company_size}
          </div>
          <div className="inline-flex items-center gap-2 border rounded-full py-1 px-2">
            <BriefcaseBusiness size={18} />
            {experience_requirement.join(", ")}
          </div>
        </div>

        {skills_requirement?.length > 0 && (
          <div className="border-t border-dashed my-3 pt-3 pb-6 gap-2 flex flex-wrap">
            {skills_requirement.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 border rounded-lg py-1 px-3 text-sm text-black/80"
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full bottom-0 absolute text-xs bg-slate-600/5 h-fit rounded-b-2xl px-5 py-1.5 flex justify-between text-black/50">
        <span>Closed on {vacancy_deadline}</span>
        <span>Applicant : 20</span>
      </div>
    </div>
  );
};

export default JobCard;
