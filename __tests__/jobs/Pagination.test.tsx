import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "@/components/jobs/Pagination";

// Create a mock for the `push` method
const mockPush = vi.fn();

// Mock useRouter and useSearchParams from Next.js App Router
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams("page=2"),
  };
});

describe("Pagination", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders pagination with Prev and Next buttons", () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jump to")).toBeInTheDocument();
  });

  it("disables Prev when on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).not.toBeDisabled();
  });

  it("calls router.push with correct page when Next is clicked", () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith("?page=3");
  });

  it("updates to specific page when form is submitted", () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    const input = screen.getByPlaceholderText("Jump to");
    fireEvent.change(input, { target: { value: "4" } });

    const goButton = screen.getByRole("button", { name: /jump to page 4/i }); // fixed here
    fireEvent.click(goButton);

    expect(mockPush).toHaveBeenCalledWith("?page=4");
  });

  it("updates page when form is submitted", () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    fireEvent.change(screen.getByPlaceholderText("Jump to"), {
      target: { value: "3" },
    });

    fireEvent.submit(screen.getByLabelText("Jump to specific page"));

    expect(mockPush).toHaveBeenCalledWith("?page=3");
  });
});
