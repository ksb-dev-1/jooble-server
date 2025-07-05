import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useState, useRef } from "react";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import Modal from "@/components/shared/Modal";

// Mock the outside click hook
vi.mock("@/hooks/useHandleOutsideClick", () => ({
  useHandleOutsideClick: vi.fn(),
}));

describe("Modal", () => {
  const Wrapper = ({ open }: { open: boolean }) => {
    const [isOpen, setIsOpen] = useState(open);
    const ref = useRef<HTMLDivElement>(null);

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        labelledById="modal-title"
      >
        <h2 id="modal-title">Modal Title</h2>
        <p>Modal Content</p>
      </Modal>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal content when open", () => {
    render(<Wrapper open={true} />);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render modal content when closed", () => {
    render(<Wrapper open={false} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("opacity-0");
    expect(dialog).toHaveClass("pointer-events-none");
  });

  it("closes modal on Escape key press", async () => {
    render(<Wrapper open={true} />);
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("opacity-0");
    });
  });

  it("sets up outside click handler", () => {
    render(<Wrapper open={true} />);
    expect(useHandleOutsideClick).toHaveBeenCalled();
  });
});
