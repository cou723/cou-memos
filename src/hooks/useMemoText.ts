import { useEffect, useState } from "react";
import { MemoDB } from "@/lib/memo";
import { pushErrorNotification } from "./useMemoList";

export function useMemoText(id?: number): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [text, setText] = useState("");
    useEffect(() => {
        if (id === undefined) return;
        (async () => {
            let getOneResult = await MemoDB.get(id);
            if (getOneResult.err) {
                pushErrorNotification("メモの取得に失敗しました");
                return;
            }
            setText(getOneResult.val.text);
        })();
    }, [id]);

    return [text, setText];
}
