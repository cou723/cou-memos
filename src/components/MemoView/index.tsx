import type { FC } from "react";
import React from "react";

import { Card } from "react-daisyui";

import { Actions } from "./Actions";
import { MarkdownView } from "./MarkdownView";

import type { Memo } from "@/types/memo";

type Props = {
    memo: Memo;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

// eslint-disable-next-line react/display-name
export const MemoView: FC<Props> = React.memo(
    ({ memo, onEdit, onDelete }: Props) => {
        const handleEdit = () => onEdit(memo.id);
        const handleDelete = () => onDelete(memo.id);

        return (
            <>
                <Card>
                    <Card.Body className="p-3">
                        <MarkdownView text={memo.text} />
                        <Actions
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            memo={memo}
                        />
                    </Card.Body>
                </Card>
            </>
        );
    },
);
