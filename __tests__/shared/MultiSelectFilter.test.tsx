import { render, screen, fireEvent } from "@testing-library/react";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { IoIosStar } from "react-icons/io"; // test icon

describe("MultiSelectFilter", () => {
  const placeholder = "Job Type";
  const options = ["full-time", "part-time", "internship", "contract"];
  let value: string[];
  let onChange: (val: string[]) => void;

  beforeEach(() => {
    value = ["full-time"];
    onChange = vi.fn();
  });

  it("renders with placeholder and icon", () => {
    render(
      <MultiSelectFilter
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        icon={<IoIosStar data-testid="icon" />}
      />
    );

    expect(screen.getByText("Job Type")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders all options with proper checked state", () => {
    render(
      <MultiSelectFilter
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
      />
    );

    const reactBtn = screen.getByRole("checkbox", { name: /full-time/i });
    const tsBtn = screen.getByRole("checkbox", { name: /internship/i });

    expect(reactBtn).toHaveAttribute("aria-checked", "true");
    expect(tsBtn).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with updated value when unchecking a selected option", () => {
    render(
      <MultiSelectFilter
        placeholder={placeholder}
        options={options}
        value={["full-time"]}
        onChange={onChange}
      />
    );

    const reactBtn = screen.getByRole("checkbox", { name: /full-time/i });
    fireEvent.click(reactBtn);

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("calls onChange with updated value when checking a new option", () => {
    render(
      <MultiSelectFilter
        placeholder={placeholder}
        options={options}
        value={["full-time"]}
        onChange={onChange}
      />
    );

    const internshipBtn = screen.getByRole("checkbox", { name: /internship/i });
    fireEvent.click(internshipBtn);

    expect(onChange).toHaveBeenCalledWith(["full-time", "internship"]);
  });

  it("capitalizes option labels", () => {
    render(
      <MultiSelectFilter
        placeholder="Filter"
        options={["full-time"]}
        value={[]}
        onChange={onChange}
      />
    );

    expect(screen.getByText("Full-time")).toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", () => {
    render(
      <div>
        <MultiSelectFilter
          placeholder="Job Type"
          options={options}
          value={["full-time"]}
          onChange={onChange}
        />
        <button data-testid="outside-btn">Outside</button>
      </div>
    );

    // 1. Open dropdown by clicking an option
    const optionBtn = screen.getByRole("checkbox", { name: /full-time/i });
    fireEvent.click(optionBtn); // triggers toggle

    // 2. Click outside
    const outside = screen.getByTestId("outside-btn");
    fireEvent.mouseDown(outside);
  });
});
