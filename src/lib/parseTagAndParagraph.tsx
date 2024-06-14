import type { Character } from "@/components/MemoView/MarkdownView";

export function parseTagAndParagraph(text: string): string[] {
    let readingState: "paragraph" | "tag" = "paragraph";
    let buf: Character[] = [];
    const result: string[] = [];
    const target: Character[] = text.split("");

    const commitBuffer = () => {
        result.push(buf.join(""));
        buf = [];
    };

    const tagStartChar = "#";
    for (const c of target) {
        if (readingState === "paragraph") {
            if (c === tagStartChar) {
                if (buf.length > 0) commitBuffer();
                readingState = "tag";
                buf.push(c);
                continue;
            }
            buf.push(c);

            continue;
        }

        if (readingState === "tag") {
            if (c === "\n" || c === " ") {
                commitBuffer();
                readingState = "paragraph";
                if (c === "\n") buf.push(c);
                continue;
            }
            buf.push(c);
        }
    }

    if (buf.length > 0) commitBuffer();
    return result;
}
