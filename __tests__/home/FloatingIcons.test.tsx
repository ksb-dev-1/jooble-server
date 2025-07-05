import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import FloatingIcons from "@/components/home/FloatingIcons";

// Stub Math.random for predictable sizes and speeds
beforeEach(() => {
  let callCount = 0;
  vi.spyOn(Math, "random").mockImplementation(() => {
    // Alternate between 0.5 and 0.1 for size and speed
    return callCount++ % 2 === 0 ? 0.5 : 0.1;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("FloatingIcons", () => {
  it("renders all floating icons", () => {
    const { container } = render(<FloatingIcons />);
    // Find all <svg> elements inside aria-hidden container (rendered icons)
    const floatingIcons = container.querySelectorAll(
      "[aria-hidden='true'] svg"
    );
    expect(floatingIcons.length).toBe(15); // matches number of icons in the array
  });

  it("renders icons with random sizes and speeds", () => {
    const { container } = render(<FloatingIcons />);
    const wrappers = container.querySelectorAll("div[style]");
    expect(wrappers.length).toBeGreaterThan(0);

    wrappers.forEach((el) => {
      const style = el.getAttribute("style");
      expect(style).toMatch(/width:\s*\d+px/);
      expect(style).toMatch(/height:\s*\d+px/);
      expect(style).toMatch(/translate\(\d+(\.\d+)?px,\s*\d+(\.\d+)?px\)/);
    });
  });
});
