import { createRoot } from "react-dom/client";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";

import App from "./App";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element #root not found");
}
const root = createRoot(container);
root.render(
  <QueryParamProvider adapter={WindowHistoryAdapter}>
    <App />
  </QueryParamProvider>,
);
