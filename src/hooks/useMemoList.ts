import { MemoDB } from "@/lib/memo";
import { NotificationStack } from "@/providers/NotificationProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

async function fetchMemos() {
    let getAllResult = await MemoDB.getAll();
    if (getAllResult.ok) return getAllResult.val.reverse();
    if (getAllResult.err) {
        let message = "メモ一覧の取得に失敗しました";
        if (getAllResult.val == "DbNotFound") {
            message += "。データベースファイルへのアクセスに失敗しました。";
        }
        throw new Error(message);
    }
}

export function useMemoList() {
    const { dispatch } = useContext(NotificationStack);
    return useQuery({
        queryKey: ["memos"],
        queryFn: fetchMemos,
        onError: (error: string) => {
            dispatch({ type: "push", value: { type: "error", message: error } });
        }
    });
}
