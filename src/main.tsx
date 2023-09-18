import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { AppProvider } from "./AppProvider";
import { listen } from "@tauri-apps/api/event";
import { dialog } from "@tauri-apps/api";

async function showMessage(message: string): Promise<void> {
    await dialog.message(message);
}

listen("message", (event) => {
    console.log("listen message");
    showMessage(event.payload as string);
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);
