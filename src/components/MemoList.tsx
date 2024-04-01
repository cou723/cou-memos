import type { FC } from "react";
import React from "react";

import { MemoView } from "./MemoView";

import { useMemoList } from "@/hooks/useMemoList";

type Props = {
    searchTags: string[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className: string;
};

// eslint-disable-next-line react/display-name
export const MemoList: FC<Props> = React.memo(({ searchTags, onEdit, onDelete, className }: Props) => {
    const { isLoading, isError, data: memos } = useMemoList(searchTags);
    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;
    if (memos === undefined) return <>return data is empty</>;

    return (
        <div>
            {memos?.map((memo) => (
                <div className={className} key={memo.id}>
                    <MemoView memo={memo} onEdit={onEdit} onDelete={onDelete} />
                </div>
            ))}
        </div>
    );
});
