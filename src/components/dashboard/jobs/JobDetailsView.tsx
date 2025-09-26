import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReusableAlert } from '@/components/reusable/AlertDialog';
import { ReusableDialog } from "@/components/reusable/Dialog";
import { Job } from "@/types/job";
import { DatePicker } from '@/components/reusable/Datepicker';
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Applicant {
  id: number;
  name: string;
  email: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'scheduled' | 'hired';
  appliedAt: string;
}

export const JobDetailsView: React.FC<{ job:Job; onBack: () => void;}> = ({ job, onBack }) => {
  const navigate = useNavigate();
  
  const handleViewProfile = (id: number) => {
    navigate(`/dashboard/jobs/applicant/${id}`);
  };

  const [applicants] = useState<Applicant[]>([
    {id: 1,name: 'Sarah Johnson', email: 'sarah.johnson@email.com', status: 'shortlisted', appliedAt: '2024-01-16'},
    {id: 2, name: 'Michael Chen', email: 'michael.chen@email.com', status: 'scheduled', appliedAt: '2024-01-17'},
    {id: 3, name: 'Emma Rodriguez', email: 'emma.rodriguez@email.com', status: 'applied', appliedAt: '2024-01-18'},
    { id: 4, name: 'John Doe', email: 'johndoe@gmail.com', status: 'scheduled', appliedAt: '2024-01-18' },
    { id: 5, name: 'Jane Smith', email: 'janesmith@gmail.com', status: 'hired', appliedAt: '2024-01-19' },
  ]);

  const shortlistedCandidates = applicants.filter(applicant => applicant.status === 'shortlisted');
  const scheduledCandidates = applicants.filter(applicant => applicant.status === 'scheduled');
  const hiredCandidates = applicants.filter(applicant => applicant.status === 'hired');
  const rejectedCandidate = applicants.filter(applicant => applicant.status === 'rejected');
  const [activeAlert, setActiveAlert] = useState<null | "reject" | "shortlist" | "hire" | "interview">(null);
  const [activeDialog, setActiveDialog] = useState<null | "hire" | "interview" | "reject">(null);
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined);
  const [interviewMessage, setInterviewMessage] = useState("");
  const [hireDate, setHireDate] = useState<Date | undefined>(undefined);
  const [hireTime, setHireTime] = useState<string>("");
  const [hireMessage, setHireMessage] = useState("");
  const [rejectMessage, setRejectMessage] = useState<string>("");
  const [applicantName, setApplicantName] = useState<string>("");

  const onShortlist = (id: number) => {
    // Logic to reject candidate
    setActiveAlert(null);
  }
  const handleInterviewSchedule = () => {
    console.log("Schedule:", { interviewDate, interviewMessage });
    setActiveDialog(null);
  };
  const handleHireSchedule = () => {
    console.log("Hire:", {
      date: hireDate ? format(hireDate, "yyyy-MM-dd") : null,
      time: hireTime,
      message: hireMessage,
    })
    setActiveDialog(null);
    setHireDate(null)
    setHireTime(null)
  };
  const handleReject = () => {
    console.log("Reject:", { rejectMessage });
    setActiveDialog(null);
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'hired':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                        <Button variant="secondary" size="sm" onClick={() => setActiveAlert("shortlist")}>
                            Shortlist
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => { setActiveAlert("reject"); setApplicantName(applicant.name); }}>
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
                        <p className="text-sm text-gray-500">Applied: {candidate.appliedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="default" size="sm" onClick={() => setActiveAlert("interview")}>
                          Interview
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setActiveAlert("hire")}>
                          Hire
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => setActiveAlert("reject")}>
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
                        <p className="text-sm text-gray-500">Applied: {candidate.appliedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* button area */}
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
                        <p className="text-sm text-gray-500">Applied: {candidate.appliedAt}</p>
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
                        <p className="text-sm text-gray-500">Applied: {candidate.appliedAt}</p>
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

      {/*Alert Section */}
      <ReusableAlert
          open={activeAlert === "reject"}
          onOpenChange={(open) => setActiveAlert(open ? "reject" : null)}
          title={"Reject Candidate : "+applicantName}
          description="This action cannot be undone. This will permanently to reject this candidate."
          confirmText="Yes, Reject"
          onConfirm={() => setActiveDialog("reject")}
        />
      
      <ReusableAlert
        open={activeAlert === "shortlist"}
        onOpenChange={(open) => setActiveAlert(open ? "shortlist" : null)}
        title="Shortlist this candidate?"
        description="This action cannot be undone. This will permanently shortlisted the candidate."
        confirmText="Yes, shortlist"
        onConfirm={() => onShortlist(job.id)}
      />

      <ReusableAlert
        open={activeAlert === "interview"}
        onOpenChange={(open) => setActiveAlert(open ? "interview" : null)}
        title="Schedule Interview?"
        description="This action cannot be undone. This will permanently schedule an interview for this candidate."
        confirmText="Yes, Schedule"
        onConfirm={() => setActiveDialog("interview")}
      />

      <ReusableAlert
        open={activeAlert === "hire"}
        onOpenChange={(open) => setActiveAlert(open ? "hire" : null)}
        title="Hire Candidate?"
        description="This action cannot be undone. This will permanently hire this candidate."
        confirmText="Yes, Hire"
        onConfirm={() => setActiveDialog("hire")}
      />

      {/* Dialog Section */}
      <ReusableDialog
        open={activeDialog === "interview"}
        onOpenChange={(open) => setActiveDialog(open ? "interview" : null)}
        title="Set Interview Schedule"
        description="Choose a date and message for the candidate."
        confirmText="Set Interview"
        onConfirm={handleInterviewSchedule}
      >
        {/* isi custom */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <DatePicker value={interviewDate} onChange={setInterviewDate} placeholder="Select hire date" className="w-full" />
          </div>
          <div className="flex-1">
            <Input type="time" value={hireTime} onChange={(e) => setHireTime(e.target.value)}/>
          </div>
        </div>
        <Textarea  placeholder="Message to candidate..." value={interviewMessage} onChange={(e) => setInterviewMessage(e.target.value)}  rows={3}/>
      </ReusableDialog>

      <ReusableDialog
        open={activeDialog === "hire"}
        onOpenChange={(open) => setActiveDialog(open ? "hire" : null) }
        title="set a work schedule"
        description="choose a date and message for the candidate."
        confirmText="Save Schedule"
        onConfirm={handleHireSchedule}
      >
        {/* isi custom */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <DatePicker value={hireDate || undefined} onChange={setHireDate} placeholder="Select hire date" className="w-full" />
          </div>
          <div className="flex-1">
            <Input type="time" value={hireTime} onChange={(e) => setHireTime(e.target.value)}/>
          </div>
        </div>
        <Textarea
          placeholder="message to candidate..."
          value={hireMessage}
          onChange={(e) => setHireMessage(e.target.value)}
          // className="w-full border rounded px-2 py-1"
          rows={3}
        />
      </ReusableDialog>

      <ReusableDialog
        open={activeDialog === "reject"}
        onOpenChange={(open) => setActiveDialog(open ? "reject" : null) }
        title={"Reject Candidate : " + applicantName}
        description="Fill in the message to be sent to the candidate."
        confirmText="Reject Candidate"
        onConfirm={handleReject}
      >
        {/* isi custom */}
        <Textarea placeholder="message to candidate..." value={rejectMessage || undefined} onChange={(e) => setRejectMessage(e.target.value)} rows={3}/>
      </ReusableDialog>
    </div>
  );
};