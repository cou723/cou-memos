import {
    addMemo,
    deleteMemo as deleteMemoApi,
    editMemo,
    getMemo as getMemoApi,
    getMemoList as getMemoListApi,
} from "@/bindings";
import { Memo } from "@/types/memo";
import type { SearchQuery } from "@/types/searchQuery";

export async function postMemo(text: string, id?: number): Promise<null> {
    console.log("post", text, id);
    if (id === undefined) return await addMemo(text);
    return await editMemo(text, id);
}

export async function deleteMemo(id: number): Promise<null> {
    return await deleteMemoApi(id);
}

export async function getMemo(id: number): Promise<Memo> {
    return new Memo(await getMemoApi(id));
}

export async function getMemoList(searchTags: SearchQuery): Promise<Memo[]> {
    return (await getMemoListApi(searchTags)).map((m) => new Memo(m));
}
