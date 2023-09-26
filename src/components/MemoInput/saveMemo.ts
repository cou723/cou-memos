import { useNotification } from "@/hooks/useMemoList";
import { MemoDB } from "@/lib/memo";

export async function saveMemo({ text, id }: { text: string; id: number | undefined }) {
    const { pushErrorNotification } = useNotification();
    const result = await MemoDB.post(text, id);

    if (result.err) pushErrorNotification("メモの保存に失敗しました");
}
