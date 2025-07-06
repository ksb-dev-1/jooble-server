// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { render, screen } from "@testing-library/react";
// import JobList from "@/components/jobs/JobList";
// import { fetchJobsServerAction } from "@/actions/fetch-jobs-server-action";
// import { vi } from "vitest";
// import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";
// import { ApplicationStatus } from "@prisma/client";

// // ✅ Mock all subcomponents and server action
// vi.mock("@/actions/fetch-jobs-server-action");
// vi.mock("@/components/shared/JobCard", () => ({
//   default: ({ job }: { job: JobWithSavedStatusAndApplicationStatus }) => (
//     <div data-testid="job-card">{job.companyName}</div>
//   ),
// }));
// vi.mock("@/components/jobs/ActiveFilters", () => ({
//   default: () => <div data-testid="active-filters" />,
// }));
// vi.mock("@/components/jobs/Pagination", () => ({
//   default: () => <div data-testid="pagination" />,
// }));

// describe("JobList", () => {
//   const mockUserId = "user-123";

//   const mockJobs: JobWithSavedStatusAndApplicationStatus[] = [
//     {
//       id: "job-1",
//       companyName: "Google",
//       experience: "2 years",
//       role: "Frontend Engineer",
//       jobType: "Full-time",
//       location: "Pune",
//       jobMode: "Remote",
//       salary: 1200000,
//       skills: ["React", "TypeScript"],
//       openings: 3,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isSaved: false,
//       applicationStatus: ApplicationStatus.PENDING, // ✅ correct
//     },
//     {
//       id: "job-2",
//       companyName: "Amazon",
//       experience: "3 years",
//       role: "Backend Engineer",
//       jobType: "Contract",
//       location: "Mumbai",
//       jobMode: "Onsite",
//       salary: 1000000,
//       skills: ["Node.js", "MongoDB"],
//       openings: 2,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isSaved: true,
//       applicationStatus: null, // ✅ allowed if nullable in your schema
//     },
//   ];

//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("renders no jobs message when no jobs found", async () => {
//     vi.mocked(fetchJobsServerAction).mockResolvedValueOnce({
//       jobs: [],
//       totalPages: 1,
//     });

//     render(
//       await JobList({
//         userId: mockUserId,
//         filterValues: {
//           search: "",
//           location: "",
//           jobType: "",
//           jobMode: "",
//           page: "1",
//         },
//       })
//     );

//     expect(
//       screen.getByRole("heading", { name: /no jobs found/i })
//     ).toBeInTheDocument();
//   });

//   it("renders job cards, filters, and pagination when jobs exist", async () => {
//     vi.mocked(fetchJobsServerAction).mockResolvedValueOnce({
//       jobs: mockJobs,
//       totalPages: 2,
//     });

//     render(
//       await JobList({
//         userId: mockUserId,
//         filterValues: {
//           search: "developer",
//           location: "pune,mumbai",
//           jobType: "full-time,contract",
//           jobMode: "remote,onsite",
//           page: "1",
//         },
//       })
//     );

//     expect(screen.getByTestId("active-filters")).toBeInTheDocument();
//     expect(screen.getByTestId("pagination")).toBeInTheDocument();
//     expect(screen.getByText("Google")).toBeInTheDocument();
//     expect(screen.getByText("Amazon")).toBeInTheDocument();
//   });

//   it("renders ServerError when fetchJobsServerAction returns null", async () => {
//     vi.mocked(fetchJobsServerAction).mockResolvedValueOnce(null); // ✅ Fix here

//     render(
//       await JobList({
//         userId: mockUserId,
//         filterValues: {
//           search: "",
//           location: "",
//           jobType: "",
//           jobMode: "",
//           page: "1",
//         },
//       })
//     );
//     vi.mocked(fetchJobsServerAction).mockResolvedValueOnce(null);
//   });
// });

/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import JobList from "@/components/jobs/JobList";
import { fetchJobsServerAction } from "@/actions/fetch-jobs-server-action";
import { vi } from "vitest";
import { ApplicationStatus } from "@prisma/client";
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

vi.mock("@/actions/fetch-jobs-server-action");
vi.mock("@/components/shared/JobCard", () => ({
  default: ({ job }: { job: JobWithSavedStatusAndApplicationStatus }) => (
    <div data-testid="job-card">{job.companyName}</div>
  ),
}));
vi.mock("@/components/jobs/ActiveFilters", () => ({
  default: () => <div data-testid="active-filters" />,
}));
vi.mock("@/components/jobs/Pagination", () => ({
  default: () => <div data-testid="pagination" />,
}));
vi.mock("@/components/errors/ServerError", () => ({
  default: () => <div>Something went wrong</div>,
}));

const mockUserId = "user-123";
const baseFilterValues = {
  search: "",
  location: "",
  jobType: "",
  jobMode: "",
  page: "1",
};

const mockJobs: JobWithSavedStatusAndApplicationStatus[] = [
  {
    id: "job-1",
    companyName: "Google",
    experience: "2 years",
    role: "Frontend Engineer",
    jobType: "Full-time",
    location: "Pune",
    jobMode: "Remote",
    salary: 1200000,
    skills: ["React", "TypeScript"],
    openings: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: null,
    isSaved: false,
    applicationStatus: ApplicationStatus.PENDING,
  },
  {
    id: "job-2",
    companyName: "Amazon",
    experience: "3 years",
    role: "Backend Engineer",
    jobType: "Contract",
    location: "Mumbai",
    jobMode: "Onsite",
    salary: 1000000,
    skills: ["Node.js", "MongoDB"],
    openings: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: null,
    isSaved: true,
    applicationStatus: ApplicationStatus.INTERVIEW,
  },
];

describe("JobList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders job cards, filters, and pagination when jobs exist", async () => {
    vi.mocked(fetchJobsServerAction).mockResolvedValueOnce({
      jobs: mockJobs,
      totalPages: 2,
    });

    render(
      await JobList({ userId: mockUserId, filterValues: baseFilterValues })
    );

    expect(screen.getByTestId("active-filters")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("Amazon")).toBeInTheDocument();
  });

  it("renders no jobs message when jobs array is empty", async () => {
    vi.mocked(fetchJobsServerAction).mockResolvedValueOnce({
      jobs: [],
      totalPages: 1,
    });

    render(
      await JobList({ userId: mockUserId, filterValues: baseFilterValues })
    );

    // expect(
    //   screen.getByRole("heading", { name: /no jobs found/i })
    // ).toBeInTheDocument();
    expect(screen.getByText("No jobs found!")).toHaveAttribute(
      "id",
      "no-jobs-heading"
    );
  });

  it("renders ServerError when fetchJobsServerAction throws", async () => {
    vi.mocked(fetchJobsServerAction).mockRejectedValueOnce(
      new Error("DB failed")
    );

    render(
      await JobList({ userId: mockUserId, filterValues: baseFilterValues })
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders ServerError when fetchJobsServerAction returns null", async () => {
    vi.mocked(fetchJobsServerAction).mockResolvedValueOnce(null as any);

    render(
      await JobList({ userId: mockUserId, filterValues: baseFilterValues })
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
