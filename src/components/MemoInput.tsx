import React, { useState } from "react"
import { Button, Textarea } from 'react-daisyui'
import { MemoDB } from "../lib/memo";

export const MemoInput = React.memo(() => {
    const [text, setText] = useState("");

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    };

    const onSave = async () => {
        MemoDB.add(text);
        setText("");
    }

    return (
        <div>
            <Textarea value={text} onChange={handleChange} />
            <Button onClick={onSave}>保存</Button>
        </div>
    )
})