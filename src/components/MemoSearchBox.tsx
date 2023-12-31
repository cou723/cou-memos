import React, { FC } from "react";
import { Input } from "react-daisyui";

type Props = {
    searchTags: string[];
    setSearchTags: (tags: string[]) => void;
    className: string;
};

export const MemoSearchBox: FC<Props> = React.memo(({ searchTags, setSearchTags, className }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value;
        if (tags == "") setSearchTags([]);
        else setSearchTags(tags.split(" "));
    };

    return <Input className={`w-full ${className}`} value={searchTags.join(" ")} onChange={handleChange} />;
});
