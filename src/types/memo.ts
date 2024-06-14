import type { Memo as MemoArg } from "../bindings";

export class Memo {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[] = [];

    constructor(memo: MemoArg) {
        this.id = memo.id;
        this.text = memo.content;
        this.createdAt = new Date(memo.created_at);
        this.updatedAt = new Date(memo.updated_at);
        this.tags = memo.tags.map((t) => t.content);
    }
}
