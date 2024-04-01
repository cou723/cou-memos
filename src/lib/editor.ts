import type React from "react";

import { Err, Ok } from "ts-results";

import type { Result } from "ts-results";

export function insertIndent(
    text: string,
    setText: (value: React.SetStateAction<string>) => void,
    event: React.KeyboardEvent
): Result<null, Error> {
    const start = getStartLine(event);
    if (start.err) return start;

    setText(text.slice(0, start.val) + "    " + text.slice(start.val));
    return Ok(null);
}

function getStartLine(event: React.KeyboardEvent): Result<number, Error> {
    if (event.target instanceof HTMLTextAreaElement) {
        const target = event.target;
        const start = target.selectionStart;
        return Ok(start);
    } else {
        return Err(new Error("event.target is not HTMLTextAreaElement"));
    }
}
