import { describe, expect, it } from "vitest";

import { parseTagAndParagraph } from "@/lib/parseTagAndParagraph";

describe("parseTagAndParagraph", () => {
    it("should parse tag and paragraph", () => {
        expect(parseTagAndParagraph("p")).toEqual(["p"]);
        expect(parseTagAndParagraph("#tag1 text")).toEqual(["#tag1", "text"]);
        expect(parseTagAndParagraph("#tag1\ntext")).toEqual(["#tag1", "\ntext"]);
        expect(parseTagAndParagraph("#tag1  \ntext")).toEqual(["#tag1", " \ntext"]);
    });
});
