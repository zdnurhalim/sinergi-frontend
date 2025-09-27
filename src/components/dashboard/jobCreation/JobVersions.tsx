
import React, { useState } from "react";
import { JobVersionCard } from "@/components/dashboard/jobCreation/JobVersionCard";
import { Button } from "@/components/ui/button"; 
import { Edit } from "lucide-react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useAuthToken } from "@/hooks/useAuthToken";
// import { JobRequirementResponse } from "@/types/JobRequirement";
import { JobRequirementService } from "@/services/JobRequirementService"; 



interface Props {
  selectedVersion: "version_1" | "version_2" | "C" | null;
  onChooseVersion: (v: "version_1" | "version_2" | "C" ) => void;
  onBack: () => void;
}

export default function JobVersions({  selectedVersion, onChooseVersion, onBack }: Props) {
  const { data, loading, error } = useSelector((state: RootState) => state.jobRequirement);
  const service = new JobRequirementService();
  const token = useAuthToken(); 
  const versions = data.generate_content.flatMap(gc => {
    const pr = gc.parsed_response;
    return [
      { key: "version_1" as const, data: pr.version_1.job_requirement, label: "A" },
      { key: "version_2" as const, data: pr.version_2.job_requirement, label: "B" },
    ];
  });


  const handleChooseVersion = async (version: "version_1" | "version_2" | "C") => {
    if (version === "C") {
      // Manual fill, langsung callback
      onChooseVersion("C");
      return;
    }

    try {
      console.log(data)
      console.log("token --> ", token)
      console.log("Calling API for version:", version);

      const res = await service.chooseJobVersion(data.id, version, token);
      console.log("API response:", res);

      onChooseVersion(version);
    } catch (error) {
      console.error("Error choosing version:", error);
    } 
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        ← Back to Prompt
      </button>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Generated Job Versions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {versions.map((v, idx) => (
            <JobVersionCard
              key={idx}
              version={v.label}
              title={`${v.data.desired_position || "Job Position"} - ${v.label}`}
              content={v.data.description || `🚀 Join ${v.data.company_name || "Company"}!\n\n${v.data.daily_tasks}`}
              onChoose={() => handleChooseVersion(v.key as "version_1" | "version_2")}
            />
          ))}
        </div>

        {/* OR Section */}
        <div className="mt-10 flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold text-gray-400">OR</div>
          <p className="text-center text-gray-600 max-w-md">
            Fill the job details manually without choosing any of the generated suggestions.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => handleChooseVersion("C")}
          >
            <Edit className="h-5 w-5" />
            Fill Manually
          </Button>
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
