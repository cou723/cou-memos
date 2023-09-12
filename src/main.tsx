import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ConfigProvider } from "@blackbox-vision/react-use-config";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

const config = {
    output_path: "~/tauri-app"
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider config={config} debug={true}>
                <App />
            </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
