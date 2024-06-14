import { useQuery } from "@tanstack/react-query";

import type { Memo } from "@/types/memo";
import type { SearchQuery } from "@/types/searchQuery";

import { useNotification } from "@/hooks/useNotification";
import { MemoDB } from "@/lib/memo";

const fetchMemos = async (searchTags: SearchQuery): Promise<Memo[]> => {
    const getAllResult = await MemoDB.getAll(searchTags);
    if (getAllResult.ok) return getAllResult.val.reverse();

    let message = "メモ一覧の取得に失敗しました。";
    if (getAllResult.val == "DbNotFound") {
        message += "データベースファイルへのアクセスに失敗しました。";
    }
    message += `(${getAllResult.val})`;
    throw new Error(message);
};

export function useMemoList(searchTags: SearchQuery) {
    const { pushErrorNotification } = useNotification();
    return useQuery<Memo[], Error>({
        queryKey: ["memos", ...searchTags],
        queryFn: () => fetchMemos(searchTags),
        onError: (error: Error) => {
            pushErrorNotification(error.message);
        }
    });
}
