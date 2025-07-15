import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import Providers from "./Providers";
import { ThemeProvider } from "./ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Jooble",
  description: "A go to platform for job seekers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('theme') || 'light';
                var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                var theme = savedTheme === 'system' ? systemTheme : savedTheme;
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className="bg-light dark:bg-dark text-text_primary">
        <Providers>
          <ThemeProvider>
            <div>
              <Navbar />
              {children}
              <Footer />
              <SpeedInsights />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
