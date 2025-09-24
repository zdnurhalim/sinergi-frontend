import React from "react";
import {JobCard} from "@/components/dashboard/jobs/JobCard";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";

interface Props {
  jobs: Job[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

export default function JobsList({ jobs, onEdit, onDelete, onView }: Props) {
  return (
    <div>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} onView={onView} />
        ))}
      </div>
    </div>
  );
}
