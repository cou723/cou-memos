import type { Memo as MemoArg } from "../bindings";

export class Memo {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
    tags: string[] = [];

    constructor(memo: MemoArg) {
        this.id = memo.id;
        this.text = memo.content;
        this.created_at = new Date(memo.created_at);
        this.updated_at = new Date(memo.updated_at);
        this.tags = memo.tags.map((t) => t.content);
    }
}
