import { useState, useEffect } from "react";
import { Memo, MemoDB } from "@/lib/memo";
import { MemoView } from "./MemoView";

type Props = {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const MemoList = ({ onEdit, onDelete }: Props) => {
    const [memos, setMemos] = useState<Memo[]>([]);
    useEffect(() => {
        (async () => {
            let getAllResult = await MemoDB.getAll();
            if (getAllResult.memos)
                setMemos(getAllResult.memos);
            else
                console.log(getAllResult.error);
        })();
    })

    return (
        <div>
            {memos.map((memo) => (
                <div key={memo.id}>
                    <MemoView memo={memo} onEdit={onEdit} onDelete={onDelete} />
                </div>
            ))}
        </div>
    )
};