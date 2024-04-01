type MemoStruct = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    tags: string[];
};

export function isMemoStruct(obj: unknown): obj is MemoStruct {
    return (
        typeof obj === "object" &&
        "id" in obj &&
        "content" in obj &&
        "created_at" in obj &&
        "updated_at" in obj &&
        typeof obj.id === "number" &&
        typeof obj.content === "string" &&
        typeof obj.created_at === "string" &&
        typeof obj.updated_at === "string"
    );
}

export class Memo {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
    tags: string[] = [];

    constructor(memo: MemoStruct) {
        this.id = memo.id;
        this.text = memo.content;
        this.created_at = new Date(memo.created_at);
        this.updated_at = new Date(memo.updated_at);
        this.tags = memo.tags;
    }
}
export function isMemo(obj: unknown): obj is Memo {
    return (
        typeof obj === "object" &&
        "id" in obj &&
        "text" in obj &&
        "created_at" in obj &&
        "updated_at" in obj &&
        typeof obj.id === "number" &&
        typeof obj.text === "string" &&
        obj.created_at instanceof Date &&
        obj.updated_at instanceof Date
    );
}
