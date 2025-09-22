import React from 'react';

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{job.company}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{job.description}</p>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onView(job.id)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View job"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3C4.5 3 1.73 5.61 1 8C1.73 10.39 4.5 13 8 13C11.5 13 14.27 10.39 15 8C14.27 5.61 11.5 3 8 3ZM8 11.5C6.62 11.5 5.5 10.38 5.5 9C5.5 7.62 6.62 6.5 8 6.5C9.38 6.5 10.5 7.62 10.5 9C10.5 10.38 9.38 11.5 8 11.5ZM8 8C7.45 8 7 8.45 7 9C7 9.55 7.45 10 8 10C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button
            onClick={() => onEdit(job.id)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit job"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.66675 13.0367C3.17342 13.0367 2.68675 12.85 2.31342 12.4767C1.95342 12.1167 1.75342 11.6367 1.75342 11.1233C1.75342 10.61 1.95342 10.13 2.31342 9.77L10.9801 1.10333C11.7268 0.356668 12.9401 0.356668 13.6868 1.10333C14.0468 1.46333 14.2468 1.94333 14.2468 2.45667C14.2468 2.97 14.0468 3.45 13.6868 3.81L5.02008 12.4767C4.64675 12.85 4.16008 13.0367 3.66675 13.0367Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete job"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2C6 1.44772 6.44772 1 7 1H9C9.55228 1 10 1.44772 10 2V3H6V2Z" fill="currentColor"/>
              <path d="M4 4H12V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4Z" fill="currentColor"/>
              <path d="M2 3.5C2 3.22386 2.22386 3 2.5 3H13.5C13.7761 3 14 3.22386 14 3.5C14 3.77614 13.7761 4 13.5 4H2.5C2.22386 4 2 3.77614 2 3.5Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7C8.38071 7 9.5 5.88071 9.5 4.5C9.5 3.11929 8.38071 2 7 2C5.61929 2 4.5 3.11929 4.5 4.5C4.5 5.88071 5.61929 7 7 7Z" fill="currentColor"/>
              <path d="M7 8.5C4.51472 8.5 2.5 10.5147 2.5 13H11.5C11.5 10.5147 9.48528 8.5 7 8.5Z" fill="currentColor"/>
            </svg>
            {job.applicants} applicants
          </span>
          <span>Created: {job.createdAt}</span>
        </div>
      </div>
    </div>
  );
};