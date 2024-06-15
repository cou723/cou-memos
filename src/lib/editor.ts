import { type Result, err, ok } from "neverthrow";
import type React from "react";

export function insertIndent(
    text: string,
    setText: (value: React.SetStateAction<string>) => void,
    event: React.KeyboardEvent,
): Result<null, Error> {
    const start = getStartLine(event);
    if (start.isErr()) return err(start.error);

    setText(`${text.slice(0, start.value)}    ${text.slice(start.value)}`);
    return ok(null);
}

function getStartLine(event: React.KeyboardEvent): Result<number, Error> {
    if (event.target instanceof HTMLTextAreaElement) {
        const target = event.target;
        const start = target.selectionStart;
        return ok(start);
    }
    return err(new Error("event.target is not HTMLTextAreaElement"));
}
