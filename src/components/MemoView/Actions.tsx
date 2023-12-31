import { Memo } from "@/types/memo";
import React, { FC } from "react";
import { Card, Join, Button } from "react-daisyui";
import { HiTrash, HiPencilAlt } from "react-icons/hi";

type Props = {
    memo: Memo;
    handleDelete: () => void;
    handleEdit: () => void;
};

export const Actions: FC<Props> = React.memo(({ memo, handleDelete, handleEdit }: Props) => {
    return (
        <Card.Actions className="justify-between items-end">
            <span className="align-text-bottom h-full">{memo.updated_at.toISOString()}</span>
            <Join>
                <Button onClick={handleDelete} className="join-item px-3">
                    <HiTrash className="text-xl" />
                </Button>
                <Button onClick={handleEdit} className="join-item px-3">
                    <HiPencilAlt className="text-xl" />
                </Button>
            </Join>
        </Card.Actions>
    );
});
