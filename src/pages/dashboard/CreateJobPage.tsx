import React, { useState } from "react";
import { MultiStepJobForm } from "@/components/dashboard/jobCreation/MultiStepJobForm";
import { JobVersionCard } from "@/components/dashboard/jobCreation/JobVersionCard";

export default function CreateJobPage() {
  const [jobFormData, setJobFormData] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<"A" | "B" | null>(null);

  const handleComplete = (data: any) => {
    setJobFormData(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      {!jobFormData ? (
        <MultiStepJobForm onComplete={handleComplete} />
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setJobFormData(null)}
            className="text-gray-600 hover:text-gray-900 mb-2"
          >
            ← Back to Form
          </button>

          <h2 className="text-xl font-semibold text-gray-900">Generated Job Versions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <JobVersionCard
              version="A"
              title={`${jobFormData.job.position} - Professional Focus`}
              content={`🚀 Join ${jobFormData.company.companyName}'s Team!\n\n${jobFormData.job.dailyTasks}`}
              onChoose={() => setSelectedVersion("A")}
            />

            <JobVersionCard
              version="B"
              title={`${jobFormData.job.position} - Growth Focused`}
              content={`✨ Shape Your Career with ${jobFormData.company.companyName}!\n\n${jobFormData.job.dailyTasks}`}
              onChoose={() => setSelectedVersion("B")}
            />
          </div>

          {selectedVersion && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Version {selectedVersion} selected! You can now publish or further customize this job ad.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
