import { render, screen } from "@testing-library/react";

// components
import Footer from "@/components/Footer";

describe("Footer", () => {
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    render(<Footer />);
  });

  it("renders copyright text with current year", () => {
    const copyright = screen.getByLabelText(/copyright/i);
    expect(copyright).toHaveTextContent(
      `© ${currentYear} Jooble. All rights reserved.`
    );
  });

  it("renders email link with correct attributes", () => {
    const emailLink = screen.getByRole("link", {
      name: /email kedar babaleshwar/i,
    });

    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:babaleshwarkedar@gmail.com"
    );
    expect(emailLink).toHaveAttribute(
      "title",
      "Send email to kedar babaleshwar"
    );
    expect(emailLink).toHaveClass("underline");
  });

  it("renders GitHub icon link with correct attributes", () => {
    const githubLink = screen.getByRole("link", {
      name: /visit github profile/i,
    });

    expect(githubLink).toHaveAttribute("href", "https://github.com/ksb-dev-1");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink).toHaveAttribute("title", "GitHub - ksb-dev-1");
  });

  it("renders separator pipe with proper accessibility attributes", () => {
    const separator = screen.getByText("|");
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("has proper footer landmark role", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
