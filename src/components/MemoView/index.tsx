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

export const MemoView: FC<Props> = React.memo(
    ({ memo, onEdit, onDelete }: Props) => {
        return (
            <>
                <Card>
                    <Card.Body className="p-3">
                        <MarkdownView text={memo.text} />
                        <Actions
                            handleDelete={() => onDelete(memo.id)}
                            handleEdit={() => onEdit(memo.id)}
                            memo={memo}
                        />
                    </Card.Body>
                </Card>
            </>
        );
    },
);
