import { useMutation } from "@tanstack/react-query";

import { useNotification } from "@/hooks/useNotification";
import * as memoDb from "@/lib/memoDb";
import { queryClient } from "@/lib/queryClient";

export function useDeleteMemo() {
    const { pushErrorNotification } = useNotification();

    const mutation = useMutation<void, Error, { id: number }>(
        async ({ id }: { id: number }) => {
            await memoDb.deleteMemo(id);
        },
        {
            onSettled: async () => {
                await queryClient.invalidateQueries(["memo"]);
            },
            onError: () => pushErrorNotification("メモの削除に失敗しました"),
        },
    );

    return { deleteMemo: (id: number) => mutation.mutate({ id }) };
}
