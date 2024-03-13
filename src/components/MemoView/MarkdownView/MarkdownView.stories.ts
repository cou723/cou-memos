import type { Meta, StoryObj } from "@storybook/react";

import { MarkdownView } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "MarkdownView",
    component: MarkdownView,
    tags: ["autodocs"]
} satisfies Meta<typeof MarkdownView>;

export default meta;
type Story = StoryObj<typeof meta>;

// headings
export const H1: Story = { args: { text: "# Hello" } };
export const H2: Story = { args: { text: "## Hello" } };
export const H3: Story = { args: { text: "### Hello" } };

export const List: Story = {
    args: {
        text: `- list1
- list2
- list3`
    }
};

export const Paragraph: Story = {
    args: { text: `#tag1 text` }
};

export const InlineCode: Story = {
    args: { text: `\`Hello\`` }
};

export const All: Story = {
    args: {
        text: `#tag1 text
# heading 1
## heading 2
### heading 3
- list1
- list2
- list3

\`code\`

\`\`\`js
console.log();
\`\`\`

\`\`\`
normal code
\`\`\`
`
    }
};

export const ConsecutiveElements: Story = {
    args: {
        text: `p1 \`code\` p2`
    }
};
