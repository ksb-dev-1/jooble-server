import { render, screen } from "@testing-library/react";
import Container from "@/components/shared/Container"; // adjust path if needed

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies correct layout classes", () => {
    const { container } = render(
      <Container>
        <p>Layout check</p>
      </Container>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      "min-h-[calc(100vh-56px)]",
      "pt-32",
      "pb-16",
      "max-w-5xl",
      "w-full",
      "px-4",
      "mx-auto"
    );
  });
});
