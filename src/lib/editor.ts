import React from "react";
import { Err, Ok, Result } from "ts-results";

export function insertIndent(
    text: string,
    setText: (value: React.SetStateAction<string>) => void,
    event: React.KeyboardEvent
) {
    const start = getStartLine(event).unwrap();
    setText(text.slice(0, start) + "    " + text.slice(start));
}

export function isBeforeLineIndented(text: string, event: React.KeyboardEvent) {
    const start = getStartLine(event).unwrap();
    let before_line = text.slice(0, start).split("\n").pop();
    if (before_line == undefined) return false;
    console.log(before_line);
    return before_line.startsWith("    ");
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
