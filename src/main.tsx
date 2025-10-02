import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppContextProvider from "./lib/context.tsx";
import "./lib/language.ts";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
