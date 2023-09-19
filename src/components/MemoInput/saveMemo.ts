import { MemoDB } from "@/lib/memo";

export async function saveMemo({ text, id }: { text: string; id: number | undefined }, dispatch: React.Dispatch<any>) {
    const result = await MemoDB.post(text, id);
    if (result.err) dispatch({ type: "push", value: { type: "error", message: "メモの保存に失敗しました" } });
}
