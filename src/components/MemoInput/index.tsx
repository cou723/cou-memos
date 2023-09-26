import React, { FC, useCallback } from "react";
import { Button, Textarea } from "react-daisyui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertIndent } from "@/lib/editor";
import { useMemoText } from "@/hooks/useMemoText";
import { useNotification } from "@/hooks/useMemoList";
import { useSaveMemo } from "./saveMemo";

type Props = {
    id?: number;
};

export const MemoInput: FC<Props> = React.memo(({ id }) => {
    const queryClient = useQueryClient();
    const [text, setText] = useMemoText();
    const { pushErrorNotification } = useNotification();
    const saveMemo = useSaveMemo();

    const mutation = useMutation<void, Error, { text: string; id: number | undefined }>(
        async (params) => saveMemo(params),
        {
            onSuccess: () => queryClient.invalidateQueries(["memos"])
        }
    );

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
                const result = insertIndent(text, setText, event);
                if (result.err) pushErrorNotification("インサートに失敗しました");
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
