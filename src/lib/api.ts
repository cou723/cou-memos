import { Ok, Err } from "ts-results";

import { isApiError } from "../types/apiError";

import type { ApiError } from "../types/apiError";
import type { Config } from "@/types/config";
import type { Result } from "ts-results";

import { addMemo, deleteMemo, editMemo, getConfig, getMemo, getMemoList, saveConfig, setConfig } from "@/bindings";
import { Memo } from "@/types/memo";

export class api {
    static async edit_memo(text: string, id: number): Promise<Result<void, ApiError>> {
        try {
            await editMemo(text, id);
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async add_memo(text: string): Promise<Result<void, ApiError>> {
        try {
            await addMemo(text);
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async delete_memo(id: number): Promise<Result<void, ApiError>> {
        try {
            await deleteMemo(id);
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async get_memo(id: number): Promise<Result<Memo, ApiError | "ReturnIsInvalid">> {
        try {
            const result = await getMemo(id);
            return Ok(new Memo(result));
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async get_memo_list(searchTags: string[]): Promise<Result<Memo[], ApiError | "ReturnIsInvalid">> {
        try {
            const data = await getMemoList(searchTags);
            return Ok(data.map((memo) => new Memo(memo)));
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError: " + e);
        }
    }

    static async get_config(): Promise<Result<Config, ApiError>> {
        try {
            return Ok(await getConfig());
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async set_config(key: string, value: string): Promise<Result<void, ApiError>> {
        try {
            await setConfig(key, value);
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }

    static async save_config(config: Config): Promise<Result<void, ApiError>> {
        try {
            await saveConfig(config);
            return Ok.EMPTY;
        } catch (e) {
            return Err(isApiError(e) ? e : "UnknownError");
        }
    }
}
