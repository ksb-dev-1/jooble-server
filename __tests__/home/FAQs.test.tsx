import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import FAQs from "@/components/home/FAQs";

afterEach(() => {
  cleanup();
});

describe("FAQs component", () => {
  it("renders the FAQs heading", () => {
    render(<FAQs />);
    expect(screen.getByRole("heading", { name: /faq's/i })).toBeInTheDocument();
  });

  it("renders all FAQ questions", () => {
    render(<FAQs />);
    const questions = screen.getAllByRole("button");
    expect(questions.length).toBe(5);
    expect(
      screen.getByText(/what is the purpose of this portal/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/how can i create an account/i)
    ).toBeInTheDocument();
  });

  it("hides answers initially", () => {
    render(<FAQs />);
    expect(
      screen.queryByText(/connects job seekers with employers/i)
    ).not.toBeInTheDocument();
  });

  it("shows answer on clicking a question", () => {
    render(<FAQs />);
    const questionButton = screen.getByRole("button", {
      name: /what is the purpose of this portal/i,
    });
    fireEvent.click(questionButton);
    expect(
      screen.getByText(/connects job seekers with employers/i)
    ).toBeInTheDocument();
  });

  it("closes previously open FAQ when another is clicked", () => {
    render(<FAQs />);

    const firstQuestion = screen.getByRole("button", {
      name: /what is the purpose of this portal/i,
    });
    const secondQuestion = screen.getByRole("button", {
      name: /how can i create an account/i,
    });

    fireEvent.click(firstQuestion);
    expect(
      screen.getByText(/connects job seekers with employers/i)
    ).toBeInTheDocument();

    fireEvent.click(secondQuestion);
    expect(
      screen.queryByText(/connects job seekers with employers/i)
    ).not.toBeInTheDocument();

    expect(screen.getByText(/signing in with your/i)).toBeInTheDocument();
  });

  it("toggles the same FAQ on second click", () => {
    render(<FAQs />);
    const question = screen.getByRole("button", {
      name: /can i save my favorite jobs/i,
    });

    fireEvent.click(question);
    expect(
      screen.getByText(/you can save your favorite jobs/i)
    ).toBeInTheDocument();

    fireEvent.click(question);
    expect(
      screen.queryByText(/you can save your favorite jobs/i)
    ).not.toBeInTheDocument();
  });
});
