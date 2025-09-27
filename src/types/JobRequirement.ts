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
    experience_requirement: string[];
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
