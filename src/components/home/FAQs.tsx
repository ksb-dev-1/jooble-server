"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        You can create an account by signing in with your
        <span className="text-primary">Google</span> or
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
  const direction = index % 2 === 0 ? -20 : 20;
  const delay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, x: direction }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex w-full items-center justify-between py-4 text-left">
        <button
          className="flex w-full items-center justify-between hover:underline"
          onClick={onToggle}
        >
          <h3 className="text-left font-medium sm:text-lg">{faq.question}</h3>
          <motion.span
            className="ml-6 flex-shrink-0"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <LiaMinusSolid className="h-5 w-5" />
            ) : (
              <LiaPlusSolid className="h-5 w-5" />
            )}
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="pb-4 text-slate-500 dark:text-slate-400">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.h2
        id="faq-heading"
        className="text-xl md:text-2xl font-bold mb-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.span
          className="inline-block border-b-2 border-primary text-primary origin-left"
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          style={{ display: "inline-block" }}
        >
          FAQ&apos;s
        </motion.span>
      </motion.h2>

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
