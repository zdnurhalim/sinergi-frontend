import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface CompanyDetails {
  companyName: string;
  industry: string;
  companySize: string;
  otherInformation: string;
}

interface JobDetails {
  position: string;
  dailyTasks: string;
  salaryRange: string;
  specificDetails: string;
}

interface JobAdPreferences {
  includeCompanyName: boolean;
  includeSalaryRange: boolean;
  includeAgeLimitation: boolean;
  includeGenderPreference: boolean;
}

interface MultiStepJobFormProps {
  onComplete: (data: {
    company: CompanyDetails;
    job: JobDetails;
    preferences: JobAdPreferences;
  }) => void;
}

export const MultiStepJobForm: React.FC<MultiStepJobFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    industry: '',
    companySize: '',
    otherInformation: ''
  });

  const [jobDetails, setJobDetails] = useState<JobDetails>({
    position: '',
    dailyTasks: '',
    salaryRange: '',
    specificDetails: ''
  });

  const [jobAdPreferences, setJobAdPreferences] = useState<JobAdPreferences>({
    includeCompanyName: true,
    includeSalaryRange: false,
    includeAgeLimitation: false,
    includeGenderPreference: false
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Marketing & Advertising', 'Real Estate',
    'Transportation', 'Food & Beverage', 'Entertainment', 'Non-profit',
    'Government', 'Other'
  ];

  const companySizes = [
    { value: 'small', label: 'Small (1-50 employees)' },
    { value: 'middle', label: 'Middle (51-200 employees)' },
    { value: 'enterprise', label: 'Enterprise (200+ employees)' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProceed = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete({
        company: companyDetails,
        job: jobDetails,
        preferences: jobAdPreferences
      });
    }, 3000);
  };

  const updateCompanyDetails = (field: keyof CompanyDetails, value: string) => {
    setCompanyDetails(prev => ({ ...prev, [field]: value }));
  };

  const updateJobDetails = (field: keyof JobDetails, value: string) => {
    setJobDetails(prev => ({ ...prev, [field]: value }));
  };

  const updateJobAdPreferences = (field: keyof JobAdPreferences, value: boolean) => {
    setJobAdPreferences(prev => ({ ...prev, [field]: value }));
  };

  if (isProcessing) {
    return (
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
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Step {currentStep} of 4</span>
          <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Company Description */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Company Description</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={companyDetails.companyName}
                onChange={(e) => updateCompanyDetails('companyName', e.target.value)}
                placeholder="Enter your company name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <Select value={companyDetails.industry} onValueChange={(value) => updateCompanyDetails('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <Select value={companyDetails.companySize} onValueChange={(value) => updateCompanyDetails('companySize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your company size" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                  {companySizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Information</label>
              <textarea
                value={companyDetails.otherInformation}
                onChange={(e) => updateCompanyDetails('otherInformation', e.target.value)}
                placeholder="Company culture, mission, values, benefits..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Job Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desired Position</label>
              <input
                type="text"
                value={jobDetails.position}
                onChange={(e) => updateJobDetails('position', e.target.value)}
                placeholder="e.g. Senior Software Developer, Marketing Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              <input
                type="text"
                value={jobDetails.salaryRange}
                onChange={(e) => updateJobDetails('salaryRange', e.target.value)}
                placeholder="e.g. IDR 8,000,000 - 12,000,000/month"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

      {/* Step 3: Job Ad Preferences */}
      {currentStep === 3 && (
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

      {/* Step 4: Review and Proceed */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Review & Proceed</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Company Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-medium">Company:</span> {companyDetails.companyName}</p>
                <p><span className="font-medium">Industry:</span> {companyDetails.industry}</p>
                <p><span className="font-medium">Size:</span> {companySizes.find(s => s.value === companyDetails.companySize)?.label}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Job Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-medium">Position:</span> {jobDetails.position}</p>
                <p><span className="font-medium">Salary:</span> {jobDetails.salaryRange}</p>
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

        {currentStep < 4 ? (
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
            onClick={handleProceed}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            Generate Job Ad
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};