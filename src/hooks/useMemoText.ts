import { useEffect, useState } from "react";

import { useNotification } from "./useNotification";

import { MemoDB } from "@/lib/memo";

export function useMemoText(id?: number): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [text, setText] = useState("");
    const { pushErrorNotification } = useNotification();

    useEffect(() => {
        if (id === undefined) return;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
            console.log("get memo text");
            const getOneResult = await MemoDB.get(id);
            if (getOneResult.err) {
                pushErrorNotification("メモの取得に失敗しました");
                return;
            }
            setText(getOneResult.val.text);
        })();
    }, [id, pushErrorNotification]);

    return [text, setText];
}
