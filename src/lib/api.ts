import { invoke } from "@tauri-apps/api";
import { Ok, Err, Result } from "ts-results";
import { Memo, isMemoStruct } from "./memo";

export class api {
    static async edit_memo(text: string, id: number): Promise<Result<void, Error>> {
        try {
            await invoke("edit_memo", { text, id });
            return Ok.EMPTY;
        } catch (e) {
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async add_memo(text: string): Promise<Result<void, Error>> {
        try {
            await invoke("add_memo", { text });
            return Ok.EMPTY;
        } catch (e) {
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async delete_memo(id: number): Promise<Result<void, Error>> {
        try {
            await invoke("delete_memo", { id });
            return Ok.EMPTY;
        } catch (e) {
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async get_memo(id: number): Promise<Result<Memo, Error>> {
        try {
            const result = await invoke("get_memo", { id });
            if (isMemoStruct(result)) return Ok(new Memo(result));
            else return Err(new Error("get_memoからMemo以外の値が返されました"));
        } catch (e) {
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async get_memo_list() {
        try {
            const result = await invoke("get_memo_list");
            if (typeof result === "object" && result instanceof Array && result.every(isMemoStruct))
                return Ok(result.map((memo) => new Memo(memo)));
            else return Err(new Error("get_memo_listからMemo[]以外の値が返されました"));
        } catch (e) {
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }
}
