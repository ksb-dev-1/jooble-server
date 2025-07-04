import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import Home from "@/app/page"; // or wherever your Home file is located
import { RouterMockProvider } from "../test-utils";

afterEach(() => {
  cleanup();
});

describe("Home Page", () => {
  it("renders the Heading component", () => {
    render(<Home />, { wrapper: RouterMockProvider });

    const mainHeading = screen.getByRole("heading", {
      name: /unlock your career potential/i,
    });

    expect(mainHeading).toBeInTheDocument();
  });

  it("renders all FeatureSection titles", () => {
    render(<Home />, { wrapper: RouterMockProvider });

    const features = [
      "Smart Filters",
      "Advanced Search",
      "Bookmark Jobs",
      "Upload Resume",
      "Easy Apply",
      "Flexible Job Modes",
    ];

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it("renders all FAQ questions", () => {
    render(<Home />, { wrapper: RouterMockProvider });

    const questions = [
      "What is the purpose of this portal?",
      "How can I create an account?",
      "Is there a fee to use the portal?",
      "Can I save my favorite jobs?",
      "Can I apply for multiple jobs?",
    ];

    questions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });
});
