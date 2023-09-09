import React from "react"
import { Button, Textarea } from 'react-daisyui'

export const MemoInput = React.memo(() => {

    return (
        <div>
            <Textarea />
            <Button>保存</Button>
        </div>
    )
})