import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import FeatureSection from "@/components/home/FeatureSection";

afterEach(() => {
  cleanup();
});

describe("FeatureSection component", () => {
  it("renders the features heading", () => {
    render(<FeatureSection />);
    const heading = screen.getByRole("heading", { name: /features/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders all 6 feature articles", () => {
    render(<FeatureSection />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(6);
  });

  it("renders correct titles and descriptions for each feature", () => {
    render(<FeatureSection />);

    expect(screen.getByText(/Smart Filters/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Filter jobs by location, type, and mode/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Advanced Search/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Search by company, skills, or designation/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Bookmark Jobs/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save jobs to view and apply later/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Upload Resume/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Attach your resume to stand out/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Easy Apply/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Apply directly with one click/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Flexible Job Modes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Explore remote, hybrid, or onsite roles/i)
    ).toBeInTheDocument();
  });
});
