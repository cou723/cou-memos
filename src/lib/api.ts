import { invoke } from "@tauri-apps/api";
import { Ok, Err, Result } from "ts-results";
import { ApiError, isApiError } from "../types/apiError";
import { Memo, isMemoStruct } from "@/types/memo";
import { Config, isConfig } from "@/types/config";

export class api {
    static async edit_memo(text: string, id: number): Promise<Result<void, ApiError>> {
        try {
            await invoke("edit_memo", { text, id });
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async add_memo(text: string): Promise<Result<void, ApiError>> {
        try {
            await invoke("add_memo", { text });
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async delete_memo(id: number): Promise<Result<void, ApiError>> {
        try {
            await invoke("delete_memo", { id });
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async get_memo(id: number): Promise<Result<Memo, ApiError | "ReturnIsInvalid">> {
        try {
            const result = await invoke("get_memo", { id });
            if (isMemoStruct(result)) return Ok(new Memo(result));
            else return Err("ReturnIsInvalid");
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async get_memo_list(searchQuery: string[]): Promise<Result<Memo[], ApiError | "ReturnIsInvalid">> {
        try {
            const result = await invoke("get_memo_list", { searchQuery });
            if (typeof result === "object" && result instanceof Array && result.every(isMemoStruct))
                return Ok(result.map((memo) => new Memo(memo)));
            else return Err("ReturnIsInvalid");
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError: " + e);
        }
    }

    static async get_config(): Promise<Result<Config, ApiError>> {
        try {
            const result = await invoke("get_config");
            if (isConfig(result)) return Ok(result);
            else return Err("ReturnIsInvalid");
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async set_config(key: string, value: string): Promise<Result<void, ApiError>> {
        try {
            await invoke("set_config", { key, value });
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async save_config(config: Config): Promise<Result<void, ApiError>> {
        try {
            await invoke("save_config", { config });
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }
}
