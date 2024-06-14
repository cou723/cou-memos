import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Memo } from "@/types/memo";

import { useNotification } from "@/hooks/useNotification";
import { MemoDB } from "@/lib/memo";

export function useMemoText(id?: number): [string, React.Dispatch<React.SetStateAction<string>>] {
    const { pushErrorNotification } = useNotification();
    const queryResult = useQuery<Memo, Error>(
        ["memo", id?.toString()],
        async () => {
            if (!id) throw new Error("Memo ID is undefined");
            return (await MemoDB.get(id)).unwrap();
        },
        {
            enabled: !!id,
            onError: (error: Error) => {
                pushErrorNotification("メモの取得に失敗しました" + error.message);
            }
        }
    );

    const [text, setText] = useState(queryResult && queryResult.data ? queryResult.data.text : "");

    return [text, setText];
}
