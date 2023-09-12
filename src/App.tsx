import { useState } from "react";

import { MemoInput } from "./components/MemoInput";
import { MemoList } from "./components/MemoList";
import { MemoDB } from "./lib/memo";

function App() {
    const [id, setId] = useState<number | undefined>(undefined);

    const handleDelete = (delete_id: number) => {
        MemoDB.delete(delete_id);
    };
    return (
        <div>
            <MemoInput id={id} />
            <MemoList onEdit={(id) => setId(id)} onDelete={handleDelete} />
        </div>
    );
}

export default App;
