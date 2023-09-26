import { MemoDB } from "@/lib/memo";
import { NotificationStack } from "@/providers/NotificationProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

async function fetchMemos({ queryKey }: any) {
    const [_key, searchQuery] = queryKey;
    let getAllResult = await MemoDB.getAll(searchQuery);
    if (getAllResult.ok) return getAllResult.val.reverse();
    if (getAllResult.err) {
        let message = "メモ一覧の取得に失敗しました";
        if (getAllResult.val == "DbNotFound") {
            message += "。データベースファイルへのアクセスに失敗しました。";
        }
        message += `(${getAllResult.val})`;
        throw new Error(message);
    }
}

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
