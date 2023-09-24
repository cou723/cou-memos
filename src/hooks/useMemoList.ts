import { MemoDB } from "@/lib/memo";
import { NotificationStack, NotificationType } from "@/providers/NotificationProvider";
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

export const pushNotification = (message: string, type: NotificationType) => {
    const { dispatch } = useContext(NotificationStack);
    dispatch({ type: "push", notification: { type, message } });
};

export const pushErrorNotification = (message: string) => {
    const { dispatch } = useContext(NotificationStack);
    dispatch({ type: "push", notification: { type: "error", message } });
};

export const closeNotification = (index: number) => {
    const { dispatch } = useContext(NotificationStack);
    dispatch({ type: "close", index });
};

export function useMemoList() {
    const { dispatch } = useContext(NotificationStack);
    return useQuery({
        queryKey: ["memos"],
        queryFn: fetchMemos,
        onError: (error: string) => {
            dispatch({ type: "push", notification: { type: "error", message: error } });
        }
    });
}
