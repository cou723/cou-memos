import { useEffect, useState } from "react";
import { MemoDB } from "@/lib/memo";
import { useNotification } from "./useNotification";

export function useMemoText(id?: number): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [text, setText] = useState("");
    const { pushErrorNotification } = useNotification();

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
