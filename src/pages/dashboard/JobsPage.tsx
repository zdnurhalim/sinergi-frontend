import React, { useEffect, useState, useMemo } from "react";
import JobsList from "@/components/dashboard/jobs/JobsList";
import { JobDetailsView } from "@/components/dashboard/jobs/JobDetailsView";
import { JobsFilter } from "@/components/dashboard/jobs/JobFilter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobAds } from "@/store/JobAdsThunk";
import { RootState, AppDispatch } from "@/store/store";
import { JobMapping } from "@/types/job";
import { useAuthToken } from "@/hooks/useAuthToken";

export default function JobsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: jobAds, loading, error } = useSelector((state: RootState) => state.jobAds);

  const [selectedJob, setSelectedJob] = useState<JobMapping | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (token) {
      dispatch(fetchJobAds(token));
    }
  }, [dispatch, token]);

  // Mapping JobAd -> Job
  const mappedJobs: JobMapping[] = useMemo(() => {
    return jobAds.map((jobAd) => ({
      id: jobAd.id,
      title: jobAd.job_requirement.position,
      company: jobAd.job_requirement.company_description,
      description: jobAd.job_requirement.daily_tasks,
      status: jobAd.status,
      applicants: 0,
      createdAt: jobAd.created_at,
      category: jobAd.job_requirement.work_arrangement.toLowerCase(),
    }));
  }, [jobAds]);

  const handleEdit = (id: number) => console.log("Edit job", id);
  const handleDelete = (id: number) => console.log("Delete job", id);
  const handleView = (id: number) => setSelectedJob(mappedJobs.find((j) => j.id === id) || null);
  const handleBackFromDetail = () => setSelectedJob(null);
  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
  };

  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(mappedJobs.map((j) => j.category)));
    return [{ value: "all", label: "All" }, ...cats.map((c) => ({ value: c, label: c }))];
  }, [mappedJobs]);

  const statusOptions = useMemo(() => {
    const stats = Array.from(new Set(mappedJobs.map((j) => j.status)));
    return [{ value: "all", label: "All" }, ...stats.map((s) => ({ value: s, label: s }))];
  }, [mappedJobs]);

  const filteredJobs = useMemo(() => {
    return mappedJobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || job.category === category;
      const matchStatus = status === "all" || job.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [mappedJobs, search, category, status]);

  if (selectedJob) return <JobDetailsView job={selectedJob} onBack={handleBackFromDetail} />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
      </div>

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

      <JobsList jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
    </div>
  );
}
