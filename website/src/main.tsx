import "./index.css";

import React, { Suspense, lazy } from "react";

import Background from "@mono/pages/src/views/landing/components/background.tsx";
import ReactDOM from "react-dom/client";

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Background />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
