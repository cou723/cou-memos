import type { Meta, StoryObj } from "@storybook/react";

import { MemoView } from ".";

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
            text: `#tag1 text
# heading1
## heading 2
### heading 3
- list1
- list2
- list3


*italic*

**bold**

\`\`\`
code block
\`\`\`

\`\`\`c
#include
int main(){
    printf("hello world");
}
\`\`\`
\`code\`
\`code\`

return

return
`,

            created_at: new Date(),
            updated_at: new Date(),
            tags: ["tag1"]
        }
    }
};

export const OneLine: Story = {
    args: {
        memo: {
            id: 1,
            text: `#Next.js
最近は\`Next.js\`の\`AppRouter\`を勉強しています
`,

            created_at: new Date(),
            updated_at: new Date(),
            tags: ["tag1"]
        }
    }
};
