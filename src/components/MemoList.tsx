import { MemoView } from "./MemoView";
import { useMemoList } from "@/hooks/useMemoList";

type Props = {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className: string;
};

export const MemoList = ({ onEdit, onDelete, className }: Props) => {
    const { isLoading, isError, data: memos } = useMemoList();

    return (
        <div>
            {isLoading ? (
                <div>loading...</div>
            ) : isError && memos === undefined ? (
                <div>error...</div>
            ) : (
                memos.map((memo) => (
                    <div className={className} key={memo.id}>
                        <MemoView memo={memo} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                ))
            )}
        </div>
    );
};
