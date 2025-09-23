import React from "react";
import {JobVersionCard} from "@/components/dashboard/jobCreation/JobVersionCard";

interface Props {
  jobFormData: any;
  selectedVersion: "A" | "B" | null;
  onChooseVersion: (v: "A" | "B") => void;
  onBack: () => void;
}

export default function JobVersions({ jobFormData, selectedVersion, onChooseVersion, onBack }: Props) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        ← Back to Form
      </button>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Generated Job Versions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobVersionCard
            version="A"
            title={`${jobFormData.job.position} - Professional Focus`}
            content={`🚀 Join ${jobFormData.company.companyName}'s Team!\n\n${jobFormData.job.dailyTasks}`}
            onChoose={() => onChooseVersion("A")}
          />

          <JobVersionCard
            version="B"
            title={`${jobFormData.job.position} - Growth Focused`}
            content={`✨ Shape Your Career with ${jobFormData.company.companyName}!\n\n${jobFormData.job.dailyTasks}`}
            onChoose={() => onChooseVersion("B")}
          />
        </div>

        {selectedVersion && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ Version {selectedVersion} selected! You can now proceed to publish or further customize this job ad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
