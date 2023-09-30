import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Text } from "./Text";

type Props = { text: string };

export const MarkdownView: FC<Props> = React.memo(({ text }) => {
    console.log("render :", text);
    return (
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    console.log("children :", children);
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            style={atomDark}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className + " inline-code"}>
                            {children}
                        </code>
                    );
                },
                p({ children }) {
                    return <Text>{children}</Text>;
                }
            }}
            className="memo"
        >
            {text}
        </ReactMarkdown>
    );
});
