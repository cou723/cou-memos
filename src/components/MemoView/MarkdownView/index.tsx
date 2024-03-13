import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TaggedParagraph } from "./TaggedParagraph";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

type Props = { text: string };

export const MarkdownView: FC<Props> = React.memo(({ text }) => {
    return (
        <ReactMarkdown
            components={{
                code: syntaxHighlightedCode,
                p: taggedText
            }}
            className="memo"
        >
            {text}
        </ReactMarkdown>
    );
});

// タグの場合はTaggedTextを使う
function taggedText({ children }: { children: React.ReactNode[] }) {
    const result: React.ReactNode[] = [];
    for (const child of children) {
        if (typeof child === "string" || typeof child == "number" || typeof child == "boolean")
            result.push(<TaggedParagraph text={child.toString()} />);
        else result.push(child);
    }
    return <>{result}</>;
}

// コードブロックの場合既存の言語の場合はSyntaxHighlighterを使う
const syntaxHighlightedCode: CodeComponent = ({ node, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const isInlineCode = Array.isArray(children) && !(children[0]! as string).includes("\n");
    if (!isInlineCode) {
        return (
            <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, "")}
                language={match ? match[1] : ""}
                style={atomDark}
                PreTag="div"
            />
        );
        // 知らないコードブロックとインラインコードの場合はcodeタグを使う
    } else {
        return (
            <code {...props} className={isInlineCode ? `inline-code` : ""}>
                {children}
            </code>
        );
    }
};
