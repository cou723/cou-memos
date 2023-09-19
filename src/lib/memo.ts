import { Result } from "ts-results";
import { api } from "./api";

export type MemoStruct = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    tags: string[];
};

export function isMemoStruct(obj: any): obj is MemoStruct {
    return (
        typeof obj === "object" &&
        "id" in obj &&
        "content" in obj &&
        "created_at" in obj &&
        "updated_at" in obj &&
        typeof obj.id === "number" &&
        typeof obj.content === "string" &&
        typeof obj.created_at === "string" &&
        typeof obj.updated_at === "string"
    );
}

export class Memo {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
    tags: string[] = [];

    constructor(memo: MemoStruct) {
        this.id = memo.id;
        this.text = memo.content;
        this.created_at = new Date(memo.created_at);
        this.updated_at = new Date(memo.updated_at);
        this.tags = memo.tags;
    }
}
export function isMemo(obj: any): obj is Memo {
    return (
        typeof obj === "object" &&
        "id" in obj &&
        "text" in obj &&
        "created_at" in obj &&
        "updated_at" in obj &&
        typeof obj.id === "number" &&
        typeof obj.text === "string" &&
        obj.created_at instanceof Date &&
        obj.updated_at instanceof Date
    );
}

export class MemoDB {
    static async post(text: string, id?: number): Promise<Result<void, Error>> {
        if (id === undefined) return await api.add_memo(text);
        return await api.edit_memo(text, id);
    }

    static async delete(id: number): Promise<Result<void, Error>> {
        return await api.delete_memo(id);
    }

    static async get(id: number): Promise<Result<Memo, Error>> {
        return await api.get_memo(id);
    }

    static async getAll(): Promise<Result<Memo[], Error>> {
        return await api.get_memo_list();
    }
}
