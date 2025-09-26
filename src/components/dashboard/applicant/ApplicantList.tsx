import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/components/utils/GetJobStatusColor";
import { ApplicantIterface as ApplicantListProps } from '@/types/ApplicantType';

interface ApplicantListComponentProps {
  applicants: ApplicantListProps[];
  onSelect: (applicant: ApplicantListProps) => void;
}

const ApplicantList: React.FC<ApplicantListComponentProps> = ({applicants,onSelect}) => {
    const navigate = useNavigate();
    const handleViewProfile = (id: number) => {
        navigate(`/dashboard/jobs/applicant/${id}`);
    };
      
    return (
        <div>

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
                                        {/* Kiri: Nama, status, email */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-medium text-gray-900">{applicant.name}</h4>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                                                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                                </span>
                                            </div>
                                            
                                            {/* Email */}
                                            <p className="text-sm text-gray-600">{applicant.email}</p>
                                            
                                            {/* Applied date */}
                                            <p className="text-sm text-gray-500">Applied: {applicant.appliedAt}</p>
                                        </div>

                                        {/* Kanan: Applied Position + Button View Profile */}
                                        <div className="flex items-center gap-6">
                                            {/* Applied Position */}
                                            <div className="flex flex-col text-sm text-right">
                                                <span className="text-xs text-gray-400 mb-1">Applied Position</span>
                                                <span className="font-medium text-gray-900">{applicant.appliedPosition}</span>
                                            </div>
                                            
                                            {/* Button View Profile */}
                                            <Button variant="default" size="sm" onClick={() => handleViewProfile(applicant.id)}>
                                                View Profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ApplicantList;