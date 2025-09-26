import React, {useState} from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Eye, Edit2, Trash2, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReusableDialog } from "@/components/reusable/Dialog";
import { DatePicker } from "@/components/reusable/Datepicker";

export interface Job {
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
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}

const getStatusStyle = (status: Job['status']) => {
  switch (status) {
    case 'published': return 'bg-green-100 text-green-800';
    case 'draft': return 'bg-yellow-100 text-yellow-800';
    case 'closed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const CardJobList: React.FC<JobCardProps> = ({ job, onView, onEdit, onDelete, className = '' }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastPublishedDate, setLastPublishedDate] = useState<Date | undefined>(undefined);
  const handleConfirmDate = () => {
    console.log("Update last published date for job", job.id, "to", lastPublishedDate);
    setDialogOpen(false);
    // nanti bisa panggil API update tanggal terakhir
  };

  return (
    <Card className={`relative transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <CardTitle className="text-lg md:text-xl">{job.title}</CardTitle>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
          <CardDescription className="text-sm text-gray-600 mb-2">{job.company}</CardDescription>
          <CardDescription className="text-sm text-gray-700 line-clamp-3">{job.description}</CardDescription>
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onView(job.id)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye size={18} />
          </button>
          {/* conditional button */}
          {job.status === "draft" ? (
            <button
              onClick={() => navigate(`edit/${job.id}`)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 size={18} />
            </button>
          ) : job.status === "published" ? (
            <button
              onClick={() => setDialogOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Calendar size={18} />
            </button>
          ) : null}
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </CardHeader>

      <CardFooter className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 mt-2 p-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <User size={14} /> {job.applicants} applicants
          </span>
          <span>Created: {job.createdAt}</span>
        </div>
      </CardFooter>

       <ReusableDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Update Last Published Date"
          description="Please select the new date for when this job was last advertised."
          confirmText="Update Date"
          cancelText="Cancel"
          onConfirm={handleConfirmDate}
        >
          <DatePicker
            value={lastPublishedDate}
            onChange={setLastPublishedDate}
            placeholder="Select last published date"
          />
        </ReusableDialog>
    </Card>
  );
};
