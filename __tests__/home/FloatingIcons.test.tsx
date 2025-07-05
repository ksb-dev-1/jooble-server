// import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
// import { render } from "@testing-library/react";
// import { act } from "react";
// import FloatingIcons from "@/components/home/FloatingIcons";

// describe("FloatingIcons", () => {
//   beforeEach(() => {
//     vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) =>
//       setTimeout(() => cb(performance.now()), 16)
//     );
//     vi.stubGlobal("cancelAnimationFrame", clearTimeout);
//     // Optional: make Math.random deterministic
//     vi.spyOn(Math, "random").mockImplementation(() => 0.5);
//   });

//   afterEach(() => {
//     vi.unstubAllGlobals();
//     vi.restoreAllMocks();
//   });

//   it("renders 15 FloatingIcon components", async () => {
//     await act(async () => {
//       render(<FloatingIcons />);
//     });

//     // Find all SVGs since each FloatingIcon renders 1 SVG
//     const icons = document.querySelectorAll("svg");
//     expect(icons.length).toBe(15);
//   });

//   it("renders a container with correct classes", () => {
//     const { container } = render(<FloatingIcons />);
//     const wrapper = container.querySelector(".pointer-events-none");
//     expect(wrapper).toBeInTheDocument();
//     expect(wrapper).toHaveClass("absolute", "z-10", "h-full", "w-full");
//   });
// });

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
