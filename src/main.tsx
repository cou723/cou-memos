import React from "react";
import reactDom from "react-dom/client";

import App from "./App";
import "./styles.css";
import { AppProvider } from "./providers/AppProvider";

reactDom.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>,
);
