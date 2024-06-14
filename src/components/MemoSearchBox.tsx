import type { FC } from "react";
import type React from "react";

import { Input } from "react-daisyui";

type Props = {
    searchTags: string[];
    setSearchTags: (tags: string[]) => void;
    className: string;
};

// eslint-disable-next-line react/display-name
export const MemoSearchBox: FC<Props> = ({
    searchTags,
    setSearchTags,
    className,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value;
        if (tags === "") setSearchTags([]);
        else setSearchTags(tags.split(" "));
    };

    return (
        <Input
            className={`w-full ${className}`}
            value={searchTags.join(" ")}
            onChange={handleChange}
        />
    );
};
