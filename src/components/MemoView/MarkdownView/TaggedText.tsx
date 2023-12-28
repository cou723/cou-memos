import React, { FC } from "react";
import { Tag } from "./Tag";
import { splitTags } from "@/lib/extractTag";

function isTag(text: string): boolean {
    return text.startsWith("#");
}

type Props = { text: string };

export const TaggedText: FC<Props> = React.memo(({ text }) => {
    const elements: JSX.Element[] = [];

    const texts = splitTags(text);

    for (const [index, text] of texts.entries()) {
        if (isTag(text.text)) {
            console.log("set key:", index);
            elements.push(<Tag text={text.text} key={index} />);
        } else {
            elements.push(
                <p key={index + text.text}>
                    {text.before != null ? text.before == "\n" ? <br /> : text.before : ""}
                    {text.text}
                </p>
            );
        }
    }

    return <>{elements.map((element) => element)}</>;
});
