"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// @TODO: try to find better solution
export default function CodeBlock({
  code,
  language = "javascript",
}: {
  code: string;
  language?: string;
}) {
  return (
    <SyntaxHighlighter language={language} style={solarizedDark}>
      {code}
    </SyntaxHighlighter>
  );
}
