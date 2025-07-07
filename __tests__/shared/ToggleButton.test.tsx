import { render, screen } from "@testing-library/react";
import ToggleSaveButton from "@/components/shared/ToggleSaveButton";
import { describe, it, expect, afterEach } from "vitest";

describe("ToggleSaveButton", () => {
  afterEach(() => {
    // Nothing to clear now since no mocks
  });

  it("renders loading spinner when pending is true", () => {
    render(<ToggleSaveButton isSaved={false} pending={true} />);

    const button = screen.getByRole("button", { name: "Saving job" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("renders saved icon when isSaved is true and not pending", () => {
    render(<ToggleSaveButton isSaved={true} pending={false} />);

    const button = screen.getByRole("button", {
      name: "Remove job from saved",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("renders unsaved icon when isSaved is false and not pending", () => {
    render(<ToggleSaveButton isSaved={false} pending={false} />);

    const button = screen.getByRole("button", { name: "Save job" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
