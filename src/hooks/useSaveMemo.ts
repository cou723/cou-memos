import { useNotification } from "@/hooks/useNotification";
import { MemoDB } from "@/lib/memo";

export function useSaveMemo() {
    const { pushErrorNotification } = useNotification();

    return async ({ text, id }: { text: string; id: number | undefined }) => {
        const result = await MemoDB.post(text, id);

        if (result.err) pushErrorNotification("メモの保存に失敗しました");
    };
}
