
import { api } from "./api";

import type { ApiError } from "@/types/apiError";
import type { Memo } from "@/types/memo";
import type { SearchQuery } from "@/types/searchQuery";
import type { Result } from "ts-results";

export class MemoDB {
    static async post(text: string, id?: number): Promise<Result<void, ApiError>> {
        if (id === undefined) return await api.add_memo(text);
        return await api.edit_memo(text, id);
    }

    static async delete(id: number): Promise<Result<void, ApiError>> {
        return await api.delete_memo(id);
    }

    static async get(id: number): Promise<Result<Memo, ApiError>> {
        return await api.get_memo(id);
    }

    static async getAll(searchQuery: SearchQuery): Promise<Result<Memo[], ApiError>> {
        return await api.get_memo_list(searchQuery);
    }
}
