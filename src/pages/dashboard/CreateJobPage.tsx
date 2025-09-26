"use client";

import React, { useState } from "react";
import { MultiStepJobForm } from "@/components/dashboard/jobCreation/MultiStepJobForm";
import JobVersions from "@/components/dashboard/jobCreation/JobVersions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/* -------------------- Stepper Component -------------------- */
function Stepper({ step }: { step: string }) {
  const steps = [
    { key: "choice", label: "Choose Method" },
    { key: "aiPrompt", label: "AI Prompt" },
    { key: "jobVersions", label: "Versions" },
    { key: "multiStep", label: "Final Form" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center justify-center gap-6 mb-10">
      {steps.map((s, i) => {
        // Jika step langsung multiStep dari awal
        const isDirectMultiStep = step === "multiStep";
        const isActive = isDirectMultiStep ? i === steps.length - 1 : i <= activeIndex;

        return (
          <div key={s.key} className="flex items-center">
            {/* Bullet */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold 
                ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {i + 1}
            </div>

            {/* Label */}
            <span
              className={`ml-2 text-sm ${
                isActive ? "text-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              {s.label}
            </span>

            {/* Line */}
            {i < steps.length - 1 && (
              <div
                className={`w-10 h-0.5 mx-3 ${
                  isDirectMultiStep
                    ? "bg-gray-300"
                    : i < activeIndex
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}


/* -------------------- Parent Page -------------------- */
export default function CreateJobPage() {
  const [step, setStep] = useState<"choice" | "aiPrompt" | "jobVersions" | "multiStep">("choice");
  const [jobFormData, setJobFormData] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<"A" | "B" | "C" | null>(null);
  const [aiFormData, setAiFormData] = useState<{ jobDescription?: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const handleComplete = (data: any) => {
    setJobFormData(data);
  };
   // Fungsi untuk Generate Versions dengan loader
  const handleGenerateVersions = () => {
  setIsProcessing(true); // loader muncul

  // Simulasi AI processing (3 detik)
  setTimeout(() => {
    setJobFormData({
      company: { companyName: "Your Company" },
      job: {
        position: "Generated Position",
        dailyTasks: aiFormData.jobDescription || "",
      },
    });

    setIsProcessing(false);  // selesai, loader hilang
    setStep("jobVersions");  // baru ganti step
  }, 1500);
};

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Indicator */}
      <Stepper step={step} />

      {/* -------------------- Step 0: Pilihan awal -------------------- */}
      {step === "choice" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card AI */}
          <Card
            onClick={() => setStep("aiPrompt")}
            className="cursor-pointer hover:shadow-xl transition"
          >
            <CardHeader>
              <CardTitle>Use AI Recruiter</CardTitle>
              <CardDescription>
                Let our AI craft job ads for you. Just give us 1 short descriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Faster and smarter job ad creation using Sinergi.AI recruiter module.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Try with AI</Button>
            </CardFooter>
          </Card>

          {/* Card Manual */}
          <Card
            onClick={() => setStep("multiStep")}
            className="cursor-pointer hover:shadow-xl transition"
          >
            <CardHeader>
              <CardTitle>Fill Manually</CardTitle>
              <CardDescription>Go through our guided multi-step form.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Step by step input for full control over your job advertisement.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Manual Form</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* -------------------- Step 1: AI Prompt Form -------------------- */}
      {step === "aiPrompt" && !isProcessing && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Let’s try our Sinergi.AI Recruiter Module</CardTitle>
            <CardDescription>
              Provide 1 short descriptions to generate job ads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Talent Description</label>
              <Textarea
                placeholder="Describe the talent you are looking for..."
                value={aiFormData.jobDescription || ""}
                onChange={(e) =>
                  setAiFormData((prev) => ({ ...prev, jobDescription: e.target.value }))
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("choice")}>Back</Button>
            <Button onClick={handleGenerateVersions}>Generate Versions</Button> {/* <-- Panggil loader */}
          </CardFooter>
        </Card>
      )}

      {/* Loader overlay */}
      {isProcessing && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Creating Your Job Ad</h2>
              <p className="text-gray-600">Our AI is analyzing your requirements and crafting the perfect job advertisement...</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      )}

      {/* JobVersions */}
      {step === "jobVersions" && jobFormData && (
        <JobVersions
          jobFormData={jobFormData}
          selectedVersion={selectedVersion}
          onChooseVersion={(v) => {
            setSelectedVersion(v);
            setStep("multiStep");
          }}
          onBack={() => setStep("aiPrompt")}
        />
      )}

      {/* -------------------- Step 3: MultiStep Form -------------------- */}
      {step === "multiStep" && (
        <div className="max-w-6xl mx-auto">
          <MultiStepJobForm onComplete={handleComplete} />
        </div>
      )}
    </div>
  );
}
