"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// @TODO: try to find better solution
export default function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      children={code}
      language="javascript"
      style={solarizedDark}
    />
  );
}
