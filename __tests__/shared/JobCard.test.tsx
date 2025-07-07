import { render, screen } from "@testing-library/react";
import JobCard from "@/components/shared/JobCard";
import { describe, it, expect, vi } from "vitest";

// ✅ Mock LinkWithProgress
vi.mock("next/link", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

// ✅ Mock ToggleSaveForm instead of ToggleSaveButton
vi.mock("@/components/shared/ToggleSaveForm", () => ({
  ToggleSaveForm: () => (
    <div data-testid="mock-toggle-form">Mock Toggle Form</div>
  ),
}));

// ✅ Mock utils
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
  description: "...",
  applicationStatus: null,
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

  it("renders salary, location, job type, and job mode", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("15,00,000")).toBeInTheDocument();
    expect(screen.getByText("Mysore")).toBeInTheDocument();
    expect(screen.getByText("Full-Time")).toBeInTheDocument();
    expect(screen.getByText("Flexible")).toBeInTheDocument();
  });

  it("renders first 3 skills", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("react.js")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("postgresql")).toBeInTheDocument();
  });

  it("renders application status badge if available", () => {
    render(
      <JobCard
        job={{ ...mockJob, applicationStatus: ApplicationStatus.INTERVIEW }}
      />
    );
    expect(screen.getByText("Interview")).toBeInTheDocument();
  });

  it("renders openings and relative date", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("Openings: 2")).toBeInTheDocument();
    expect(screen.getByText("2 days ago")).toBeInTheDocument();
  });

  it("renders the toggle save form", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByTestId("mock-toggle-form")).toBeInTheDocument();
  });
});
