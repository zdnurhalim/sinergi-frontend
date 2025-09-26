import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { applicants } from "@/types/ApplicantType";
import { getStatusColor } from "@/components/utils/GetJobStatusColor";

export const ApplicantProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
   const applicant = applicants.find((a) => a.id === Number(id));
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 🔹 Header */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" size="default" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="mr-2" />
            Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 flex-1">
          Applicant Profile
        </h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            applicant.status
          )}`}
        >
          {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
        </span>
      </div>

      {/* 🔹 Basic Info Card */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {applicant.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {applicant.name}
            </h2>
            <p className="text-gray-700">{applicant.email}</p>
            <p className="text-gray-700">{applicant.phone}</p>
            <p className="text-sm text-gray-500">
              Applied on {applicant.appliedAt}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Tabs Section */}
      <Tabs defaultValue="resume" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Resume Tab */}
        <TabsContent value="resume" className="mt-4">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
            <a
              href={applicant.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Open Resume
            </a>
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-4">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Applicant Notes
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{applicant.notes}</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              HR Notes
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{applicant.notes}</p>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-4">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application History
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex justify-between border-b pb-2">
                <span>Applied</span>
                <span className="text-gray-500">{applicant.appliedAt}</span>
              </li>
              {applicant.shortlistedAt && (
                <li className="flex justify-between border-b pb-2">
                  <span>Shortlisted</span>
                  <span className="text-gray-500">{applicant.shortlistedAt}</span>
                </li>
              )}
              {applicant.scheduledAt && (
                <li className="flex justify-between border-b pb-2">
                  <span>Interview Scheduled</span>
                  <span className="text-gray-500">{applicant.scheduledAt}</span>
                </li>
              )}
              {applicant.hiredAt && (
                <li className="flex justify-between border-b pb-2">
                  <span>Hired</span>
                  <span className="text-gray-500">{applicant.hiredAt}</span>
                </li>
              )}
              {applicant.rejectedAt && (
                <li className="flex justify-between border-b pb-2">
                  <span>Rejected</span>
                  <span className="text-gray-500">{applicant.rejectedAt}</span>
                </li>
              )}
            </ul>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};
