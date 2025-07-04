// import ReactMarkdown from "react-markdown";

// interface MarkdownProps {
//   children: string;
// }

// export default function Markdown({ children }: MarkdownProps) {
//   return (
//     <ReactMarkdown
//       components={{
//         p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
//         ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
//         li: (props) => <li className="mb-1" {...props} />,
//         a: (props) => (
//           <a className="text-green-500 underline" target="_blank" {...props} />
//         ),
//       }}
//     >
//       {children}
//     </ReactMarkdown>
//   );
// }

import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-2xl font-bold mb-2" {...props} />
        ),
        h2: ({ ...props }) => <h2 className="font-semibold mb-2" {...props} />,
        h3: ({ ...props }) => (
          <h3 className="text-lg font-medium mb-2" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="leading-relaxed text-textSecondary mb-8" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc list-inside mb-8" {...props} />
        ),
        li: ({ ...props }) => (
          <li className="mb-1 text-textSecondary" {...props} />
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
