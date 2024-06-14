import { Err, Ok } from "ts-results";

import { isApiError } from "../types/apiError";

import type { Config } from "@/types/config";
import type { Result } from "ts-results";
import type { ApiError } from "../types/apiError";

import {
    addMemo,
    deleteMemo,
    editMemo,
    getConfig,
    getMemo,
    getMemoList,
    saveConfig,
    setConfig,
} from "@/bindings";
import { Memo } from "@/types/memo";

export async function editMemoWrapper(
    text: string,
    id: number,
): Promise<Result<void, ApiError>> {
    try {
        await editMemo(text, id);
        return Ok.EMPTY;
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}

export async function addMemoWrapper(
    text: string,
): Promise<Result<void, ApiError>> {
    try {
        await addMemo(text);
        return Ok.EMPTY;
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}

export async function deleteMemoWrapper(
    id: number,
): Promise<Result<void, ApiError>> {
    try {
        await deleteMemo(id);
        return Ok.EMPTY;
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}

export async function getMemoWrapper(
    id: number,
): Promise<Result<Memo, ApiError | "ReturnIsInvalid">> {
    try {
        const result = await getMemo(id);
        return Ok(new Memo(result));
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}

export async function getMemoListWrapper(
    searchTags: string[],
): Promise<Result<Memo[], ApiError | "ReturnIsInvalid">> {
    try {
        const data = await getMemoList(searchTags);
        return Ok(data.map((memo) => new Memo(memo)));
    } catch (e) {
        return Err(isApiError(e) ? e : `UnknownError: ${e}`);
    }
}

export async function getConfigWrapper(): Promise<Result<Config, ApiError>> {
    try {
        return Ok(await getConfig());
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}

export async function setConfigWrapper(
    key: string,
    value: string,
): Promise<Result<void, ApiError>> {
    try {
        await setConfig(key, value);
        return Ok.EMPTY;
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}

export async function saveConfigWrapper(
    config: Config,
): Promise<Result<void, ApiError>> {
    try {
        await saveConfig(config);
        return Ok.EMPTY;
    } catch (e) {
        return Err(isApiError(e) ? e : "UnknownError");
    }
}
