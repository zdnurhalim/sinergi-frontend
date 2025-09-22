import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const ApplicantProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 🔹 Dummy data (nanti bisa diganti fetch dari API)
  const applicant = {
    id,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+62 812-3456-7890",
    appliedAt: "2024-01-16",
    status: "shortlisted",
    resume: "https://example.com/resume.pdf",
    notes: "Sarah has 5+ years of experience in frontend development (React, TypeScript, Tailwind).",
    history: [
      { date: "2024-01-16", action: "Applied" },
      { date: "2024-01-18", action: "Reviewed by HR" },
      { date: "2024-01-20", action: "Shortlisted" },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800";
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <ul className="space-y-2">
              {applicant.history.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between text-sm text-gray-700 border-b pb-2"
                >
                  <span>{item.action}</span>
                  <span className="text-gray-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
