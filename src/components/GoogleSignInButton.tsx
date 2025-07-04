"use client";

import { useFormStatus } from "react-dom";

// 3rd party
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      aria-busy={pending}
      aria-label="Sign in with Google"
      title="Sign in with Google"
      className={`relative w-full border rounded-full p-4 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring focus-visible:ring-offset-2
        ${pending ? "pointer-events-none opacity-70" : "hover:bg-btnHover"}`}
    >
      <FcGoogle className="text-2xl" aria-hidden="true" />
      <span className="mx-4 font-medium md:text-lg">Sign in with Google</span>
      {pending && (
        <AiOutlineLoading3Quarters
          className="absolute right-4 animate-spin w-5 h-5"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
