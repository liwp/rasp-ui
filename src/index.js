import React from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga";
import { QueryParamProvider } from "use-query-params";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const gaId = process.env.REACT_APP_GA_ID; // "UA-168680303-1";
if (gaId) {
  const gaDebug = process.env.REACT_APP_GA_DEBUG === "true";
  ReactGA.initialize(gaId, { debug: gaDebug });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <QueryParamProvider>
    <App isGaEnabled={!!gaId} />
  </QueryParamProvider>
);
registerServiceWorker();
