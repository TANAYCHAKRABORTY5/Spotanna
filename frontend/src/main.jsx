// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
  /* </StrictMode> */
);
