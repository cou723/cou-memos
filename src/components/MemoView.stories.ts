import type { Meta, StoryObj } from "@storybook/react";

import { MemoView } from "./MemoView";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Example/MemoView",
    component: MemoView,
    tags: ["autodocs"]
} satisfies Meta<typeof MemoView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        memo: {
            id: 1,
            text: "#tag1 text",
            created_at: new Date(),
            updated_at: new Date(),
            tags: ["tag1"]
        }
    }
};
