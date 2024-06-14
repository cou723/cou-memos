import type { FC } from "react";
import React from "react";

import { Badge } from "react-daisyui";

type Props = { text: string };

export const Tag: FC<Props> = React.memo(({ text }) => {
    return (
        <Badge color="neutral" className="mr-2 block">
            {text}
        </Badge>
    );
});
