import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Textarea } from "react-daisyui";
import { MemoDB } from "@/lib/memo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertIndent } from "@/lib/editor";
import { NotificationStack } from "@/NotificationProvider";

type Props = {
    id?: number;
};

export const MemoInput = React.memo(({ id }: Props) => {
    const queryClient = useQueryClient();
    const [text, setText] = useState("");
    const { dispatch } = useContext(NotificationStack);

    const mutation = useMutation<void, Error, { text: string; id: number | undefined }>(
        async ({ text, id }: { text: string; id: number | undefined }) => {
            const result = await MemoDB.post(text, id);
            if (result.err) dispatch({ type: "push", value: { type: "error", message: "メモの保存に失敗しました" } });
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
            if (getOneResult.err) {
                dispatch({ type: "push", value: { type: "error", message: "メモの取得に失敗しました" } });
                return;
            }
            setText(getOneResult.val.text);
        })();
    }, [id]);

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setText(event.target.value);
    };

    const onSave = async () => {
        mutation.mutate({ text, id });
        setText("");
    };

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.ctrlKey && event.key === "Enter") onSave();
            if (event.key === "Tab") {
                event.preventDefault();
                insertIndent(text, setText, event);
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
