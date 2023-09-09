import { invoke } from "@tauri-apps/api";
import { Result } from "./result";

type Error = { error: string }
const ERROR = { error: "failed" }

export type MemoStruct = {
    id: number;
    text: string;
    created_at: string;
    updated_at: string;
}

export class Memo {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;

    constructor(memo: MemoStruct) {
        this.id = memo.id;
        this.text = memo.text;
        this.created_at = new Date(memo.created_at);
        this.updated_at = new Date(memo.updated_at);
    }
}

export class MemoDB {
    static async add(text: string): Promise<Result<void, Error>> {
        try { return await invoke("add_memo", { text }) }
        catch { return ERROR }
    }

    static async edit(text: string, id: number): Promise<Result<void, Error>> {
        try { return await invoke("edit_memo", { text, id }) }
        catch { return ERROR }
    }

    static async delete(id: number): Promise<Result<void, Error>> {
        try { return await invoke("delete_memo", { id }) }
        catch { return ERROR }
    }

    static async get(id: number): Promise<Result<{ text: string }, Error>> {
        try { return { text: await invoke("get_memo", { id }) as string } }
        catch { return { error: `Memo:(${id}) not found` } }
    }

    static async getAll(): Promise<Result<{ memos: Memo[] }, Error>> {
        try {
            return {
                memos: (await invoke("get_memo_list") as MemoStruct[]).map(
                    (m) => new Memo(m)
                )
            }
        }
        catch { return ERROR }
    }
}
