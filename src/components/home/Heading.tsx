"use client";

import Link from "next/link";

// 3rd party
import { motion, Variants } from "framer-motion";

const underlineItem: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      delay: 1.0,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Heading() {
  return (
    <div
      className="absolute z-20 h-full w-full flex flex-col items-center justify-center px-4 bg-hero"
      role="region"
      aria-labelledby="hero-heading"
    >
      <h1
        id="hero-heading"
        className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center text-primary"
      >
        Unlock your career potential
      </h1>

      <p className="text-xl md:text-3xl font-bold text-center max-w-2xl mt-4 md:mt-8 text-primary">
        Discover jobs that inspire you
      </p>

      <div className="mt-8 md:mt-12">
        <Link
          href="/jobs"
          className="font-medium text-xl bg-primary text-light dark:text-dark rounded px-8 py-4 hover:tracking-widest transition-all"
          aria-label="Start exploring job opportunities"
        >
          Start Exploring
        </Link>
      </div>

      <div className="text-center space-y-3 max-w-2xl w-full mt-8 md:mt-12">
        <p className="text-xl text-slate-500 dark:text-slate-400">
          Discover jobs effortlessly with intelligent filtering, instant search
          results, and an elegant, modern UI.
        </p>
        <motion.div
          className="w-24 h-1 bg-primary rounded mx-auto mt-6 origin-center"
          variants={underlineItem}
          initial="hidden"
          animate="show"
          role="presentation"
          aria-hidden="true"
          data-testid="underline"
        />
      </div>
    </div>
  );
}
