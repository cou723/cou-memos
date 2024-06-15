import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-daisyui";
import { HiAdjustments } from "react-icons/hi";

import { MemoInput } from "../components/MemoInput";
import { MemoList } from "../components/MemoList";

import { MemoSearchBox } from "@/components/MemoSearchBox";
import { useDeleteMemo } from "@/hooks/useMemo/useDeleteMemo";

export const IndexPage: FC = () => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [searchTags, setSearchQuery] = useState<string[]>([]);
    const { deleteMemo } = useDeleteMemo();

    const nav = useNavigate();

    return (
        <div className="w-3/4 m-auto mt-10">
            <Button
                onClick={() => nav("/settings")}
                shape="circle"
                className="px-3 fixed top-3 left-3"
                variant="outline"
            >
                <HiAdjustments className="text-xl" />
            </Button>
            <MemoInput id={id} handleSave={() => setId(undefined)} />
            <MemoSearchBox
                searchTags={searchTags}
                setSearchTags={setSearchQuery}
                className="mt-3"
            />
            <MemoList
                searchTags={searchTags}
                className="mt-3"
                onEdit={(id) => setId(id)}
                onDelete={deleteMemo}
            />
        </div>
    );
};
