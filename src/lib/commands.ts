import { invoke } from "@tauri-apps/api";

export function command(command: Command): Promise<null | string> {
    if (command.cmd == "add_memo") {
        return invoke("add_memo", { text: command.text });
    }
    if (command.cmd == "edit_memo") {
        return invoke("edit_memo", { text: command.text, id: command.id });
    }
    if (command.cmd == "delete_memo") {
        return invoke("delete_memo", { id: command.id });
    }
    if (command.cmd == "get_memo") {
        return invoke("get_memo", { id: command.id })
    }
    return Promise.reject("Invalid command");
}

type Command = {
    cmd: "add_memo",
    text: string
} | {
    cmd: "edit_memo",
    text: string,
    id: number
} | {
    cmd: "delete_memo",
    id: number
} | {
    cmd: "get_memo",
    id: number
}
