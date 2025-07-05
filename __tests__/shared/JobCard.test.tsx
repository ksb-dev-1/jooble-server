/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import JobCard from "@/components/shared/JobCard";
import { describe, it, expect, vi } from "vitest";

// Mock dependencies
vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/shared/ToggleSaveButton", () => ({
  default: () => <button>Mock Save Button</button>,
}));

vi.mock("@/actions/toggle-save-job-server-action", () => ({
  toggleSaveJobServerAction: vi.fn(),
}));

vi.mock("@/utils", () => ({
  formatMoney: (value: number) => `₹${value.toLocaleString()}`,
  relativeDate: () => "2 days ago",
}));

import { ApplicationStatus } from "@prisma/client";

const mockJob = {
  id: "stripe-job-1",
  companyLogo: "",
  companyName: "Stripe",
  experience: "1-3",
  role: "Full-Stack Developer",
  jobType: "Full-Time",
  location: "Mysore",
  jobMode: "Flexible",
  salary: 1500000,
  skills: ["react.js", "typescript", "postgresql", "node.js", "jwt"],
  openings: 2,
  description: `
  ## About Stripe
  Stripe is a global technology company that builds economic infrastructure for the internet. We are looking for a Full-Stack Developer with experience in React.js, TypeScript, Node.js, PostgreSQL, and JWT to help develop and maintain our financial technology solutions.
  
  ## Key Responsibilities
  - Develop, test, and deploy scalable full-stack applications.
  - Collaborate with cross-functional teams to define new features.
  - Optimize applications for speed and performance.
  - Ensure application security and data protection.
  - Conduct code reviews and mentor junior developers.
  
  ## Qualifications
  - 1-3 years of experience in full-stack development.
  - Strong proficiency in React.js, TypeScript, Node.js, and PostgreSQL.
  - Understanding of authentication mechanisms like JWT.
  - Experience with cloud technologies is a plus.
  - Strong problem-solving and debugging skills.
    `,
  applicationStatus: null, // or "PENDING" | "INTERVIEW" etc.
  isSaved: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("JobCard", () => {
  it("renders job role and company name", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Stripe")).toBeInTheDocument();
  });

  it("renders formatted salary and experience", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("15,00,000")).toBeInTheDocument();
    expect(screen.getByText("1-3")).toBeInTheDocument();
  });

  it("renders location, jobType and jobMode", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("Mysore")).toBeInTheDocument();
    expect(screen.getByText("Full-Time")).toBeInTheDocument();
    expect(screen.getByText("Flexible")).toBeInTheDocument();
  });

  it("renders first 3 skills with separator", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("react.js")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("postgresql")).toBeInTheDocument();
  });

  it("renders openings and relative date", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("Openings: 2")).toBeInTheDocument();
    expect(screen.getByText("2 days ago")).toBeInTheDocument();
  });

  it("renders the save job form with hidden input", () => {
    const { container } = render(<JobCard job={mockJob} />);

    const input = container.querySelector(
      'input[name="jobId"]'
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe(mockJob.id); // e.g., "job-1"
  });

  it("renders application status badge if available", () => {
    render(
      <JobCard
        job={{
          ...mockJob,
          applicationStatus: ApplicationStatus.INTERVIEW,
        }}
      />
    );
    expect(screen.getByText("Interview")).toBeInTheDocument();
  });
});
