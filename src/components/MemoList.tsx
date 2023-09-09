import { useState, useEffect } from "react";
import { Memo, MemoDB } from "../lib/memo";
import { MemoView } from "./MemoView";

export const MemoList = () => {
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
                    <MemoView>{memo.text}</MemoView>
                </div>
            ))}
        </div>
    )
};