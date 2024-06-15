import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Memo } from "@/types/memo";

import { useNotification } from "@/hooks/useNotification";
import * as memoDb from "@/lib/memoDb";

export function useMemoText(
    id?: number,
): [string, React.Dispatch<React.SetStateAction<string>>] {
    const { pushErrorNotification } = useNotification();
    const queryResult = useQuery<Memo, Error>(
        ["memo", id?.toString()],
        async () => {
            if (!id) throw new Error("Memo ID is undefined");
            return await memoDb.getMemo(id);
        },
        {
            enabled: !!id,
            onError: (error: Error) =>
                pushErrorNotification(`メモの取得に失しました${error.message}`),
        },
    );

    const [text, setText] = useState("");

    useEffect(() => {
        setText(queryResult?.data ? queryResult.data.text : "");
    }, [queryResult.data]);

    return [text, setText];
}
