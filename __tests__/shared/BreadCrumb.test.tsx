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

  it("does not render separator for the last item", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/jobs" },
      { label: "Fullstack Developer" },
    ];

    render(<Breadcrumb items={items} />);

    // There should be two separators (one between 1st & 2nd, and 2nd & 3rd)
    const separators = screen.getAllByTestId("breadcrumb-separator");
    expect(separators).toHaveLength(items.length - 1);
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
