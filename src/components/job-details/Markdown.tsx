// 3rd party
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ ...props }) => (
          <h2 className="font-semibold text-lg mb-2" {...props} />
        ),
        p: ({ ...props }) => (
          <p
            className="leading-relaxed text-slate-500 dark:text-slate-400 mb-8"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc list-inside mb-8" {...props} />
        ),
        li: ({ ...props }) => (
          <li className="mb-1 text-slate-500 dark:text-slate-400" {...props} />
        ),
        a: ({ ...props }) => (
          <a className="text-green-500 underline" target="_blank" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
