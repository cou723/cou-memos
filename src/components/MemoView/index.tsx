import { Card } from "react-daisyui";
import { Actions } from "./Actions";
import { MarkdownView } from "./MarkdownView";
import { Memo } from "@/types/memo";
import { FC } from "react";

type Props = {
    memo: Memo;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export const MemoView: FC<Props> = ({ memo, onEdit, onDelete }: Props) => {
    const handleEdit = () => onEdit(memo.id);
    const handleDelete = () => onDelete(memo.id);

    return (
        <>
            <Card>
                <Card.Body className="p-3">
                    <MarkdownView text={memo.text} />
                    <Actions handleDelete={handleDelete} handleEdit={handleEdit} memo={memo} />
                </Card.Body>
            </Card>
        </>
    );
};
