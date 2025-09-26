import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { JobDialogs } from '@/components/dashboard/jobs/feedback/DialogState';
import { JobAlerts  } from '@/components/dashboard/jobs/feedback/AlertState';
import { getStatusColor } from "@/components/utils/GetJobStatusColor";
import { AlertState } from "@/types/AlertType";
import { DialogState } from "@/types/DialogType";
import { applicants } from "@/types/ApplicantType";

export const JobDetailsView: React.FC<{ job:Job; onBack: () => void;}> = ({ job, onBack }) => {
  const navigate = useNavigate();
  // state dialog & alert
  const [dialogState, setDialogState] = useState<DialogState>({type: null,payload: {},});
  const [alertState, setAlertState] = useState<AlertState>({ type: null });
  
  // filter tab
  const shortlistedCandidates = applicants.filter(applicant => applicant.status === 'shortlisted');
  const scheduledCandidates = applicants.filter(applicant => applicant.status === 'scheduled');
  const hiredCandidates = applicants.filter(applicant => applicant.status === 'hired');
  const rejectedCandidate = applicants.filter(applicant => applicant.status === 'rejected');

  // handler
  const handleViewProfile = (id: number) => {
    navigate(`/dashboard/jobs/applicant/${id}`);
  };

  const handleInterviewSchedule = () => {
    console.log("Interview scheduled:", dialogState.payload);
    setDialogState({ type: null, payload: {} });
  };

  const handleHireSchedule = () => {
    console.log("Hire scheduled:", dialogState.payload);
    setDialogState({ type: null, payload: {} });
  };

  const handleReject = () => {
    console.log("Rejected:", dialogState.payload);
    setDialogState({ type: null, payload: {} });
  };

  const handleShortlist = (jobId: number) => {
    console.log("Shortlisted job:", jobId);
    // TODO: panggil API shortlist / update state
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* title */}
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
      
      {/* card header */}
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

      {/* Tabs */}
      <Tabs defaultValue="applicant-list" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="applicant-list">Applicant List</TabsTrigger>
          <TabsTrigger value="review-candidate">Review Candidate</TabsTrigger>
          <TabsTrigger value="scheduled-candidate">Scheduled Candidate</TabsTrigger>
          <TabsTrigger value="hired-candidate">Hired Candidate</TabsTrigger>
          <TabsTrigger value="rejected-candidate">Rejected Candidate</TabsTrigger>
        </TabsList>

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
                       <Button variant="default" size="sm" onClick={() => handleViewProfile(applicant.id)} >
                          View Profile
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setAlertState({ type: "shortlist", payload: { applicantName: applicant.name } })}>
                            Shortlist
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() =>
                            setAlertState({
                              type: "reject",
                              payload: { applicantName: applicant.name },
                            })
                          }>
                          Reject
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
                        <p className="text-sm text-gray-500">Shortlisted: {candidate.shortlistedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="default" size="sm" onClick={() =>
                          setAlertState({
                            type: "interview",
                            payload: { applicantName: candidate.name },
                          })
                        }>
                          Interview
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() =>
                          setAlertState({
                            type: "hire",
                            payload: { applicantName: candidate.name },
                          })
                        }>
                          Hire
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() =>
                          setAlertState({
                            type: "reject",
                            payload: { applicantName: candidate.name },
                          })
                        }>
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

        <TabsContent value="scheduled-candidate" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Scheduled Candidates ({scheduledCandidates.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {scheduledCandidates.length > 0 ? (
                scheduledCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <p className="text-sm text-gray-500">Scheduled: {candidate.scheduledAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* button area */}
                        <Button variant="secondary" size="sm" onClick={() =>
                          setAlertState({
                            type: "hire",
                            payload: { applicantName: candidate.name },
                          })
                        }>
                          Hire
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() =>
                          setAlertState({
                            type: "reject",
                            payload: { applicantName: candidate.name },
                          })
                        }>
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No scheduled candidates yet. Review applicants to add them to the shortlist.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hired-candidate" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Hired Candidates ({hiredCandidates.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {hiredCandidates.length > 0 ? (
                hiredCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <p className="text-sm text-gray-500">Hired : {candidate.hiredAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* button area */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No hired candidates yet. Review applicants to add them to the shortlist.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rejected-candidate" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rejected Candidates ({rejectedCandidate.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {rejectedCandidate.length > 0 ? (
                rejectedCandidate.map((candidate) => (
                  <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <p className="text-sm text-gray-500">Rejected : {candidate.rejectedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* button area */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No rejected candidates yet. Review applicants to add them to the rejected.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div>
        {/* Alerts */}
        <JobAlerts
          alertState={alertState}
          setAlertState={setAlertState}
          setDialogState={setDialogState}
          onShortlist={() => handleShortlist(job.id)}
        />
        {/* Dialogs */}
        <JobDialogs
          dialogState={dialogState}
          setDialogState={setDialogState}
          onInterviewConfirm={handleInterviewSchedule}
          onHireConfirm={handleHireSchedule}
          onRejectConfirm={handleReject}
        />

      </div>
    </div>
  );
};