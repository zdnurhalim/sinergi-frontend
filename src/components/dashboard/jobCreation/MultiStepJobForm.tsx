import React, { useState, useEffect} from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { ReusableAlert } from '@/components/reusable/AlertDialog';
import { CompanyDetails, JobDetails, JobAdPreferences, MultiStepJobFormProps } from "@/types/job";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@/components/reusable/Datepicker";

export const MultiStepJobForm: React.FC<MultiStepJobFormProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    industry: '',
    companySize: '',
    otherInformation: ''
  });

  const [jobDetails, setJobDetails] = useState<JobDetails>({
    position: '',
    dailyTasks: '',
    salaryMin: 0,
    salaryMax: 0,
    ageMax: 0,
    gender: '',
    vacancyDeadline: '',
    specificDetails: ''
  });

  const [jobAdPreferences, setJobAdPreferences] = useState<JobAdPreferences>({
    includeCompanyName: true,
    includeSalaryRange: false,
    includeAgeLimitation: false,
    includeGenderPreference: false
  });

  // konversi gender string ke array untuk checkbox
  const genderArray = jobDetails.gender ? jobDetails.gender.split(",") : [];

  const handleGenderChange = (gender: string, checked: boolean) => {
    let newGender = [...genderArray];
    if (checked) {
      if (!newGender.includes(gender)) newGender.push(gender);
    } else {
      newGender = newGender.filter((g) => g !== gender);
    }
    updateJobDetails("gender", newGender.join(",")); // simpan sebagai string
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

   const handleSetDraft = () => {
    console.log("Set Draft", jobDetails);
    // redirect ke PricingPage
    navigate("/dashboard/pricing");
  };

  const handlePublishNow = () => {
    console.log("Publish Now", jobDetails);
    // redirect ke PricingPage
    navigate("/dashboard/pricing");
  };


  // const handleProceed = () => setAlertOpen(true);
  const handleProceed = (jobId?: string) => {
    const payload = {
      company: companyDetails,
      job: jobDetails,
      preferences: jobAdPreferences,
      jobId, // kirim jobId jika ada
    };

    if (jobId) {
      console.log("Update Job:", payload);
      // panggil API update
    } else {
      console.log("Generate Job Ad:", payload);
      setAlertOpen(true);
      // panggil API create
    }
  };

  const updateJobDetails = (field: keyof JobDetails, value: string) => {
    setJobDetails(prev => ({ ...prev, [field]: value }));
  };

  const updateJobAdPreferences = (field: keyof JobAdPreferences, value: boolean) => {
    setJobAdPreferences(prev => ({ ...prev, [field]: value }));
  };

  // di dalam component
  const { jobId } = useParams<{ jobId: string }>();

  // bisa pakai jobId untuk fetch data awal
  useEffect(() => {
    if (jobId) {
      // fetch job data by id
      // misal:
      // fetchJobById(jobId).then(data => {
      //   setCompanyDetails(data.company);
      //   setJobDetails(data.job);
      //   setJobAdPreferences(data.preferences);
      // });
    }
  }, [jobId]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Step {currentStep} of 3</span>
          <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Job Details */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              {/* Desired Position */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Position
                </label>
                <input
                  type="text"
                  value={jobDetails.position}
                  onChange={(e) => updateJobDetails('position', e.target.value)}
                  placeholder="e.g. Senior Software Developer, Marketing Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Vacancy Deadline */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vacancy Deadline
                </label>
                <DatePicker
                  value={jobDetails.vacancyDeadline ? new Date(jobDetails.vacancyDeadline) : undefined}
                  onChange={(date) => 
                    updateJobDetails(
                      'vacancyDeadline', 
                      date ? date.toISOString().split("T")[0] : ""
                    )
                  }
                  placeholder="Select deadline"
                  className="w-full"
                />

              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Tasks</label>
              <textarea
                value={jobDetails.dailyTasks}
                onChange={(e) => updateJobDetails('dailyTasks', e.target.value)}
                placeholder="Describe the main responsibilities and daily activities..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={jobDetails.salaryMin}
                  onChange={(e) => updateJobDetails('salaryMin', e.target.value)}
                  placeholder="Min Salary"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={jobDetails.salaryMax}
                  onChange={(e) => updateJobDetails('salaryMax', e.target.value)}
                  placeholder="Max Salary"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            
           <div className="flex gap-4">
              {/* Gender */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={genderArray.includes("Male")}
                      onCheckedChange={(checked) => handleGenderChange("Male", !!checked)}
                    />
                    <span>Male</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={genderArray.includes("Female")}
                      onCheckedChange={(checked) => handleGenderChange("Female", !!checked)}
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* Age Limitation */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Limitation</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={jobDetails.ageMax || ""}
                    onChange={(e) => updateJobDetails("ageMax", e.target.value)}
                    placeholder="Max Age"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specific Details</label>
              <textarea
                value={jobDetails.specificDetails}
                onChange={(e) => updateJobDetails('specificDetails', e.target.value)}
                placeholder="Required skills, experience level, qualifications, work arrangement..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Job Ad Preferences */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">What to Include in Job Ad</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="companyName"
                checked={jobAdPreferences.includeCompanyName}
                onCheckedChange={(checked) => updateJobAdPreferences('includeCompanyName', !!checked)}
              />
              <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                Company Name
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="salaryRange"
                checked={jobAdPreferences.includeSalaryRange}
                onCheckedChange={(checked) => updateJobAdPreferences('includeSalaryRange', !!checked)}
              />
              <label htmlFor="salaryRange" className="text-sm font-medium text-gray-700">
                Salary Range
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ageLimitation"
                checked={jobAdPreferences.includeAgeLimitation}
                onCheckedChange={(checked) => updateJobAdPreferences('includeAgeLimitation', !!checked)}
              />
              <label htmlFor="ageLimitation" className="text-sm font-medium text-gray-700">
                Age Limitation
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="genderPreference"
                checked={jobAdPreferences.includeGenderPreference}
                onCheckedChange={(checked) => updateJobAdPreferences('includeGenderPreference', !!checked)}
              />
              <label htmlFor="genderPreference" className="text-sm font-medium text-gray-700">
                Gender Preference
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Preview of Selected Options:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {jobAdPreferences.includeCompanyName && <li>• Company name will be displayed</li>}
              {jobAdPreferences.includeSalaryRange && <li>• Salary range will be shown</li>}
              {jobAdPreferences.includeAgeLimitation && <li>• Age requirements will be mentioned</li>}
              {jobAdPreferences.includeGenderPreference && <li>• Gender preference will be specified</li>}
            </ul>
          </div>
        </div>
      )}

      {/* Step : Review and Proceed */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Review & Proceed</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Company Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-medium">Company:</span> {companyDetails.companyName}</p>
                <p><span className="font-medium">Industry:</span> {companyDetails.industry}</p>
                <p><span className="font-medium">Size:</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Job Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-medium">Position:</span> {jobDetails.position}</p>
                <p><span className="font-medium">Salary Min:</span> {jobDetails.salaryMin}</p>
                <p><span className="font-medium">Salary Max:</span> {jobDetails.salaryMax}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              Ready to generate your job ad! Our AI will create two optimized versions based on your requirements.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => handleProceed(jobId)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {jobId ? "Update Jobs" : "Generate Job Ad"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ReusableAlert
        title="Confirm Job Ad"
        description="Are you sure you want to proceed with this job ad?"
        open={alertOpen}
        onOpenChange={setAlertOpen}
        confirmText="Set Draft"
        confirmText2="Publish Now"
         onConfirm={handleSetDraft}
        onConfirm2={handlePublishNow}
        cancelText="Cancel"
      />
    </div>
  );
};