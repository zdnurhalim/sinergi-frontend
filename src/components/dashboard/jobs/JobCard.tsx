import React from 'react';
import { ReusableAlert } from "@/components/reusable/AlertDialog";
import { CardJobList } from "@/components/reusable/CardJobList";
import { useState } from "react";
interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  applicants: number;
  createdAt: string;
}

interface JobCardProps {
  job: Job;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onView, className = '' }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <div>  
      {/* panggil reusable card dari CardJobList */}
      <CardJobList
        job={job}
        onView={onView}
        onEdit={onEdit}
        onDelete={() => setIsAlertOpen(true)} // trigger alert sebelum hapus
      />
      
      {/* call alert */}
      <ReusableAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Delete Job?"
        description="This action cannot be undone. This will permanently delete this job."
        confirmText="Yes, delete"
        onConfirm={() => onDelete(job.id)}
      />
    </div>
  );
};