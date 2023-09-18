import { Memo, MemoDB } from "@/lib/memo";
import { MemoView } from "./MemoView";
import { useQuery } from "@tanstack/react-query";

type Props = {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className: string;
};

export const MemoList = ({ onEdit, onDelete, className }: Props) => {
    const {
        isLoading,
        isError,
        data: memos
    } = useQuery({
        queryKey: ["memos"],
        queryFn: async () => {
            let getAllResult = await MemoDB.getAll();
            if (getAllResult.ok) return getAllResult.val.reverse();
            else throw getAllResult.val;
        }
    });

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
