import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// actions
import {
  githubSigninServerAction,
  googleSigninServerAction,
} from "@/actions/sigin-in-server-actions";

// components
import GoogleSignInButton from "@/components/sign-in/GoogleSignInButton";
import GitHubSignInButton from "@/components/sign-in/GitHubSignInButton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Securely sign in to Jooble with Google or GitHub",
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user?.id) redirect("/jobs?page=1");

  return (
    <main
      className="h-[calc(100vh-57px)] flex flex-col items-center justify-center px-4"
      role="main"
      aria-label="Sign in to Jooble"
    >
      <section className="max-w-xl w-full mx-auto border rounded p-4 sm:p-8">
        <h1 className="font-bold text-xl md:text-2xl mb-8 text-center">
          Sign in to <span className="text-primary">Jooble</span>
        </h1>

        <fieldset
          className="flex flex-col gap-4"
          aria-labelledby="sign-in-options"
        >
          <legend id="sign-in-options" className="sr-only">
            Choose a sign-in method
          </legend>

          <form
            action={googleSigninServerAction}
            aria-describedby="google-desc"
          >
            <span id="google-desc" className="sr-only">
              Sign in with Google
            </span>
            <GoogleSignInButton />
          </form>

          <form
            action={githubSigninServerAction}
            aria-describedby="github-desc"
          >
            <span id="github-desc" className="sr-only">
              Sign in with GitHub
            </span>
            <GitHubSignInButton />
          </form>
        </fieldset>

        <footer className="text-sm text-textSecondary mt-6 text-center mx-auto max-w-md">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="#"
              className="text-primary hover:underline transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-primary hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </section>
    </main>
  );
}
