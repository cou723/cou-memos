/* eslint-disable @typescript-eslint/no-floating-promises */
// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TaggedParagraph } from ".";

describe("TaggedText", () => {
    afterEach(cleanup);

    it("should render", () => {
        const { asFragment, getByText } = render(
            <TaggedParagraph text="#tag" />,
        );
        expect(asFragment()).toMatchSnapshot();
        expect(getByText("#tag")).toBeTruthy();
    });
});
