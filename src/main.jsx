import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { inject } from "@vercel/analytics";
import "./styles.css";
import "./styles/motion.css";

// Track the live portfolio only; local previews and other hosts stay untracked.
// Enable Web Analytics in the Vercel project before deploying this integration.
if (
  import.meta.env.PROD &&
  ["mscodee.com", "www.mscodee.com"].includes(window.location.hostname)
) {
  inject({
    mode: "production",
    beforeSend(event) {
      const url = new URL(event.url);
      url.search = "";
      url.hash = "";
      return { ...event, url: url.toString() };
    },
  });
}

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
