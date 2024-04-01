import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import type { QueryFunction } from "@tanstack/react-query";

import { MemoDB } from "@/lib/memo";
import { NotificationStack } from "@/providers/NotificationProvider";

const fetchMemos: QueryFunction = async ({ queryKey }) => {
    const [_key, searchQuery] = queryKey;
    const getAllResult = await MemoDB.getAll(searchQuery);
    if (getAllResult.ok) return getAllResult.val.reverse();
    if (getAllResult.err) {
        let message = "メモ一覧の取得に失敗しました";
        if (getAllResult.val == "DbNotFound") {
            message += "。データベースファイルへのアクセスに失敗しました。";
        }
        message += `(${getAllResult.val})`;
        throw new Error(message);
    }
};

export function useMemoList(searchQuery: string[]) {
    const { dispatch } = useContext(NotificationStack);
    return useQuery({
        queryKey: ["memos", searchQuery],
        queryFn: fetchMemos,
        onError: (error: Error) => {
            dispatch({ type: "push", notification: { type: "error", message: error.message } });
        }
    });
}
