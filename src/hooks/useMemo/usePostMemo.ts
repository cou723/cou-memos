import { useMutation } from "@tanstack/react-query";

import { useNotification } from "@/hooks/useNotification";
import { MemoDB } from "@/lib/memo";
import { queryClient } from "@/lib/queryClient";

export function usePostMemo(id?: number) {
    const { pushErrorNotification } = useNotification();

    return useMutation(
        async (text: string) => {
            const result = await MemoDB.post(text, id);
            if (result.err) pushErrorNotification("メモの保存に失敗しました");
        },
        {
            mutationKey: ["memo", id?.toString(), "text"],
            onSuccess: () => queryClient.invalidateQueries(["memos"])
            // onError: (error: Error) => {
            //     pushErrorNotification("メモの保存に失敗しました" + error.message);
            // }
        }
    );
}
