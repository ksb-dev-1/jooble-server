import { ApplicationStatus } from "@prisma/client";

interface Job {
  id: string;
  companyLogo?: string | null;
  companyName: string;
  experience: string;
  role: string;
  jobType: string;
  location: string;
  jobMode: string;
  salary: number;
  skills: string[];
  openings: number;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type JobWithSavedStatus = Job & { isSaved: boolean };

type JobWithSavedStatusAndTotalPages = Job & {
  isSaved: boolean;
  totalPages: number;
};

type JobWithSavedStatusAndApplicationStatus = Job & {
  isSaved: boolean;
  applicationStatus: ApplicationStatus | null;
};

interface JobFilterValues {
  page: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  search?: string;
}
