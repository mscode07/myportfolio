import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";
import "./styles/motion.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production pages already contain HTML; development starts with an empty root.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
