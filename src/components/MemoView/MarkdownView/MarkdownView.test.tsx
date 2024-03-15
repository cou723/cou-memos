/* eslint-disable @typescript-eslint/no-floating-promises */
// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import { describe, afterEach, it, expect } from "vitest";
import { MarkdownView } from "@/components/MemoView/MarkdownView";
import {
    All,
    ConsecutiveElements,
    H1,
    H2,
    H3,
    InlineCode,
    List,
    Paragraph
} from "@/components/MemoView/MarkdownView/MarkdownView.stories";

describe("MarkdownView single element", () => {
    afterEach(() => {
        cleanup();
    });

    it("h1", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...H1.args} />);
        expect(asFragment()).toMatchSnapshot();

        expect(getByText("Hello").tagName).equal("H1");
    });

    it("h2", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...H2.args} />);
        expect(asFragment()).toMatchSnapshot();

        expect(getByText("Hello").tagName).equal("H2");
    });

    it("h3", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...H3.args} />);
        expect(asFragment()).toMatchSnapshot();

        expect(getByText("Hello").tagName).equal("H3");
    });

    it("p", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...Paragraph.args} />);
        expect(asFragment()).toMatchSnapshot();

        expect(getByText("#tag1").tagName).equal("DIV");
        expect(getByText("text").tagName).equal("P");
    });

    it("list", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...List.args} />);
        expect(asFragment()).toMatchSnapshot();

        expect(getByText("list1").tagName).equal("LI");
        expect(getByText("list2").tagName).equal("LI");
        expect(getByText("list3").tagName).equal("LI");
    });

    it("inline code", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...InlineCode.args} />);
        expect(asFragment()).toMatchSnapshot();
        expect(getByText("Hello").tagName).equal("CODE");
    });

    it("code", async () => {
        const { asFragment, getByText } = render(
            <MarkdownView
                text={`\`\`\`c
#include
int main(){
    printf("hello world");
}

\`\`\``}
            />
        );
        expect(asFragment()).toMatchSnapshot();
        expect(getByText("printf").tagName).equal("SPAN");
    });
});

describe("MarkdownView multiple elements", () => {
    afterEach(() => {
        cleanup();
    });
    it("h1, h2, h3, p, list, inline code, code", async () => {
        const { asFragment, getByText, container } = render(<MarkdownView {...All.args} />);

        expect(asFragment()).toMatchSnapshot();

        expect(getByText("heading 1").tagName).equal("H1");
        expect(getByText("heading 2").tagName).equal("H2");
        expect(getByText("heading 3").tagName).equal("H3");
        expect(getByText("list1").tagName).equal("LI");

        expect(container.getElementsByTagName("code").length).equal(3);
        expect(container.getElementsByTagName("pre").length).equal(2);

        expect(getByText("console").tagName).equal("SPAN");
        expect(getByText(".").tagName).equal("SPAN");
        expect(getByText("log").tagName).equal("SPAN");
        expect(getByText("(").tagName).equal("SPAN");
        expect(getByText(")").tagName).equal("SPAN");
        expect(getByText(";").tagName).equal("SPAN");

        expect(getByText("normal code").tagName).equal("SPAN");
    });

    it("p, inline code, p", async () => {
        const { asFragment, getByText } = render(<MarkdownView {...ConsecutiveElements.args} />);

        expect(asFragment()).toMatchSnapshot();

        expect(getByText("p1").tagName).equal("P");
        expect(getByText("code").tagName).equal("CODE");
        expect(getByText("p2").tagName).equal("P");
    });
});
