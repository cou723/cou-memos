import { Result } from "ts-results";
import { api } from "./api";
import { ApiError } from "@/types/apiError";
import { Memo } from "@/types/memo";

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

    static async getAll(): Promise<Result<Memo[], ApiError>> {
        return await api.get_memo_list();
    }
}
