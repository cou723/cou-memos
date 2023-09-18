import { invoke } from "@tauri-apps/api";
import { Ok, Err, Result } from "ts-results";
import { Memo, isMemoStruct } from "./memo";

export class api {
    static async edit_memo(text: string, id: number): Promise<Result<void, Error>> {
        try {
            await invoke("edit_memo", { text, id });
            return Ok.EMPTY;
        } catch (e) {
            console.error("get_memo api :", e);
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async add_memo(text: string): Promise<Result<void, Error>> {
        try {
            await invoke("add_memo", { text });
            return Ok.EMPTY;
        } catch (e) {
            console.error("add_memo api :", e);
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async delete_memo(id: number): Promise<Result<void, Error>> {
        try {
            await invoke("delete_memo", { id });
            return Ok.EMPTY;
        } catch (e) {
            console.error("delete_memo api :", e);
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
            console.error("get_memo api :", e);
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async get_memo_list() {
        try {
            const result = await invoke("get_memo_list");
            if (typeof result === "object" && result instanceof Array && result.every(isMemoStruct))
                return Ok(result.map((memo) => new Memo(memo)));
            else
                return Err(
                    new Error(`get_memo_listからMemo[]以外の値が返されました :${JSON.stringify(result, null, 2)}`)
                );
        } catch (e) {
            console.error("api :", e);
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async get_config() {
        try {
            const result = await invoke("get_config");
            if (typeof result === "object" && result !== null) return Ok(result);
            else
                return Err(new Error(`get_configからobject以外の値が返されました :${JSON.stringify(result, null, 2)}`));
        } catch (e) {
            console.error("get_config api :", e);
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }

    static async set_config(key: string, value: string) {
        console.log("call set config");
        try {
            await invoke("set_config", { key, value });
            return Ok.EMPTY;
        } catch (e) {
            console.error("set_config api :", e);
            if (e instanceof Error) return Err(e);
            else return Err(new Error("Unknown error"));
        }
    }
}
