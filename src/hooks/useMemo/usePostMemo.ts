import { useMutation } from "@tanstack/react-query";

import { postMemo } from "@/lib/memoDb";
import { queryClient } from "@/lib/queryClient";
import toast from "react-hot-toast";

export function usePostMemo(id: number | undefined, onMutate: () => void) {
    console.log("usePostMemo", id);

    return useMutation(
        async (text: string) => {
            await postMemo(text, id);
        },
        {
            onMutate: () => {
                if (id) toast.success("メモを保存しています");
                else toast.success("メモを作成しています");
                onMutate();
            },
            onSettled: () =>
                queryClient.invalidateQueries(["memo", id?.toString()]),
            onError: (error: Error) => {
                toast.error(`メモの保存に失敗しました${error.message}`);
            },
        },
    );
}
