import React, { useState } from "react";
import JobsList from "@/components/dashboard/jobs/JobsList";
import {JobDetailsView} from "@/components/dashboard/jobs/JobDetailsView";
import { Job } from "@/types/job";

const sampleJobs: Job[] = [
  { id: 1, title: "Social Media Specialist", company: "KopiKreatif", description: "We are looking for a creative Social Media Specialist...", status: "published", applicants: 24, createdAt: "2024-01-15" },
  { id: 2, title: "Frontend Developer", company: "TechStart Indonesia", description: "Join our team as a Frontend Developer...", status: "draft", applicants: 0, createdAt: "2024-01-20" },
  { id: 3, title: "Marketing Manager", company: "GrowthCo", description: "We are seeking an experienced Marketing Manager...", status: "published", applicants: 18, createdAt: "2024-01-10" },
  { id: 4, title: "UX Designer", company: "DesignHub", description: "Looking for a talented UX Designer...", status: "closed", applicants: 45, createdAt: "2024-01-05" },
];

export default function JobsPage() {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleCreateNew = () => {
    console.log("create new job");
  };

  const handleEdit = (id: number) => {
    console.log("Edit job", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete job", id);
  };

  const handleView = (id: number) => {
    const job = jobs.find((j) => j.id === id) || null;
    setSelectedJob(job);
  };

  const handleBackFromDetail = () => setSelectedJob(null);

  if (selectedJob) {
    return <JobDetailsView job={selectedJob} onBack={handleBackFromDetail} />;
  }

  return (
    <JobsList
      jobs={jobs}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onView={handleView}
      onCreateNew={handleCreateNew}
    />
  );
}
