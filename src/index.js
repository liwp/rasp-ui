import React from "react";
import ReactDOM from "react-dom";
import { QueryParamProvider } from "use-query-params";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <QueryParamProvider>
    <App />
  </QueryParamProvider>,
  document.getElementById("root")
);
registerServiceWorker();
