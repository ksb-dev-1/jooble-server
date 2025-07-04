// "use client";

import Link from "next/link";
// import { motion, Variants } from "framer-motion";

// const container: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.3,
//     },
//   },
// };

// const textItem: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       ease: [0.16, 1, 0.3, 1],
//       duration: 0.8,
//     },
//   },
// };

// const buttonItem: Variants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.9,
//   },
//   show: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       ease: [0.16, 1, 0.3, 1],
//       duration: 0.8,
//       delay: 0.6,
//     },
//   },
// };

// const underlineItem: Variants = {
//   hidden: { scaleX: 0 },
//   show: {
//     scaleX: 1,
//     transition: {
//       delay: 1.0,
//       duration: 0.8,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

export default function Heading() {
  return (
    <div
      //initial="hidden"
      //animate="show"
      //variants={container}
      className="absolute z-20 h-full w-full flex flex-col items-center justify-center px-4 bg-hero"
      role="region"
      aria-labelledby="hero-heading"
    >
      <h1
        id="hero-heading"
        //variants={textItem}
        className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center text-primary"
      >
        Unlock your career potential
      </h1>

      <p
        //variants={textItem}
        className="text-xl md:text-3xl font-semibold text-center max-w-2xl mt-4 md:mt-8 text-primary"
      >
        Discover jobs that inspire you
      </p>

      <div
        //variants={buttonItem}
        className="mt-8 md:mt-12"
      >
        <Link
          href="/jobs"
          className="bg-primary text-light dark:text-dark rounded px-8 py-4 sm:text-lg hover:tracking-widest transition-all"
          aria-label="Start exploring job opportunities"
        >
          Start Exploring →
        </Link>
      </div>

      <div
        //variants={textItem}
        className="text-center text-lg space-y-3 max-w-2xl w-full mt-8 md:mt-12"
      >
        <p>
          A modern job discovery platform powered by intelligent filters,
          real-time search, and smooth UI animations.
        </p>
        <div
          className="w-24 h-1 bg-primary rounded mx-auto mt-6"
          //variants={underlineItem}
          role="presentation"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
