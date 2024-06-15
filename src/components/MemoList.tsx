import type { FC } from "react";

import { MemoView } from "./MemoView";

import { useMemoList } from "@/hooks/useMemo/useMemoList";
import { compareDesc } from "date-fns";

type Props = {
    searchTags: string[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className: string;
};

export const MemoList: FC<Props> = ({
    searchTags,
    onEdit,
    onDelete,
    className,
}: Props) => {
    const { isLoading, isError, data: memos } = useMemoList(searchTags);
    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;
    if (memos === undefined) return <>return data is empty</>;

    return (
        <div>
            {memos
                ?.sort((a, b) => compareDesc(a.createdAt, b.createdAt))
                .map((memo) => (
                    <div className={className} key={memo.id}>
                        <MemoView
                            memo={memo}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
        </div>
    );
};
