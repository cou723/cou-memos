import { FC } from "react";
import { MemoView } from "./MemoView";
import { useMemoList } from "@/hooks/useMemoList";

type Props = {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className: string;
};

export const MemoList: FC<Props> = ({ onEdit, onDelete, className }: Props) => {
    const { isLoading, isError, data: memos } = useMemoList();

    return (
        <div>
            {isLoading ? (
                <div>loading...</div>
            ) : isError ? (
                <div>error...</div>
            ) : memos === undefined ? (
                <>return data is empty</>
            ) : (
                memos?.map((memo) => (
                    <div className={className} key={memo.id}>
                        <MemoView memo={memo} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                ))
            )}
        </div>
    );
};
