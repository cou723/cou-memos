import { invoke } from "@tauri-apps/api";
import { Result } from "./result";

type Error = { error: string }

export class MemoDB {
    static async addMemo(text: string): Promise<Result<void, Error>> {
        try { await invoke("add_memo", { text }) }
        catch { return { error: "failed" } }
    }

    static async editMemo(text: string, id: number): Promise<Result<void, Error>> {
        try { await invoke("edit_memo", { text, id }) }
        catch { return { error: "failed" } }
    }

    static async deleteMemo(id: number): Promise<Result<void, Error>> {
        try { await invoke("delete_memo", { id }) }
        catch { return { error: "failed" } }
    }

    static async getMemo(id: number): Promise<Result<{ text: string }, Error>> {
        try { return { text: await invoke("get_memo", { id }) as string } }
        catch { return { error: `Memo:(${id}) not found` } }
    }
}
