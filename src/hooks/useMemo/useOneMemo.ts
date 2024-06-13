import { useNotification } from "@/hooks/useNotification";
import { MemoDB } from "@/lib/memo";
import { Memo } from "@/types/memo";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useMemo(id?: number) {
  const { pushErrorNotification } = useNotification();
  const [text, setText] = useState<string>("");

  return useQuery<Memo, Error>({
      queryKey: ["memo", id?.toString(), "text"],
      queryFn: async () => (id ? await MemoDB.get(id) : { text: "", id: 0 }),
      onError: (error: Error) => {
          pushErrorNotification("メモの取得に失敗しました" + error.message);
      }
  });
