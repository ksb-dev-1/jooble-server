import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Heading from "@/components/home/Heading";

describe("Heading Component", () => {
  it("renders without crashing", () => {
    render(<Heading />);
  });

  it("contains the main heading text", () => {
    render(<Heading />);
    expect(
      screen.getByRole("heading", { name: /unlock your career potential/i })
    ).toBeInTheDocument();
  });

  it("contains the subheading text", () => {
    render(<Heading />);
    expect(
      screen.getByText(/discover jobs that inspire you/i)
    ).toBeInTheDocument();
  });

  it("has a working explore button with correct link", () => {
    render(<Heading />);
    const exploreButton = screen.getByRole("link", {
      name: /start exploring job opportunities/i,
    });
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton).toHaveAttribute("href", "/jobs");
    expect(exploreButton).toHaveTextContent(/start exploring/i);
  });

  it("contains the description text", () => {
    render(<Heading />);
    expect(
      screen.getByText(
        /A modern job discovery platform powered by intelligent filters/i
      )
    ).toBeInTheDocument();
  });

  it("has proper ARIA attributes", () => {
    render(<Heading />);
    const region = screen.getByRole("region");
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-labelledby", "hero-heading");
    expect(screen.getByText(/unlock your career potential/i)).toHaveAttribute(
      "id",
      "hero-heading"
    );
  });

  it("has the decorative underline", () => {
    render(<Heading />);
    const underline = screen.getByTestId("underline");
    expect(underline).toBeInTheDocument();
    expect(underline).toHaveClass("w-24");
    expect(underline).toHaveClass("h-1");
    expect(underline).toHaveClass("bg-primary");
  });
});
