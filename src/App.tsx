import type { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { ConfigPage } from "./pages/ConfigPage";
import { IndexPage } from "./pages/IndexPage";

const App: FC = () => {
    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />

            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/settings" element={<ConfigPage />} />
            </Routes>
        </div>
    );
};

export default App;
