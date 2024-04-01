import { z } from "zod";

export const MemoStructSchema = z.object({
    id: z.number(),
    content: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    tags: z.string().array()
}) satisfies z.ZodType<MemoStruct>;

type MemoStruct = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    tags: string[];
};

export function isMemoStruct(obj: unknown): obj is MemoStruct {
    return MemoStructSchema.safeParse(obj).success;
}

const MemoSchema = z.object({
    id: z.number(),
    text: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    tags: z.string().array()
}) satisfies z.ZodType<Memo>;

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
    return MemoSchema.safeParse(obj).success;
}
