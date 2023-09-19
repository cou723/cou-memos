import { useEffect, useContext, useState } from "react";
import { MemoDB } from "@/lib/memo";
import { NotificationStack } from "@/providers/NotificationProvider";

export function useMemoText(id?: number): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [text, setText] = useState("");
    const { dispatch } = useContext(NotificationStack);

    useEffect(() => {
        if (id === undefined) return;
        (async () => {
            let getOneResult = await MemoDB.get(id);
            if (getOneResult.err) {
                dispatch({ type: "push", value: { type: "error", message: "メモの取得に失敗しました" } });
                return;
            }
            setText(getOneResult.val.text);
        })();
    }, [id]);

    return [text, setText];
}
