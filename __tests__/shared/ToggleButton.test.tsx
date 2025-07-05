import { render, screen } from "@testing-library/react";
import ToggleSaveButton from "@/components/shared/ToggleSaveButton";
import { describe, it, expect, vi, afterEach } from "vitest";
import * as ReactDom from "react-dom";
import type { Mock } from "vitest";

// ✅ Mock useFormStatus using vi.mock and ES module syntax
vi.mock("react-dom", async () => {
  const actual: typeof ReactDom = await vi.importActual("react-dom");
  return {
    ...actual,
    useFormStatus: vi.fn(),
  };
});

const mockedUseFormStatus = ReactDom.useFormStatus as Mock;

describe("ToggleSaveButton", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when pending", () => {
    mockedUseFormStatus.mockReturnValue({ pending: true });

    render(<ToggleSaveButton isSaved={false} />);

    const button = screen.getByRole("button", { name: "Saving job" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("renders saved icon when isSaved is true and not pending", () => {
    mockedUseFormStatus.mockReturnValue({ pending: false });

    render(<ToggleSaveButton isSaved={true} />);

    const button = screen.getByRole("button", {
      name: "Remove job from saved",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("renders unsaved icon when isSaved is false and not pending", () => {
    mockedUseFormStatus.mockReturnValue({ pending: false });

    render(<ToggleSaveButton isSaved={false} />);

    const button = screen.getByRole("button", { name: "Save job" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
