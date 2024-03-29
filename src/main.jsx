import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./normalize.css";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/UserContext.jsx";

import { InventarioContextProvider } from "./context/InventarioContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <InventarioContextProvider>
          <App />
        </InventarioContextProvider>
      </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
