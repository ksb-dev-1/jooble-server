// test-utils.tsx
import { ReactNode } from "react";
import mockRouter from "next-router-mock";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

export function RouterMockProvider({ children }: { children: ReactNode }) {
  return (
    <RouterContext.Provider value={mockRouter as unknown as NextRouter}>
      {children}
    </RouterContext.Provider>
  );
}
