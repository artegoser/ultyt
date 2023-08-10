import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { getTheme } from "./components/utils.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main
        className={`${
          localStorage.getItem("theme") || getTheme()
        } text-foreground bg-background`}
      >
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
