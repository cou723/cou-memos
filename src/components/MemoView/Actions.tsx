import type { FC } from "react";
import React from "react";

import { Button, Card, Join } from "react-daisyui";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

import type { Memo } from "@/types/memo";

type Props = {
    memo: Memo;
    handleDelete: () => void;
    handleEdit: () => void;
};

export const Actions: FC<Props> = React.memo(
    ({ memo, handleDelete, handleEdit }: Props) => {
        return (
            <Card.Actions className="justify-between items-end">
                <span className="align-text-bottom h-full">
                    {memo.updatedAt.toISOString()}
                </span>
                <Join>
                    <Button onClick={handleDelete} className="px-3">
                        <HiTrash className="text-xl" />
                    </Button>
                    <Button onClick={handleEdit} className="px-3">
                        <HiPencilAlt className="text-xl" />
                    </Button>
                </Join>
            </Card.Actions>
        );
    },
);
