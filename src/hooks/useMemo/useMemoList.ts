import { useQuery } from "@tanstack/react-query";

import type { Memo } from "@/types/memo";
import type { SearchQuery } from "@/types/searchQuery";

import { useNotification } from "@/hooks/useNotification";
import { getMemoList } from "@/lib/memoDb";

export function useMemoList(searchTags: SearchQuery) {
    const { pushErrorNotification } = useNotification();
    return useQuery<Memo[], Error>({
        queryKey: ["memo", ...searchTags],
        queryFn: async () => await getMemoList(searchTags),
        onError: (error: Error) => {
            let message = "メモ一覧の取得に失敗しました。";
            if (error.message === "DbNotFound") {
                message += "データベースファイルへのアクセスに失敗しました。";
            }
            message += `(${error.message})`;
            pushErrorNotification(message);
        },
    });
}
