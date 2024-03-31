import { CodeComponent } from "react-markdown/lib/ast-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// コードブロックの場合既存の言語の場合はSyntaxHighlighterを使う
export const syntaxHighlightedCodeHandler: CodeComponent = ({ node, className, children, ...props }) => {
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
