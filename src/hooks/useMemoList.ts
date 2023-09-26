import { MemoDB } from "@/lib/memo";
import { NotificationStack, NotificationType } from "@/providers/NotificationProvider";
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

export const useNotification = () => {
    const { dispatch } = useContext(NotificationStack);
    return {
        pushNotification: (message: string, type: NotificationType) => {
            dispatch({ type: "push", notification: { type, message } });
        },
        pushErrorNotification: (message: string) => {
            dispatch({ type: "push", notification: { type: "error", message } });
        },
        closeNotification: (index: number) => {
            dispatch({ type: "close", index });
        }
    };
};

export function useMemoList(searchQuery: string[]) {
    const { dispatch } = useContext(NotificationStack);
    return useQuery({
        queryKey: ["memos", searchQuery],
        queryFn: fetchMemos,
        onError: (error: Error) => {
            console.log(error.message);
            dispatch({ type: "push", notification: { type: "error", message: error.message } });
        }
    });
}
