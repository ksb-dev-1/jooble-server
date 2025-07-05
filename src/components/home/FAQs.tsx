"use client";

import { useState } from "react";

// 3rd party
import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const faqs: FAQ[] = [
  {
    question: "What is the purpose of this portal?",
    answer:
      "This job portal connects job seekers with employers, allowing users to discover job opportunities and apply for them easily.",
  },
  {
    question: "How can I create an account?",
    answer: (
      <>
        You can create an account by signing in with your{" "}
        <span className="text-primary">Google</span> or{" "}
        <span className="text-primary">GitHub</span> account. Just click on the
        respective button to get started.
      </>
    ),
  },
  {
    question: "Is there a fee to use the portal?",
    answer: "With the free plan, you can apply for one job per day at no cost.",
  },
  {
    question: "Can I save my favorite jobs?",
    answer:
      "Yes, you can save your favorite jobs and also view your applied jobs.",
  },
  {
    question: "Can I apply for multiple jobs?",
    answer:
      "Currently, you can apply for one job per day. Premium access for unlimited applications is coming soon!",
  },
];

function FAQItem({ faq, isOpen, onToggle, index }: FAQItemProps) {
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <div>
      <div className="flex w-full items-center justify-between py-4 text-left">
        <button
          className="flex w-full items-center justify-between hover:underline"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={questionId}
        >
          <h3 className="font-medium text-left">{faq.question}</h3>
          <span className="ml-6 flex-shrink-0" aria-hidden="true">
            {isOpen ? (
              <LiaMinusSolid className="h-5 w-5" />
            ) : (
              <LiaPlusSolid className="h-5 w-5" />
            )}
          </span>
        </button>
      </div>

      {isOpen && (
        <div key="answer" role="region" aria-labelledby={questionId}>
          <p className="pb-4 text-slate-500 dark:text-slate-400">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4" id="faq-heading">
        <span className="border-b border-primary text-primary">FAQ&apos;s</span>
      </h2>
      <div
        className="divide-y divide-borderColor"
        role="region"
        aria-labelledby="faq-heading"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
