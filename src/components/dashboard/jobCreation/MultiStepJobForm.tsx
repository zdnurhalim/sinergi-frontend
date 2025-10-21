import React, { useState, useEffect, useMemo} from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useSelector } from "react-redux";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useLocation, useParams } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { ReusableAlert } from '@/components/reusable/AlertDialog';
import { CompanyDetails, JobDetails, JobAdPreferences, MultiStepJobFormProps } from "@/types/job";
import { RootState } from "@/store/store";
import { JobAdPreferencesPayload, JobRequirementService } from "@/services/JobRequirementService"; 
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@/components/reusable/Datepicker";
import { useDispatch } from 'react-redux';
import { resetJobAds } from '@/store/JobAdsSlice';

export const MultiStepJobForm: React.FC<MultiStepJobFormProps> = ({ onComplete }) => {
  
  const token = useAuthToken(); 
  const location = useLocation();
  const { jobId } = useParams();
  const jobRequirement = useSelector( (state: RootState) => state.jobAdDetail.data);
  const jobRequirementId = jobRequirement?.id || null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const getJobId = useMemo<number | null>(() => {
    const isEditPage = location.pathname.includes('/edit');
    if (isEditPage && jobId) {
      const parsed = Number(jobId);
      return Number.isNaN(parsed) ? null : parsed;
    }
    return jobRequirement?.id ?? null;
  }, [location.pathname, jobId, jobRequirement]);

  const WORK_ARRANGEMENT_OPTIONS = [
    { value: 'Remote', label: 'Remote' },
    { value: 'On-site', label: 'On-site' },
    { value: 'Hybrid', label: 'Hybrid' },
  ];

  const mapServerPrefsToState = (data): JobAdPreferences => {
    return {
      includeCompanyName: !!(data?.include_company_name ?? false),
      includeSalaryRange: !!(data?.include_salary_range ?? false),
      includeAgeLimitation: !!(data?.include_age_limitation ?? false),
      includeGenderPreference: !!(data?.include_gender_preference ?? false),
    };
  };

  useEffect(() => {
    const fetchJobData = async () => {
      const jobId = getJobId;
      if (!jobId) return;
      if (!token) return;

      const service = new JobRequirementService();

      try {
        const res = await service.getJobAdById(jobId, token);
        const jobData = res?.data?.job_requirement ?? res?.data ?? null;

        if (jobData) {
          setJobDetails({
            position: jobData.position || '',
            dailyTasks: jobData.daily_tasks || '',
            salaryMin: jobData.salary_min || 0,
            salaryMax: jobData.salary_max || 0,
            ageMax: jobData.age_limitation ? parseInt(jobData.age_limitation) : 0,
            gender: jobData.gender_preference || '',
            vacancyDeadline: jobData.vacancy_deadline
              ? new Date(jobData.vacancy_deadline).toISOString().split('T')[0]
              : '',
            specificDetails: Array.isArray(jobData.specific_details)
              ? jobData.specific_details.join(", ")
              : jobData.specific_details || '',
            workArrangement: jobData.work_arrangement || '',
            minimumExperience: jobData.minimum_experience ? parseInt(jobData.minimum_experience) : 0,
            benefits: Array.isArray(jobData.benefits) ? jobData.benefits : (jobData.benefits ? [jobData.benefits] : [''])
          });

          setCompanyDetails({
            companyName: jobData.company_description || '',
            industry: jobData.industry || '',
            companySize: jobData.company_size || '',
            otherInformation: jobData.talent_description || ''
          });
        }

        try {
          const prefsRes = await service.getJobAdPreferences(getJobId, token);
          const prefsData = prefsRes?.data ?? prefsRes ?? null;

          const preferenceObj = prefsData?.data ?? prefsData; 
          if (preferenceObj && (preferenceObj.include_company_name !== undefined ||
              preferenceObj.includeCompanyName !== undefined)) {
            setJobAdPreferences(mapServerPrefsToState(preferenceObj));
          } 
        } catch (prefsErr) {
          console.warn("Failed to fetch job ad preferences:", prefsErr);
        }

      } catch (err) {
        console.error("Failed to fetch job ad by id", err);
      }
    };

    fetchJobData();
  }, [jobRequirementId, token]);

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
    specificDetails: '',
    workArrangement : '',
    minimumExperience: 0,
    benefits: [''],
  });

  const [jobAdPreferences, setJobAdPreferences] = useState<JobAdPreferences>({
    includeCompanyName: true,
    includeSalaryRange: false,
    includeAgeLimitation: false,
    includeGenderPreference: false
  });

  const genderArray = jobDetails.gender ? jobDetails.gender.split(",") : [];

  const handleGenderChange = (gender: string, checked: boolean) => {
    let newGender = [...genderArray];
    if (checked) {
      if (!newGender.includes(gender)) newGender.push(gender);
    } else {
      newGender = newGender.filter((g) => g !== gender);
    }
    updateJobDetails("gender", newGender.join(","));
  };

  // VALIDATION FUNCTION
  const validateStep = (stepToValidate: number): boolean => {
    const errors: Record<string,string> = {};

    if (stepToValidate === 1) {
      if (!jobDetails.position || jobDetails.position.trim().length === 0) {
        errors.position = "Position is required.";
      }

      if (!jobDetails.dailyTasks || jobDetails.dailyTasks.trim().length === 0) {
        errors.dailyTasks = "Daily tasks / responsibilities are required.";
      }

    
      const min = Number(jobDetails.salaryMin);
      const max = Number(jobDetails.salaryMax);
      const minEmpty = jobDetails.salaryMin === '' || jobDetails.salaryMin === null || isNaN(min);
      const maxEmpty = jobDetails.salaryMax === '' || jobDetails.salaryMax === null || isNaN(max);

      if (!minEmpty && min < 0) errors.salaryMin = "Min salary cannot be negative.";
      if (!maxEmpty && max < 0) errors.salaryMax = "Max salary cannot be negative.";
      if (!minEmpty && !maxEmpty && !isNaN(min) && !isNaN(max) && min > max) {
        errors.salaryRange = "Minimum salary cannot be greater than maximum salary.";
      }

      // Age validation
      const age = Number(jobDetails.ageMax);
      if (jobDetails.ageMax !== '' && !isNaN(age) && age < 0) {
        errors.ageMax = "Age must be 0 or greater.";
      }

      // Minimum experience
      const exp = Number(jobDetails.minimumExperience);
      if (jobDetails.minimumExperience !== '' && !isNaN(exp) && exp < 0) {
        errors.minimumExperience = "Experience must be 0 or greater.";
      }

      // Benefits: optional but if provided ensure at least one non-empty
      const nonEmptyBenefits = (jobDetails.benefits ?? []).filter(b => b && b.trim().length > 0);
      if ((jobDetails.benefits ?? []).length > 0 && nonEmptyBenefits.length === 0) {
        errors.benefits = "Please provide at least one benefit or remove empty rows.";
      }

      // Vacancy deadline: optional, but if provided ensure valid date
      if (jobDetails.vacancyDeadline) {
        const d = new Date(jobDetails.vacancyDeadline);
        if (isNaN(d.getTime())) {
          errors.vacancyDeadline = "Invalid date format.";
        }
      }
    }

    if (stepToValidate === 2) {
      const anyPref = jobAdPreferences.includeCompanyName || jobAdPreferences.includeSalaryRange || jobAdPreferences.includeAgeLimitation || jobAdPreferences.includeGenderPreference;
      if (!anyPref) {
        errors.preferences = "Please select at least one option to include in the job ad.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    const ok = validateStep(currentStep);
    if (!ok) {
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setFieldErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFieldErrors({});
    }
  };

   const handleSetDraft = async  () => {
    console.log("Set Draft", jobDetails);
    await saveAndRedirect("/dashboard/jobs", "draft");
  };

  const buildPreferencesPayload = () => ({
    job_ad_id: getJobId ,
    include_company_name: !!jobAdPreferences.includeCompanyName,
    include_salary_range: !!jobAdPreferences.includeSalaryRange,
    include_age_limitation: !!jobAdPreferences.includeAgeLimitation,
    include_gender_preference: !!jobAdPreferences.includeGenderPreference,
  });

  const buildJobAdPayload = (status : string ) => ({
    company_description: companyDetails.companyName,
    talent_description: companyDetails.otherInformation,
    specific_details: jobDetails.specificDetails
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    salary_min: String(jobDetails.salaryMin ?? ''),
    salary_max: String(jobDetails.salaryMax ?? ''),
    daily_tasks: jobDetails.dailyTasks ?? '',
    age_limitation: String(jobDetails.ageMax ?? ''),
    gender_preference: jobDetails.gender ?? '',
    desired_position: jobDetails.position ?? '',
    company_size: companyDetails.companySize ?? '',
    industry: companyDetails.industry ?? '',
    other_information: companyDetails.otherInformation ?? '',
    vacancy_deadline: jobDetails.vacancyDeadline ?? '',
    work_arrangement: jobDetails.workArrangement ?? '',
    minimum_experience: String(jobDetails.minimumExperience ?? ''),
    status : status,
    benefits: (jobDetails.benefits ?? [])
      .map((b) => b.trim())
      .filter((b) => b.length > 0),
  });

  
  const saveAndRedirect = async (redirectPathOnSuccess: string, status : string) => {
    const jobId = getJobId;
    if (!token ) return;
    setLoading(true);
    setError(null);

    const service = new JobRequirementService();
    const jobPayload = buildJobAdPayload(status);
    const prefsPayload = buildPreferencesPayload();

    try {

      const updateResult = await saveJobAd(service, jobId, jobPayload, token);
      console.log("Update sukses:", updateResult);

      const prefsResult = await saveJobAdPreferences(service, prefsPayload, token);
      console.log("Preferences saved:", prefsResult);


      if (onComplete) {
        try {
          onComplete({
            company: companyDetails,
            job: jobDetails,
            preferences: jobAdPreferences
          });
        } catch (cbErr) {
          console.warn("onComplete callback error:", cbErr);
        }
      }

      try {
        dispatch(resetJobAds());
      } catch (err) {
        console.warn("Failed to dispatch resetJobRequirement:", err);
      }

      navigate(redirectPathOnSuccess);
    } catch (err) {
      console.error("Save & redirect error:", err);
      const message = (err)?.message || ((err )?.detail ?? "Update gagal");
      setError(message);
    } finally {
      setLoading(false);
    }
  };


  const handlePublishNow = async () => {
    await saveAndRedirect("/dashboard/jobs", "published");
  };

  const saveJobAd = async (service: JobRequirementService, id: number, payload, token: string) => {
    return service.updateJobAd(id, payload, token);
  };

  const saveJobAdPreferences = async (service: JobRequirementService, payload: JobAdPreferencesPayload, token: string) => {
    return service.updateJobAdPreferences(payload, token);
  };


  const handleProceed = () => {
    setAlertOpen(true);
  };

  const updateJobDetails = (field: keyof JobDetails, value) => {
    if (['salaryMin','salaryMax','ageMax','minimumExperience'].includes(field as string)) {

      const val = value === '' ? '' : Number(value);
      setJobDetails(prev => ({ ...prev, [field]: val }));
    } else {
      setJobDetails(prev => ({ ...prev, [field]: value }));
    }
  };

  const updateJobAdPreferences = (field: keyof JobAdPreferences, value: boolean) => {
    setJobAdPreferences(prev => ({ ...prev, [field]: value }));
  };

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
                {fieldErrors.position && <p className="text-red-600 text-sm mt-1">{fieldErrors.position}</p>}
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
                {fieldErrors.vacancyDeadline && <p className="text-red-600 text-sm mt-1">{fieldErrors.vacancyDeadline}</p>}
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
              {fieldErrors.dailyTasks && <p className="text-red-600 text-sm mt-1">{fieldErrors.dailyTasks}</p>}
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
              {fieldErrors.salaryMin && <p className="text-red-600 text-sm mt-1">{fieldErrors.salaryMin}</p>}
              {fieldErrors.salaryMax && <p className="text-red-600 text-sm mt-1">{fieldErrors.salaryMax}</p>}
              {fieldErrors.salaryRange && <p className="text-red-600 text-sm mt-1">{fieldErrors.salaryRange}</p>}
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
                {fieldErrors.ageMax && <p className="text-red-600 text-sm mt-1">{fieldErrors.ageMax}</p>}
              </div>
            </div>
          
            <div className="flex gap-4">
                {/* Work Arrangement */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Arrangement
                </label>
                <Select
                  value={jobDetails.workArrangement}
                  onValueChange={(val) => updateJobDetails("workArrangement", val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select arrangement" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_ARRANGEMENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Experience (Years)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={jobDetails.minimumExperience || ""}
                    onChange={(e) => updateJobDetails("minimumExperience", e.target.value)}
                    placeholder="Years of Experience"
                    min="0"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {fieldErrors.minimumExperience && <p className="text-red-600 text-sm mt-1">{fieldErrors.minimumExperience}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Benefits (Array Input) */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits
                </label>

                {jobDetails.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...jobDetails.benefits];
                        newBenefits[index] = e.target.value;
                        setJobDetails((prev) => ({ ...prev, benefits: newBenefits }));
                      }}
                      placeholder="e.g. BPJS Kesehatan, Bonus Tahunan"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newBenefits = jobDetails.benefits.filter((_, i) => i !== index);
                        setJobDetails((prev) => ({ ...prev, benefits: newBenefits }));
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setJobDetails((prev) => ({
                      ...prev,
                      benefits: [...prev.benefits, ''],
                    }))
                  }
                  className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                >
                  + Tambah Benefit
                </button>
                {fieldErrors.benefits && <p className="text-red-600 text-sm mt-1">{fieldErrors.benefits}</p>}
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

            {fieldErrors.preferences && <p className="text-red-600 text-sm mt-1">{fieldErrors.preferences}</p>}
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
            onClick={() => handleProceed()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
              Generate Job Ad
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
