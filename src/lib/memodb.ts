import * as api from "./api";

import type { ApiError } from "@/types/apiError";
import type { Memo } from "@/types/memo";
import type { SearchQuery } from "@/types/searchQuery";
import type { Result } from "ts-results";

export async function post(
    text: string,
    id?: number,
): Promise<Result<void, ApiError>> {
    if (id === undefined) return await api.addMemoWrapper(text);
    return await api.editMemoWrapper(text, id);
}

export async function deleteApi(id: number): Promise<Result<void, ApiError>> {
    return await api.deleteMemoWrapper(id);
}

export async function get(id: number): Promise<Result<Memo, ApiError>> {
    return await api.getMemoWrapper(id);
}

export async function getAll(
    searchTags: SearchQuery,
): Promise<Result<Memo[], ApiError>> {
    return await api.getMemoListWrapper(searchTags);
}
