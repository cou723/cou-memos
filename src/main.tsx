import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ConfigProvider } from '@blackbox-vision/react-use-config';

const config = {
  output_path: "~/tauri-app",
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider config={config} debug={true}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
