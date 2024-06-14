import { useMutation } from "@tanstack/react-query";

import { useNotification } from "@/hooks/useNotification";
import * as memoDb from "@/lib/memodb";
import { queryClient } from "@/lib/queryClient";

export function useDeleteMemo() {
    const { pushErrorNotification } = useNotification();

    const mutation = useMutation<void, Error, { id: number }>(
        async ({ id }: { id: number }) => {
            const result = await memoDb.deleteApi(id);
            if (result.err) pushErrorNotification("メモの削除に失敗しました");
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["memos"]);
            },
        },
    );

    return { deleteMemo: (id: number) => mutation.mutate({ id }) };
}
