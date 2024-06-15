import type { FC } from "react";
import type React from "react";

import { Button, Textarea } from "react-daisyui";

import { useConfig } from "@/hooks/useConfigFile";
import { usePostMemo } from "@/hooks/useMemo/usePostMemo";
import { useMemoText } from "@/hooks/useMemoText";
import { insertIndent } from "@/lib/editor";
import toast from "react-hot-toast";

type Props = {
    id?: number;
    handleSave: () => void;
};

export const MemoInput: FC<Props> = ({ id, handleSave }) => {
    const [text, setText] = useMemoText(id);
    const { mutate: postMemo } = usePostMemo(id, handleSave);
    const [config] = useConfig();

    const onSave = () => {
        console.log("onSave", text, id);
        postMemo(text);
    };

    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.ctrlKey && event.key === "Enter") await onSave();
        if (event.key === "Tab") {
            event.preventDefault();
            const result = insertIndent(text, setText, event);
            if (result.isErr()) toast.error("インサートに失敗しました");
        }
    };

    return (
        <div>
            <Textarea
                className="block w-full leading-none h-40"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="flex justify-end">
                <Button
                    size="sm"
                    className={`mt-2 ${config.is_show_save_button ? "" : "hidden"}`}
                    onClick={onSave}
                >
                    保存
                </Button>
            </div>
        </div>
    );
};
