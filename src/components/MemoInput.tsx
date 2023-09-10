import React, { useCallback, useState } from "react"
import { Button, Stack, Textarea } from 'react-daisyui'
import { MemoDB } from "../lib/memo";

export const MemoInput = React.memo(() => {
    const [text, setText] = useState("");

    const handleKeyDown = useCallback((event: { ctrlKey: any; key: string; }) => {
        if (event.ctrlKey && event.key === "Enter")
            onSave();
    }, []);

    const handleChange = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    }, []);

    const onSave = useCallback(async () => {
        MemoDB.add(text);
        setText("");
    }, [])

    return (
        <div >
            <Textarea className="block" value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
            <div className="flex justify-end">
                <Button size="sm" className="mt-2" onClick={onSave}>保存</Button>
            </div>
        </div>
    )
})