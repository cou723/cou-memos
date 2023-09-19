import { MemoDB } from "@/lib/memo";
import { useQuery } from "@tanstack/react-query";

export function useMemoList() {
    return useQuery({
        queryKey: ["memos"],
        queryFn: async () => {
            let getAllResult = await MemoDB.getAll();
            if (getAllResult.ok) return getAllResult.val.reverse();
            else throw getAllResult.val;
        }
    });
}
