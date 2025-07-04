import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import Heading from "@/components/home/Heading";
import { RouterMockProvider } from "../test-utils";

afterEach(() => {
  cleanup();
});

describe("Heading component", () => {
  it("renders the main heading and subheading", () => {
    render(<Heading />, { wrapper: RouterMockProvider });

    expect(
      screen.getByRole("heading", { name: /unlock your career potential/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/discover jobs that inspire you/i)
    ).toBeInTheDocument();
  });

  it("has a link to the jobs page with correct aria-label", () => {
    render(<Heading />, { wrapper: RouterMockProvider });

    const link = screen.getByRole("link", {
      name: /start exploring job opportunities/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/jobs");
  });

  it("renders the description paragraph", () => {
    render(<Heading />, { wrapper: RouterMockProvider });

    const paragraphs = screen.getAllByText((content) =>
      content.includes(
        "A modern job discovery platform powered by intelligent filters"
      )
    );

    expect(paragraphs.length).toBeGreaterThan(0);
  });
});
