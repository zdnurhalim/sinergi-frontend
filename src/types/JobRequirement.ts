export interface JobRequirement {
    benefits: string[];
    industry: string;
    salary_max: string;
    salary_min: string;
    daily_tasks: string;
    company_name: string;
    company_size: string;
    age_limitation: string;
    desired_position: string;
    specific_details: string[];
    work_arrangement: string;
    gender_preference: string;
    other_information: string;
    skills_requirement: string[];
    application_process: string;
    education_requirement: string;
    description: string;
    experience_requirement: string[];
    vacancy_deadline: string;
}

export interface GenerateContent {
    job_requirement_id: number;
    parsed_response: {
        version_1: {
            job_requirement: JobRequirement;
        };
        version_2: {
            job_requirement: JobRequirement;
        };
    };
    status: string;
}

export interface JobRequirementResponse {
    id: number;
    company_description: string;
    talent_description: string;
    specific_details: string[] | null;
    created_at: string;
    claim_token: string;
    updated_at: string;
    generate_content: GenerateContent[];
}

export interface JobAd {
  id: number;
  recruiter_id: number;
  job_requirement_id: number;
  status: string;
  step: string | null;
  generated_content: string | null;
  created_at: string;
  updated_at: string;
  job_requirement: JobRequirementDetail;
}

export interface JobRequirementDetail {
  id: number;
  recruiter_id: number;
  position: string;
  daily_tasks: string;
  salary_min: number;
  salary_max: number;
  specific_details: string[] | null;
  claim_token: string | null;
  guest_email: string | null;
  created_at: string;
  updated_at: string;
  company_description: string;
  talent_description: string;
  age_limitation: string;
  gender_preference: string;
  work_arrangement: string;
  benefits: string | null;
  skills_requirement: string[] | null;
  education_requirement: string;
  experience_requirement: string[];
  vacancy_deadline: string;
}