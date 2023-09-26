import React, { FC, useState } from "react";
import { MemoInput } from "../components/MemoInput";
import { MemoList } from "../components/MemoList";
import { MemoDB } from "../lib/memo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { HiAdjustments } from "react-icons/hi";
import { MemoSearchBox } from "@/components/MemoSearchBox";
import { useNotification } from "@/hooks/useMemoList";

export const IndexPage: FC<{}> = React.memo(() => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const { pushErrorNotification } = useNotification();

    const nav = useNavigate();

    const mutation = useMutation<void, Error, { id: number }>(
        async ({ id }: { id: number }) => {
            const result = await MemoDB.delete(id);
            if (result.err) pushErrorNotification("メモの削除に失敗しました");
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["memos"]);
            }
        }
    );

    const handleDelete = (delete_id: number) => mutation.mutate({ id: delete_id });

    return (
        <div className="w-3/4 m-auto mt-10">
            <Button
                onClick={() => nav("/settings")}
                shape="circle"
                className="px-3 fixed top-3 left-3"
                variant="outline"
            >
                <HiAdjustments className="text-xl" />
            </Button>
            <MemoInput id={id} />
            <MemoSearchBox searchTags={searchQuery} setSearchTags={setSearchQuery} className="mt-3" />
            <MemoList searchQuery={searchQuery} className="mt-3" onEdit={(id) => setId(id)} onDelete={handleDelete} />
        </div>
    );
});
