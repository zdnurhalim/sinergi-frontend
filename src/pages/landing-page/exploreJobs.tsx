import React, { useState, useEffect } from "react";
import JobCard from "@/components/onboarding/JobCard";
import JobFilter from "@/components/onboarding/JobFilter";
import { jobListSample } from "@/types/JobRequirement";
import { useNavigate } from "react-router-dom";
import { JobRequirement } from "@/types/JobRequirement";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn/ui Skeleton

const ExploreJobs: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1.5 detik loading
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = jobListSample.filter((job) => {
    const matchesSearch = job.desired_position.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" ? true : job.industry === category;
    const matchesStatus = status === "All" ? true : status === "Open" ? new Date(job.vacancy_deadline) >= new Date() : false;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categoryOptions = Array.from(new Set(jobListSample.map((j) => j.industry))).map((val) => ({ value: val, label: val }));
  const statusOptions = [
    { value: "All", label: "All" },
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
  ];

  const handleSelect = (job: JobRequirement) => {
    navigate(`job-detail/${job.id}`);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  return (
    <div className="mt-16">
      <div
        className="w-full absolute top-0 h-64 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/df095bc2f4e8115febab0386b8096ac19c3a4553?placeholderIfAbsent=true')",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <JobFilter
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          onReset={handleReset}
          categoryOptions={categoryOptions}
          statusOptions={statusOptions}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {loading
            ? Array.from({ length: jobListSample.length }).map((_, i) => (
                <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl bg-black/30" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px] bg-black/30" />
                    <Skeleton className="h-4 w-[150px] bg-black/30" />
                </div>
                </div>
              ))
            : filteredJobs.map((job, index) => (
                <JobCard key={index} {...job} onClick={() => handleSelect(job)} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreJobs;
