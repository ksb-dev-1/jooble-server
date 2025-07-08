// 3rd party
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-light dark:bg-dark" role="contentinfo">
      <div className="max-w-5xl w-full mx-auto p-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-center sm:text-left text-sm" aria-label="Copyright">
          © {new Date().getFullYear()} Jooble. All rights reserved.
        </p>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <a
            href="mailto:babaleshwarkedar@gmail.com"
            className="hover:text-primary transition-colors underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Email kedar babaleshwar"
            title="Send email to kedar babaleshwar"
          >
            babaleshwarkedar@gmail.com
          </a>

          <span aria-hidden="true">|</span>

          <a
            href="https://github.com/ksb-dev-1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
            title="GitHub - ksb-dev-1"
            className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaGithub className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
