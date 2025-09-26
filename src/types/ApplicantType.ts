// src/data/applicants.ts

export interface ApplicantIterface {
  id: number;
  name: string;
  email: string;
  phone?: string;
  appliedAt: string;
  status: "applied" | "shortlisted" | "scheduled" | "hired" | "rejected";
  resume?: string;
  notes?: string;
  appliedPosition?: string;

  shortlistedAt?: string;
  scheduledAt?: string;
  hiredAt?: string;
  rejectedAt?: string;
}

export const applicants: ApplicantIterface[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+62 812-3456-7890",
    appliedAt: "2024-01-16",
    status: "shortlisted",
    resume: "https://example.com/resume.pdf",
    notes:
      "Sarah has 5+ years of experience in frontend development (React, TypeScript, Tailwind).",
    shortlistedAt: "2024-01-20 09:00 AM",
    scheduledAt: "",
    hiredAt: "",
    rejectedAt: "",
    appliedPosition: "Frontend Developer",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+62 812-5555-1111",
    appliedAt: "2024-01-17",
    status: "scheduled",
    resume: "https://example.com/resume-michael.pdf",
    notes: "Michael is a backend engineer experienced with Node.js and PostgreSQL.",
    shortlistedAt: "2024-01-20 10:00 AM",
    scheduledAt: "2024-01-20 11:00 AM",
    hiredAt: "",
    rejectedAt: "",
    appliedPosition: "Backend Developer",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@email.com",
    phone: "+62 812-7777-2222",
    appliedAt: "2024-01-18",
    status: "applied",
    resume: "https://example.com/resume-emma.pdf",
    notes: "Fresh graduate with strong interest in UI/UX design.",
    shortlistedAt: "",
    scheduledAt: "",
    hiredAt: "",
    rejectedAt: "",
    appliedPosition: "UI/UX Designer",
  },
  {
    id: 4,
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+62 812-8888-3333",
    appliedAt: "2024-01-18",
    status: "scheduled",
    resume: "https://example.com/resume-john.pdf",
    notes: "John has strong DevOps background (AWS, Docker, Kubernetes).",
    shortlistedAt: "2024-01-20 10:00 AM",
    scheduledAt: "2024-01-20 11:00 AM",
    hiredAt: "",
    rejectedAt: "",
    appliedPosition: "DevOps Engineer",
  },
  {
    id: 5,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    phone: "+62 812-9999-4444",
    appliedAt: "2024-01-19",
    status: "hired",
    resume: "https://example.com/resume-jane.pdf",
    notes:
      "Jane is a fullstack engineer who has worked with Laravel and Next.js.",
    shortlistedAt: "2024-01-20 10:00 AM",
    scheduledAt: "2024-01-20 11:00 AM",
    hiredAt: "2024-01-21 09:00 AM",
    rejectedAt: "",
    appliedPosition: "Fullstack Developer",
  },
];
