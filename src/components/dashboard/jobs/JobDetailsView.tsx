import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReusableAlert } from '@/components/reusable/AlertDialog';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  applicants: number;
  createdAt: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  status: 'applied' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedAt: string;
}

interface JobDetailsViewProps {
  job: Job;
  onBack: () => void;
}

export const JobDetailsView: React.FC<JobDetailsViewProps> = ({ job, onBack }) => {
  const navigate = useNavigate();
  
  const handleViewProfile = (id: number) => {
    navigate(`/dashboard/jobs/applicant/${id}`);
  };

  const [applicants] = useState<Applicant[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      status: 'shortlisted',
      appliedAt: '2024-01-16'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      status: 'reviewed',
      appliedAt: '2024-01-17'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      status: 'applied',
      appliedAt: '2024-01-18'
    }
  ]);

  const shortlistedCandidates = applicants.filter(applicant => applicant.status === 'shortlisted');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onDelete = (id: number) => {
    // Logic to reject candidate
    setIsAlertOpen(false);
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          job.status === 'published' ? 'bg-green-100 text-green-800' :
          job.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="job-details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="job-details">Job Details</TabsTrigger>
          <TabsTrigger value="applicant-list">Applicant List</TabsTrigger>
          <TabsTrigger value="review-candidate">Review Candidate</TabsTrigger>
        </TabsList>

        <TabsContent value="job-details" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <p className="text-gray-900">{job.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <p className="text-gray-900">{job.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className="text-gray-900">{job.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Created</label>
                    <p className="text-gray-900">{job.createdAt}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Job Description</label>
                <p className="text-gray-900 whitespace-pre-line">{job.description}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applicant-list" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Applicants ({applicants.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <div key={applicant.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{applicant.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{applicant.email}</p>
                      <p className="text-sm text-gray-500">Applied: {applicant.appliedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleViewProfile(applicant.id)}
                        >
                          View Profile
                        </Button>
                      <Button
                          variant="secondary"
                          size="sm"
                        >
                          Shortlist
                        </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review-candidate" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Shortlisted Candidates ({shortlistedCandidates.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {shortlistedCandidates.length > 0 ? (
                shortlistedCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Shortlisted
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <p className="text-sm text-gray-500">Applied: {candidate.appliedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="default" size="sm" >
                          Interview
                        </Button>
                        <Button variant="secondary" size="sm" >
                          Hire
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => setIsAlertOpen(true)}>
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No shortlisted candidates yet. Review applicants to add them to the shortlist.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ReusableAlert
          open={isAlertOpen}
          onOpenChange={setIsAlertOpen}
          title="Reject Candidate?"
          description="This action cannot be undone. This will permanently to reject this candidate."
          confirmText="Yes, Reject"
          onConfirm={() => onDelete(job.id)}
        />
    </div>
  );
};