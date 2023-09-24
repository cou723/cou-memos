import React from "react";
import { Tag } from "./Tag";
import { splitTags } from "@/lib/extractTag";

function isTag(text: string): boolean {
    return text.startsWith("#");
}

export const PWithTag = React.memo(({ text }: { text: string }) => {
    const elements: JSX.Element[] = [];

    const strings = splitTags(text);

    for (const [index, string] of strings.entries()) {
        if (isTag(string)) elements.push(<Tag text={string} key={index} />);
        else {
            if (elements.slice(-1).length != 0 && elements.slice(-1)[0].type == "p")
                elements[elements.length - 1] = (
                    <>
                        {elements.slice(-1)[0].props.children} {string}
                    </>
                );
            else elements.push(<>{string}</>);
        }
    }

    console.log(elements);

    return <>{elements.map((element) => element)}</>;
});
