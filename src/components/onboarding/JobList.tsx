import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

function JobList() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const jobData = [
  {
    title: "Senior Backend Engineer",
    company: "FinPay",
    location: "Jakarta",
    salary: "Rp 18–25 jt",
    type: "Full-time",
    workplace: "Hybrid",
    experience: "Min 1 Years",
  },
  {
    title: "Product Designer",
    company: "CraftWorks",
    location: "Bandung",
    salary: "Rp 12–18 jt",
    type: "Full-time",
    workplace: "Remote",
    experience: "Min 1 Years",
  },
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Surabaya",
    salary: "Rp 14–20 jt",
    type: "Full-time",
    workplace: "On-site",
    experience: "Min 1 Years",
  },
  {
    title: "Data Analyst",
    company: "Insight Labs",
    location: "Jakarta",
    salary: "Rp 10–16 jt",
    type: "Part-time",
    workplace: "Remote",
    experience: "Min 1 Years",
  },
  {
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Yogyakarta",
    salary: "Rp 11–17 jt",
    type: "Full-time",
    workplace: "Hybrid",
    experience: "Min 1 Years",
  },
  {
    title: "DevOps Engineer",
    company: "CloudWorks",
    location: "Bandung",
    salary: "Rp 16–22 jt",
    type: "Full-time",
    workplace: "On-site",
    experience: "Min 1 Years",
  },
];


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
            href="#jobs"
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
          {jobData.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobList;
