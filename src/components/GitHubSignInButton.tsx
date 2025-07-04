"use client";

import { useFormStatus } from "react-dom";
import { FaGithub } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GitHubSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      aria-busy={pending}
      aria-label="Sign in with GitHub"
      title="Sign in with GitHub"
      className={`relative w-full border rounded-full p-4 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring focus-visible:ring-offset-2
        ${pending ? "pointer-events-none opacity-70" : "hover:bg-btnHover"}`}
    >
      <FaGithub className="text-xl md:text-2xl" aria-hidden="true" />
      <span className="mx-4 font-medium md:text-lg">Sign in with GitHub</span>
      {pending && (
        <AiOutlineLoading3Quarters
          className="absolute right-4 animate-spin w-5 h-5"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
