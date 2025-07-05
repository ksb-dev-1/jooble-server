import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { act } from "react";

import { MdSearch } from "react-icons/md";
import { FloatingIcon } from "@/components/home/FloatingIcon";
import React from "react";

describe("FloatingIcon", () => {
  let containerRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) =>
      setTimeout(() => cb(performance.now()), 16)
    );
    vi.stubGlobal("cancelAnimationFrame", clearTimeout);

    const container = document.createElement("div");
    Object.defineProperty(container, "clientWidth", { value: 200 });
    Object.defineProperty(container, "clientHeight", { value: 200 });
    document.body.appendChild(container);

    containerRef = { current: container };
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    if (containerRef.current) {
      containerRef.current.remove();
    }
  });

  it("renders the icon as a visible SVG", async () => {
    await act(async () => {
      render(<FloatingIcon Icon={MdSearch} containerRef={containerRef} />);
    });

    const svg = document.querySelector("svg");
    expect(svg).toBeTruthy();
  });

  it("updates the icon position with transform", async () => {
    await act(async () => {
      render(
        <FloatingIcon Icon={MdSearch} containerRef={containerRef} speed={1} />
      );
    });

    const wrapper = document.querySelector("div[style]") as HTMLElement;
    await act(() => new Promise((r) => setTimeout(r, 100))); // wait for animation
    const transform = wrapper.style.transform;
    expect(transform).toMatch(/translate\(.+px, .+px\)/);
  });
});
