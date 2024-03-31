import React, { FC } from "react";
import { Tag } from "../Text/Tag";
import { splitTags } from "@/lib/extractTag";

function isTag(text: string): boolean {
    return text.startsWith("#");
}

type Props = { text: string };

export const TaggedParagraph: FC<Props> = React.memo(({ text }) => {
    const elements: JSX.Element[] = [];

    const texts = splitTags(text);

    for (const [index, content] of texts.entries()) {
        if (isTag(content.text)) {
            elements.push(<Tag text={content.text} key={index} />);
        } else {
            elements.push(
                <>{(content.before != null ? content.before == "\n" ? <br /> : content.before : "") + content.text}</>
            );
        }
    }

    return <p style={{}}>{elements.map((element) => element)}</p>;
});
