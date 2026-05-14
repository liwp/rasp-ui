import React from "react";
import { createRoot } from "react-dom/client";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";

import App from "./App";
import { unregister } from "./registerServiceWorker";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <QueryParamProvider adapter={WindowHistoryAdapter}>
    <App />
  </QueryParamProvider>,
);
unregister();
