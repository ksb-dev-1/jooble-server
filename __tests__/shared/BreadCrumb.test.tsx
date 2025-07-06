import { render, screen } from "@testing-library/react";
import Breadcrumb from "@/components/shared/BreadCrumb"; // adjust the path if needed

describe("Breadcrumb", () => {
  it("renders all breadcrumb items", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/jobs" },
      { label: "saved" },
    ];

    render(<Breadcrumb items={items} />);

    // Assert links
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Jobs" })).toBeInTheDocument();

    // Assert current page
    const current = screen.getByText("saved");
    expect(current).toBeInTheDocument();
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders correct number of separators (SVGs)", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/jobs" },
      { label: "Fullstack Developer" },
    ];

    const { container } = render(<Breadcrumb items={items} />);

    // This will grab all <svg> elements inside the rendered output
    const svgSeparators = container.querySelectorAll("svg");

    expect(svgSeparators.length).toBe(items.length - 1);
  });

  it("applies custom className", () => {
    const className = "custom-breadcrumb";
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }]}
        className={className}
      />
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveClass(className);
  });
});
