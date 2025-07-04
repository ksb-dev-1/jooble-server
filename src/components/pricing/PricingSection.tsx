// "use client";

// import Link from "next/link";
// import {
//   motion,
//   // Variants
// } from "framer-motion";

// // const underlineItem: Variants = {
// //   hidden: { width: 0 },
// //   show: {
// //     width: "8rem", // same as w-32
// //     transition: {
// //       // delay: 1.0,
// //       duration: 0.8,
// //       ease: [0.22, 1, 0.36, 1],
// //     },
// //   },
// // };

// export default function PricingSection() {
//   return (
//     <div className="max-w-5xl px-4 mx-auto text-primaryBtnTextColor">
//       {/* <h2 className="text-xl md:text-2xl font-extrabold mb-4 md:mb-8">
//         Premium
//       </h2> */}
//       <motion.section className="relative flex flex-col items-center gap-8 text-center">
//         {/* <motion.div
//           variants={underlineItem}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.3 }}
//           className="absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-primary rounded-full"
//         /> */}

//         <motion.h2
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.1, duration: 0.8 }}
//           className="text-2xl font-extrabold"
//         >
//           Unlock premium features
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="text-lg md:text-xl font-medium"
//         >
//           Boost your job search with exclusive access to premium listings,
//           advanced filters, and application insights — built for ambitious
//           professionals.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//         >
//           <Link
//             href="/pricing"
//             className="inline-block bg-white text-primary rounded px-8 py-3 sm:text-lg font-medium hover:tracking-widest transition-all"
//           >
//             View Pricing →
//           </Link>
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// }

// -----------------------------------------------------------------------------------------------------------

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <div className="bg-primary text-primaryBtnTextColor p-4 text-center">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-xl font-medium hover:underline underline-offset-4"
        >
          Click here to know more about pricing
          <motion.span
            className="inline-block"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
