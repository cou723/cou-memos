import React, { useCallback, useEffect, useState } from "react";
import { Button, Textarea } from "react-daisyui";
import { Memo, MemoDB } from "@/lib/memo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    id?: number;
};

export const MemoInput = React.memo(({ id }: Props) => {
    const queryClient = useQueryClient();
    const [text, setText] = useState("");

    const mutation = useMutation<void, Error, { text: string; id: number | undefined }>(
        // 'memo'というquery keyを持つデータを再取得します
        async ({ text, id }: { text: string; id: number | undefined }) => {
            const result = await MemoDB.post(text, id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["memos"]);
            }
        }
    );

    useEffect(() => {
        if (id === undefined) return;
        (async () => {
            let getOneResult = await MemoDB.get(id);
            setText(getOneResult.unwrap().text);
        })();
    }, [id]);

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setText(event.target.value);
    };

    const onSave = async () => {
        mutation.mutate({ text, id });
        setText("");
    };

    const insertIndent = useCallback(() => {}, []);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.ctrlKey && event.key === "Enter") onSave();
            if (event.key === "Tab") {
                event.preventDefault();
                const start = event.target.selectionStart;
                setText(text.slice(0, start) + "    " + text.slice(start));
            }
        },
        [onSave]
    );

    return (
        <div>
            <Textarea
                className="block w-full leading-none h-40"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <div className="flex justify-end">
                <Button size="sm" className="mt-2" onClick={onSave}>
                    保存
                </Button>
            </div>
        </div>
    );
});
