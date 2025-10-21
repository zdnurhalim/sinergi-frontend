// Type lama untuk JobsList
export interface JobMapping {
  id: number;
  title: string;
  company: string;
  description: string;
  status: string;
  applicants: number;
  createdAt: string;
  category: string;
}

export interface CompanyDetails {
  companyName: string;
  industry: string;
  companySize: string;
  otherInformation: string;
}

export interface JobDetails {
  position: string;
  dailyTasks: string;
  salaryMin: number | string;
  salaryMax: number  | string;
  ageMin?: number  | string;
  ageMax?: number  | string;
  gender: string; // 
  vacancyDeadline: string; 
  specificDetails: string;
  workArrangement?: string;
  minimumExperience?: number  | string;
  benefits?: string[]; 
}

export interface JobAdPreferences {
  includeCompanyName: boolean;
  includeSalaryRange: boolean;
  includeAgeLimitation: boolean;
  includeGenderPreference: boolean;
}

export interface MultiStepJobFormProps {
  onComplete: (data: {
    company: CompanyDetails;
    job: JobDetails;
    preferences: JobAdPreferences;
  }) => void;
}
