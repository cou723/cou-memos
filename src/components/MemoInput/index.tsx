import type { FC } from "react";
import React, { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Textarea } from "react-daisyui";

import { useConfigFile } from "@/hooks/useConfigFile";
import { useMemoText } from "@/hooks/useMemoText";
import { useNotification } from "@/hooks/useNotification";
import { useSaveMemo } from "@/hooks/useSaveMemo";
import { insertIndent } from "@/lib/editor";

type Props = {
    id?: number;
};

// eslint-disable-next-line react/display-name
export const MemoInput: FC<Props> = React.memo(({ id }) => {
    const queryClient = useQueryClient();
    const [text, setText] = useMemoText(id);
    const { pushErrorNotification } = useNotification();
    const saveMemo = useSaveMemo();
    const [config] = useConfigFile();

    const mutation = useMutation<void, Error, { text: string; id: number | undefined }>(
        async (params) => saveMemo(params),
        {
            onSuccess: () => queryClient.invalidateQueries(["memos"])
        }
    );

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setText(event.target.value);
    };

    const onSave = useCallback(async () => {
        mutation.mutate({ text, id });
        setText("");
    }, [id, mutation, text, setText]);

    const handleKeyDown = useCallback(
        async (event: React.KeyboardEvent) => {
            if (event.ctrlKey && event.key === "Enter") await onSave();
            if (event.key === "Tab") {
                event.preventDefault();
                const result = insertIndent(text, setText, event);
                if (result.err) pushErrorNotification("インサートに失敗しました");
            }
        },
        [onSave, pushErrorNotification, setText, text]
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
                <Button size="sm" className={`mt-2 ${config.is_show_save_button ? "" : "hidden"}`} onClick={onSave}>
                    保存
                </Button>
            </div>
        </div>
    );
});
