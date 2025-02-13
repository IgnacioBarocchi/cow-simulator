import "./index.css";

import App from "./App.tsx";
import { AppProvider } from "./containers/context/AppContext.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import ExperimentalApp from "./ExperimentalApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <ExperimentalApp />
    </AppProvider>
  </React.StrictMode>
);
