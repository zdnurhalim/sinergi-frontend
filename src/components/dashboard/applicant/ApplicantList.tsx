import React, {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReusableAlert } from '@/components/reusable/AlertDialog';
import { ReusableDialog } from "@/components/reusable/Dialog";

export interface ApplicantListProps {
    // Tambahkan props jika diperlukan
    id: number;
    name: string;
    email: string;
    status: 'applied' | 'shortlisted' | 'rejected' | 'scheduled' | 'hired';
    appliedAt: string;
}

interface ApplicantListComponentProps {
  applicants: ApplicantListProps[];
  onSelect: (applicant: ApplicantListProps) => void;
}

const ApplicantList: React.FC<ApplicantListComponentProps> = ({applicants,onSelect}) => {
    const navigate = useNavigate();
    const handleViewProfile = (id: number) => {
        navigate(`/dashboard/jobs/applicant/${id}`);
    };

    const [activeAlert, setActiveAlert] = useState<null | "reject" | "shortlist" | "hire" | "interview">(null);
    const [activeDialog, setActiveDialog] = useState<null | "hire" | "interview">(null);
    const [interviewDate, setInterviewDate] = useState("");
    const [interviewMessage, setInterviewMessage] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [hireMessage, setHireMessage] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState<ApplicantListProps | null>(null);

    const onReject = (id: number) => {
        // Logic to reject candidate
        console.log("Reject candidate with id:", id);
        setActiveAlert(null);
    }
    const onShortlist = (id: number) => {
        // Logic to reject candidate
        console.log("Shortlist candidate with id:", id);
        setActiveAlert(null);
    }
    const handleInterviewSchedule = () => {
        console.log("Schedule:", { interviewDate, interviewMessage });
        setActiveDialog(null);
    };
    const handleHireSchedule = () => {
        console.log("Hire:", { hireDate, hireMessage });
        setActiveDialog(null);
    };
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
        <div>
            {/* header */}
            <div></div>

            {/* body */}
            <div className="space-y-6">
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
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>


            <ReusableAlert
                open={activeAlert === "reject"}
                onOpenChange={(open) => setActiveAlert(open ? "reject" : null)}
                title="Reject Candidate?"
                description="This action cannot be undone. This will permanently to reject this candidate."
                confirmText="Yes, Reject"
                onConfirm={() => {
                    if (selectedCandidate) {
                    onReject(selectedCandidate.id);
                    setSelectedCandidate(null);
                    }
                }}
            />
            
            <ReusableAlert
                open={activeAlert === "shortlist"}
                onOpenChange={(open) => setActiveAlert(open ? "shortlist" : null)}
                title="Shortlist this candidate?"
                description="This action cannot be undone. This will permanently shortlisted the candidate."
                confirmText="Yes, shortlist"
                onConfirm={() => {
                    if (selectedCandidate) {
                    onShortlist(selectedCandidate.id);
                    setSelectedCandidate(null);
                    }
                }}
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
    
            <ReusableDialog
                open={activeDialog === "interview"}
                onOpenChange={(open) => setActiveDialog(open ? "interview" : null)}
                title="Set Interview Schedule"
                description="Choose a date and message for the candidate."
                confirmText="Save Schedule"
                onConfirm={handleInterviewSchedule}
            >
            {/* isi custom */}
            <input
                type="datetime-local"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full border rounded px-2 py-1 mb-3"
            />
            <textarea
                placeholder="Message to candidate..."
                value={interviewMessage}
                onChange={(e) => setInterviewMessage(e.target.value)}
                className="w-full border rounded px-2 py-1"
                rows={3}
            />
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
            <input
                type="datetime-local"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="w-full border rounded px-2 py-1 mb-3"
            />
            <textarea
                placeholder="message to candidate..."
                value={hireMessage}
                onChange={(e) => setHireMessage(e.target.value)}
                className="w-full border rounded px-2 py-1"
                rows={3}
            />
            </ReusableDialog>
        </div>
    );
};

export default ApplicantList;