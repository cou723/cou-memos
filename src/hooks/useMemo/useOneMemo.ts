import { useQuery } from "@tanstack/react-query";

import type { Memo } from "@/types/memo";

import { useNotification } from "@/hooks/useNotification";
import { MemoDB } from "@/lib/memo";

export function useOneMemo(id: number) {
    const { pushErrorNotification } = useNotification();
}
