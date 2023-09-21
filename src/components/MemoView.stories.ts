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
            text: `#tag1 text
# heading1
## heading 2
### heading 3
- list1
- list2
- list3
\`\`\`
code
\`\`\`
\`\`\`c
#include
int main(){
    printf("hello world");
}
\`\`\``,
            created_at: new Date(),
            updated_at: new Date(),
            tags: ["tag1"]
        }
    }
};
