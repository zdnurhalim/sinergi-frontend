import React, { useState, useMemo } from "react";
import JobsList from "@/components/dashboard/jobs/JobsList";
import {JobDetailsView} from "@/components/dashboard/jobs/JobDetailsView";
import { JobsFilter } from "@/components/dashboard/jobs/JobFilter";
import { useNavigate } from "react-router-dom";
import { Job } from "@/types/job";

const sampleJobs: Job[] = [
  { id: 1, title: "Social Media Specialist", company: "KopiKreatif", description: "We are looking for a creative Social Media Specialist...", status: "published", applicants: 24, createdAt: "2024-01-15", category: "marketing" },
  { id: 2, title: "Frontend Developer", company: "TechStart Indonesia", description: "Join our team as a Frontend Developer...", status: "draft", applicants: 0, createdAt: "2024-01-20", category: "tech" },
  { id: 3, title: "Marketing Manager", company: "GrowthCo", description: "We are seeking an experienced Marketing Manager...", status: "published", applicants: 18, createdAt: "2024-01-10", category: "marketing" },
  { id: 4, title: "UX Designer", company: "DesignHub", description: "Looking for a talented UX Designer...", status: "closed", applicants: 45, createdAt: "2024-01-05", category: "design" },
];

export default function JobsPage() {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();

  const handleEdit = (id: number) => console.log("Edit job", id);
  const handleDelete = (id: number) => console.log("Delete job", id);
  const handleView = (id: number) => setSelectedJob(jobs.find((j) => j.id === id) || null);
  const handleBackFromDetail = () => setSelectedJob(null);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
  };

  // 🔹 Generate filter options dynamically
  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(jobs.map((j) => j.category)));
    return [{ value: "all", label: "All" }, ...cats.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))];
  }, [jobs]);

  const statusOptions = useMemo(() => {
    const stats = Array.from(new Set(jobs.map((j) => j.status)));
    return [{ value: "all", label: "All" }, ...stats.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))];
  }, [jobs]);

   // Filtered list
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.status.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || job.category === category;
      const matchStatus = status === "all" || job.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [jobs, search, category, status]);

  if (selectedJob) {
    return <JobDetailsView job={selectedJob} onBack={handleBackFromDetail} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
      </div>

      {/* 🔹 Filter Card */}
      <JobsFilter
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
      {/* 🔹 Jobs List */}
      <JobsList
        jobs={filteredJobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
}
