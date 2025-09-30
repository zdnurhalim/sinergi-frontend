import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { JobRequirement } from '@/types/JobRequirement';
import { useNavigate } from 'react-router-dom';

interface JobListProps {
  jobListSample: JobRequirement[];
  onSelect: (job: JobRequirement) => void;
}

function JobList({ jobListSample, onSelect }: JobListProps) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      className={`relative transition-all duration-700 text-black/70 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-4xl text-black font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Latest Vacancies
          </h2>
          <a
            onClick={() => navigate('/explore-jobs')}
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/5 px-3 py-2 text-sm text-black/85 transition hover:bg-white/[0.08]"
          >
            Explore Job Ads
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobListSample.slice(0, 6).map((job, index) => (
            <JobCard 
              key={index}
              {...job}
              onClick={() => onSelect(job)}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobList;
