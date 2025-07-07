import { Job, ApplicationStatus } from "@prisma/client";

type JobWithSavedStatusAndApplicationStatus = Job & {
  isSaved: boolean;
  applicationStatus: ApplicationStatus | null;
};

type Jobs = {
  jobs: JobWithSavedStatusAndApplicationStatus[];
};

type JobsWithTotalPages = {
  jobs: JobWithSavedStatusAndApplicationStatus[];
  totalPages: number;
};

type JobFilterValues = {
  page: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  search?: string;
};

type DeleteAccountResponse =
  | { success: true; message: string }
  | { success: false; error: string };

type CheckIsResumeUploadedResponse = {
  success: boolean;
  status: number;
  message: string;
  data: { url: string | undefined } | null;
};

type ApplyForJobResponse = {
  success: boolean;
  status: number;
  message: string;
  data: { isApplied: boolean } | null;
};

type ToggleSaveJobResponse =
  | { success: true; message: string }
  | { success: false; error: string };

type UploadResumeResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    url?: string;
  } | null;
};
