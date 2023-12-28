import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TaggedText } from "./TaggedText";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

type Props = { text: string };

export const MarkdownView: FC<Props> = React.memo(({ text }) => {
    return (
        <ReactMarkdown
            components={{
                code: customCode,
                p: customParagraph
            }}
            className="memo"
        >
            {text}
        </ReactMarkdown>
    );
});

// タグの場合はTaggedTextを使う
function customParagraph({ children }: { children: React.ReactNode[] }) {
    for (const child of children) {
        if (typeof child === "string" || typeof child == "number" || typeof child == "boolean")
            return <TaggedText text={child.toString()} />;
        else return child;
    }
}

// コードブロックの場合既存の言語の場合はSyntaxHighlighterを使う
const customCode: CodeComponent = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
        <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, "")}
            language={match[1]}
            style={atomDark}
            PreTag="div"
        />
    ) : (
        <code {...props} className={className}>
            {children}
        </code>
    );
};
