import { useMutation } from "@tanstack/react-query";

import * as memoDb from "@/lib/memoDb";
import { queryClient } from "@/lib/queryClient";
import toast from "react-hot-toast";

export function useDeleteMemo() {
    const mutation = useMutation<void, Error, { id: number }>(
        async ({ id }: { id: number }) => {
            await memoDb.deleteMemo(id);
        },
        {
            onSettled: async () => {
                await queryClient.invalidateQueries(["memo"]);
            },
            onError: () => toast.error("メモの削除に失敗しました"),
        },
    );

    return { deleteMemo: (id: number) => mutation.mutate({ id }) };
}
