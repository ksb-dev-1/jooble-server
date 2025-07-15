"use client";

import { Suspense } from "react";

// components
import ProgressBar from "@/components/ProgressBar";

// 3rd party libraries
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <ProgressBar />
        </Suspense>
        {children}
      </QueryClientProvider>
      <Toaster position="top-right" />
    </SessionProvider>
  );
}
