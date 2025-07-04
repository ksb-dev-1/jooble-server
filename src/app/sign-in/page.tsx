import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// actions
import {
  githubSigninServerAction,
  googleSigninServerAction,
} from "@/actions/sigin-in-server-actions";

// components
import GoogleSignInButton from "@/components/GoogleSignInButton";
import GitHubSignInButton from "@/components/GitHubSignInButton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Securely sign in to Jooble with Google or GitHub",
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user?.id) redirect("/jobs?page=1");

  return (
    <main
      className="h-[calc(100vh-56px)] flex flex-col items-center justify-center"
      role="main"
    >
      <section className="max-w-xl w-full px-4 mx-auto">
        <h1 className="font-bold text-xl md:text-2xl mb-8 text-center">
          Sign in to <span className="text-primary">Jooble</span>
        </h1>

        <div className="flex flex-col gap-4" aria-label="Sign-in options">
          <form action={googleSigninServerAction}>
            <GoogleSignInButton />
          </form>
          <form action={githubSigninServerAction}>
            <GitHubSignInButton />
          </form>
        </div>

        <p className="text-sm text-textSecondary mt-6 text-center mx-auto max-w-md">
          By signing in, you agree to our{" "}
          <a
            href="/terms"
            className="underline hover:text-primary transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </main>
  );
}
