import { all, H, Handler } from "mdast-util-to-hast";

export const handler: Handler = (h: H, node: Node) => {
    return {
        type: "element",
        tagName: "p",
        properties: {
            className: ["tag"]
        },
        children: all(h, node)
    };
};
