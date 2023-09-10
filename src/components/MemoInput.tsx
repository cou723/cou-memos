import React, { useCallback, useEffect, useState } from "react"
import { Button, Textarea } from 'react-daisyui'
import { MemoDB } from "@/lib/memo";

type Props = {
    id?: number;
}

export const MemoInput = React.memo(({ id }: Props) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (id === undefined) return;
        (async () => {
            let getOneResult = await MemoDB.get(id);
            if (getOneResult.text)
                setText(getOneResult.text);
            else {
                console.log(getOneResult.error);
                id = undefined;
            }
        })();
    }, [id])


    const handleKeyDown = useCallback((event: { ctrlKey: any; key: string; }) => {
        if (event.ctrlKey && event.key === "Enter")
            onSave();
    }, []);

    const handleChange = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    }, []);

    const onSave = useCallback(async () => {
        if (id === undefined)
            MemoDB.add(text);
        else
            MemoDB.edit(text, id);
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