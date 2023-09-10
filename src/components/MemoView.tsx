import { Memo } from "../lib/memo";
import ReactMarkdown from 'react-markdown'

type Props = {
    memo: Memo;
}
export const MemoView = ({ memo }: Props) => {
    return (
        <>
            <ReactMarkdown>{memo.text}</ReactMarkdown>
        </>
    )
}