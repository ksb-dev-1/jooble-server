import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer"; // Adjust path as needed

describe("Footer", () => {
  it("renders copyright text with current year", () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);
    const copyright = screen.getByLabelText(/copyright/i); // Matches aria-label="Copyright"

    expect(
      copyright.textContent?.includes(`© ${currentYear} Jooble`)
    ).toBeTruthy();
  });

  it("renders email link with correct href", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", {
      name: /email kedar babaleshwar/i,
    });

    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:babaleshwarkedar@gmail.com"
    );
  });

  it("renders GitHub icon link with correct href", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", {
      name: /visit github profile/i,
    });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/ksb-dev-1");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders separator pipe (|)", () => {
    render(<Footer />);
    expect(screen.getByText("|")).toBeInTheDocument();
  });
});
