import type { FC } from "react";
import React from "react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { parseTagAndParagraph } from "../../../lib/parseTagAndParagraph";

import type { CodeComponent } from "react-markdown/lib/ast-to-react";
import type { ReactElement } from "react-markdown/lib/react-markdown";

import { Tag } from "@/components/MemoView/MarkdownView/Text/Tag";

type Props = { text: string };

/*
いろいろ試した感じ、unifiedなどを使ってがっつり変換するのはunifiedのエコシステム周りがまだかなり型安全ではない状態なので、あくまでReactMarkdownのcomponents propsをつかってできる範囲でやるのがよさそう。
 */

export const MarkdownView: FC<Props> = React.memo(({ text }) => {
    return (
        <ReactMarkdown
            components={{
                code: syntaxHighlightedCode,
                p: tagOrParagraph,
            }}
            className="memo"
        >
            {text}
        </ReactMarkdown>
    );
});

// タグの場合はTaggedTextを使う
function tagOrParagraph({ children }: { children: React.ReactNode }) {
    const elements: ReactElement[] = [];
    if (children == null) return null;
    if (!Array.isArray(children)) return <>{children}</>;
    if (children.length === 0) return null;

    for (const [i, child] of children.entries()) {
        if (typeof child === "string") {
            const parsed = parseTagAndParagraph(child);
            for (const [j, content] of parsed.entries()) {
                if (content.startsWith("#")) {
                    elements.push(<Tag text={content} key={`${i}-${j}`} />);
                } else {
                    elements.push(<p key={`${i}-${j}`}>{content}</p>);
                }
            }
        } else {
            elements.push(React.cloneElement(child, { key: i }));
        }
    }

    return <>{elements.map((element) => element)}</>;
}

export type Character = string;

// コードブロックの場合既存の言語の場合はSyntaxHighlighterを使う
const syntaxHighlightedCode: CodeComponent = ({
    className,
    children,
    ...props
}) => {
    const match = /language-(\w+)/.exec(className || "");
    const isInlineCode =
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        Array.isArray(children) && !(children[0]! as string).includes("\n");
    if (!isInlineCode) {
        return (
            <SyntaxHighlighter
                {...props}
                inline={props.inline ? props.inline.toString() : undefined}
                language={match ? match[1] : ""}
                style={atomDark}
                PreTag="div"
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        );
        // 知らないコードブロックとインラインコードの場合はcodeタグを使う
    }
    return (
        <code {...props} className={isInlineCode ? "inline-code" : ""}>
            {children}
        </code>
    );
};
