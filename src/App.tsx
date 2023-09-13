import { useState } from "react";

import { MemoInput } from "./components/MemoInput";
import { MemoList } from "./components/MemoList";
import { MemoDB } from "./lib/memo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
    const [id, setId] = useState<number | undefined>(undefined);
    const queryClient = useQueryClient();

    const mutation = useMutation<void, Error, { id: number }>(
        async ({ id }: { id: number }) => {
            const result = await MemoDB.delete(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["memos"]);
            }
        }
    );

    const handleDelete = (delete_id: number) => mutation.mutate({ id: delete_id });

    return (
        <div className="w-3/4 m-auto mt-10">
            <MemoInput id={id} />
            <MemoList className="mt-3" onEdit={(id) => setId(id)} onDelete={handleDelete} />
        </div>
    );
}

export default App;
