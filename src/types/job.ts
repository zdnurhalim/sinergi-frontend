export interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
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
  salaryMin: number;
  salaryMax: number;
  ageMin?: number;
  ageMax?: number;
  gender: string; // simpan sebagai string (comma-separated)
  vacancyDeadline: string; // simpan sebagai ISO date string
  specificDetails: string;
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
