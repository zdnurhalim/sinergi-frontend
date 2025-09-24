import React from "react";
import {JobCard} from "@/components/dashboard/jobs/JobCard";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";

interface Props {
  jobs: Job[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onCreateNew?: () => void;
}

export default function JobsList({ jobs, onEdit, onDelete, onView, onCreateNew }: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
        <div className="space-x-2">
          {onCreateNew && (
            <Button variant="default" size="lg" onClick={onCreateNew}>
              Create New Job
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} onView={onView} />
        ))}
      </div>
    </div>
  );
}
