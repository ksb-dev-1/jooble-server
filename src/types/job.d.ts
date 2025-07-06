import { ApplicationStatus } from "@prisma/client";

interface Job {
  id: string;
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

type JobWithSavedStatusAndApplicationStatus = Job & {
  isSaved: boolean;
  applicationStatus: ApplicationStatus | null;
};

type JobsWithTotalPages = {
  jobs: JobWithSavedStatusAndApplicationStatus[];
  totalPages: number;
};

// type JobWithSavedStatus = Job & { isSaved: boolean };

// type JobWithSavedStatusAndTotalPages = Job & {
//   isSaved: boolean;
//   totalPages: number;
// };

interface JobFilterValues {
  page: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  search?: string;
}
