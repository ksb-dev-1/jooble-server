// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import JobFilters from "@/components/jobs/JobFilters";
// import * as actions from "@/actions/apply-filters-server-action";

// // Mock MultiSelectFilter to just show passed props for simplicity
// vi.mock("@/components/shared/MultiSelectFilter", () => ({
//   default: ({ placeholder, value }: any) => (
//     <div data-testid={`${placeholder.toLowerCase()}-filter`}>
//       <span>{placeholder}</span>
//       {value.map((val: string) => (
//         <span key={val}>{val}</span>
//       ))}
//     </div>
//   ),
// }));

// vi.mock("@/actions/apply-filters-server-action", () => ({
//   applyFiltersServerAction: vi.fn(),
// }));

// describe("JobFilters", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("renders all sections correctly", () => {
//     render(<JobFilters />);

//     expect(screen.getByRole("searchbox")).toBeInTheDocument();
//     expect(screen.getByTestId("job type-filter")).toBeInTheDocument();
//     expect(screen.getByTestId("job mode-filter")).toBeInTheDocument();
//     expect(screen.getByTestId("location-filter")).toBeInTheDocument();
//   });

//   it("sets initial values from props", () => {
//     render(
//       <JobFilters
//         currentSearch="developer"
//         currentLocation="pune,bengaluru"
//         currentJobType="full-time"
//         currentJobMode="remote"
//       />
//     );

//     expect(screen.getByRole("searchbox")).toHaveValue("developer");
//     expect(screen.getByText("pune")).toBeInTheDocument();
//     expect(screen.getByText("bengaluru")).toBeInTheDocument();
//     expect(screen.getByText("full-time")).toBeInTheDocument();
//     expect(screen.getByText("remote")).toBeInTheDocument();
//   });

//   it("calls applyFiltersServerAction on Enter key press", () => {
//     const spy = vi
//       .spyOn(actions, "applyFiltersServerAction")
//       .mockImplementation(() => Promise.resolve());

//     render(<JobFilters currentSearch="" />);
//     const input = screen.getByRole("searchbox");

//     fireEvent.change(input, { target: { value: "designer" } });
//     fireEvent.keyDown(input, { key: "Enter" });

//     expect(spy).toHaveBeenCalled(); // ✅ this will now pass
//   });

//   it("does not submit on empty Enter key", () => {
//     render(<JobFilters currentSearch="" />);
//     const input = screen.getByRole("searchbox");

//     const form = screen.getByRole("form", {
//       hidden: true,
//     }) as HTMLFormElement & {
//       requestSubmit: () => void;
//     };

//     const submitSpy = vi.spyOn(form, "requestSubmit");

//     fireEvent.change(input, { target: { value: " " } }); // only spaces
//     fireEvent.keyDown(input, { key: "Enter" });

//     expect(submitSpy).not.toHaveBeenCalled(); // ✅ should pass
//   });
// });

/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import JobFilters from "@/components/jobs/JobFilters";

// Mock MultiSelectFilter to just show passed props for simplicity
vi.mock("@/components/shared/MultiSelectFilter", () => ({
  default: ({ placeholder, value }: any) => (
    <div data-testid={`${placeholder.toLowerCase()}-filter`}>
      <span>{placeholder}</span>
      {value.map((val: string) => (
        <span key={val}>{val}</span>
      ))}
    </div>
  ),
}));

// Mock useRouter from next/navigation
const pushMock = vi.fn();
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: pushMock,
    }),
    usePathname: () => "/jobs",
    useSearchParams: () => new URLSearchParams(),
  };
});

describe("JobFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all sections correctly", () => {
    render(<JobFilters />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByTestId("job type-filter")).toBeInTheDocument();
    expect(screen.getByTestId("job mode-filter")).toBeInTheDocument();
    expect(screen.getByTestId("location-filter")).toBeInTheDocument();
  });

  it("sets initial values from props", () => {
    render(
      <JobFilters
        currentSearch="developer"
        currentLocation="pune,bengaluru"
        currentJobType="full-time"
        currentJobMode="remote"
      />
    );

    expect(screen.getByRole("searchbox")).toHaveValue("developer");
    expect(screen.getByText("pune")).toBeInTheDocument();
    expect(screen.getByText("bengaluru")).toBeInTheDocument();
    expect(screen.getByText("full-time")).toBeInTheDocument();
    expect(screen.getByText("remote")).toBeInTheDocument();
  });

  it("pushes URL on Enter key press with search input", () => {
    render(<JobFilters currentSearch="" />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "designer" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(pushMock).toHaveBeenCalledWith("/jobs?search=designer");
  });

  it("does not push on empty search input", () => {
    render(<JobFilters currentSearch="" />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: " " } }); // only spaces
    fireEvent.keyDown(input, { key: "Enter" });

    expect(pushMock).not.toHaveBeenCalled();
  });
});
