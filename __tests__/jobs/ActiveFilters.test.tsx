import { render, screen, fireEvent } from "@testing-library/react";
import ActiveFilters from "@/components/jobs/ActiveFilters";
import { describe, it, vi, beforeEach, expect } from "vitest";

// ✅ Setup a manual pushMock first
const pushMock = vi.fn();

// ✅ Mock useRouter and useSearchParams correctly
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () =>
    new URLSearchParams({
      location: "pune",
      search: "developer",
      page: "2",
    }),
}));

describe("ActiveFilters", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders all filters: search, location, jobType, jobMode", () => {
    render(
      <ActiveFilters
        search="developer"
        location="pune,noida"
        jobType="full-time"
        jobMode="remote"
        matchedValues={{
          location: new Set(["pune"]),
          jobType: new Set(),
          jobMode: new Set(),
        }}
      />
    );

    expect(screen.getByText("developer")).toBeInTheDocument();
    expect(screen.getByText("Pune")).toBeInTheDocument();
    expect(screen.getByText("Noida")).toBeInTheDocument();
    expect(screen.getByText("Full-time")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
  });

  it("calls router.push when a filter is removed", () => {
    render(
      <ActiveFilters
        search="developer"
        location="pune"
        jobType=""
        jobMode=""
        matchedValues={{
          location: new Set(["pune"]),
          jobType: new Set(),
          jobMode: new Set(),
        }}
      />
    );

    // ✅ Find the "Pune" tag and its remove icon by role
    const filterTag = screen.getByText("Pune").parentElement!;
    const removeIcon = filterTag.querySelector("svg")!; // <IoCloseSharp />

    fireEvent.click(removeIcon);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining("?"));
  });

  it("shows unmatched filters with line-through class", () => {
    const unmatched = {
      location: new Set<string>(), // explicitly typed
      jobType: new Set<string>(["internship"]),
      jobMode: new Set<string>(["remote"]),
    };

    render(
      <ActiveFilters
        search=""
        location="delhi"
        jobType="internship"
        jobMode="remote"
        matchedValues={unmatched}
      />
    );

    const delhiTag = screen.getByText("Delhi");
    const internshipTag = screen.getByText("Internship");

    expect(delhiTag.className).toContain("line-through");
    expect(internshipTag.className).not.toContain("line-through");
  });

  it("renders 'Clear All' button when more than one filter is active", () => {
    render(
      <ActiveFilters
        search="dev"
        location="pune"
        jobType="full-time"
        jobMode=""
        matchedValues={{
          location: new Set(["pune", "banglore"]),
          jobType: new Set(["full-time"]),
          jobMode: new Set(),
        }}
      />
    );

    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("renders nothing when no filters are provided", () => {
    const { container } = render(
      <ActiveFilters
        search=""
        location=""
        jobType=""
        jobMode=""
        matchedValues={{
          location: new Set(),
          jobType: new Set(),
          jobMode: new Set(),
        }}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
