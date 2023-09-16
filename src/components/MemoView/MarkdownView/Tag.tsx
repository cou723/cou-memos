import React from "react";
import { Badge } from "react-daisyui";

export const Tag = React.memo(({ text }: { text: string }) => {
    return <Badge>{text}</Badge>;
});
