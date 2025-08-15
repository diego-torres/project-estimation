import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import '@patternfly/react-core/dist/styles/base.css';

const container = document.getElementById("root");
if (container) {
  ReactDOM.createRoot(container).render(<App />);
}
