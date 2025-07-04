// import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [tsconfigPaths(), react()],
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: ["./vitest.setup.ts"], // or .js
//   },
// });

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      // ✅ Only include your actual app source files
      include: ["src/**/*.{ts,tsx}"], // or use "components/" or "app/"
      // ✅ Exclude configs, types, test files, etc.
      exclude: [
        "node_modules/",
        "vitest.config.*",
        "next.config.*",
        "tailwind.config.*",
        "postcss.config.*",
        "next-env.d.ts",
        "**/*.test.*",
        "**/__tests__/**",
        "vitest.setup.*",
      ],
    },
  },
});
