import { useMutation } from "@tanstack/react-query";

import { useNotification } from "@/hooks/useNotification";
import { postMemo } from "@/lib/memoDb";
import { queryClient } from "@/lib/queryClient";

export function usePostMemo(id: number | undefined, onMutate: () => void) {
    console.log("usePostMemo", id);
    const { pushErrorNotification, pushNotification } = useNotification();

    return useMutation(
        async (text: string) => {
            await postMemo(text, id);
        },
        {
            onMutate: () => {
                if (id) pushNotification("メモを保存しています", "info");
                else pushNotification("メモを作成しています", "info");
                onMutate();
            },
            onSettled: () =>
                queryClient.invalidateQueries(["memo", id?.toString()]),
            onError: (error: Error) => {
                pushErrorNotification(
                    `メモの保存に失敗しました${error.message}`,
                );
            },
        },
    );
}
