import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { PWithTag } from "./PWithTag";

export const MarkdownView = React.memo(({ text }: { text: string }) => {
    return (
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    );
                },
                p({ node, children, ...props }) {
                    return <PWithTag text={children.toString()} />;
                }
            }}
            className="memo"
        >
            {text}
        </ReactMarkdown>
    );
});
