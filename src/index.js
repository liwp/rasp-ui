import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { QueryParamProvider } from "use-query-params";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// TODO: stick ID and debug flag in an .env file?
const trackingId = "UA-168680303-1";
ReactGA.initialize(trackingId, { debug: false });
ReactGA.pageview("/");

ReactDOM.render(
  <QueryParamProvider>
    <App />
  </QueryParamProvider>,
  document.getElementById("root")
);
registerServiceWorker();
