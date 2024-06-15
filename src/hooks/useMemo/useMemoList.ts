import { useQuery } from "@tanstack/react-query";

import type { Memo } from "@/types/memo";
import type { SearchQuery } from "@/types/searchQuery";

import { getMemoList } from "@/lib/memoDb";
import toast from "react-hot-toast";

export function useMemoList(searchTags: SearchQuery) {
    return useQuery<Memo[], Error>({
        queryKey: ["memo", ...searchTags],
        queryFn: async () => await getMemoList(searchTags),
        onError: (error: Error) => {
            let message = "メモ一覧の取得に失敗しました。";
            if (error.message === "DbNotFound") {
                message += "データベースファイルへのアクセスに失敗しました。";
            }
            message += `(${error.message})`;
            toast.error(message);
        },
    });
}
