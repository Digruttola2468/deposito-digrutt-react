import { Route, Routes, useNavigate } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";

import { useReadLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";
import { OficinaProvider } from "./context/OficinaContext";

import Produccion from "./pages/Produccion";
import Oficina from "./pages/Oficina";
import LogIn from "./pages/LogIn";

import SignUp from "./pages/SignUp";
import SendEmail from "./pages/SendEmail";

export default function App() {
  const navegate = useNavigate();

  const token = useReadLocalStorage("token");

  useEffect(() => {
    if (token) navegate("/");
    else navegate("/logIn");
  }, [token]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MercaderiaContextProvider>
            <Mercaderia />
          </MercaderiaContextProvider>
        }
      />
      <Route
        path="/inventario"
        element={
          <InventarioContextProvider>
            <Inventario />
          </InventarioContextProvider>
        }
      />
      <Route path="/produccion" element={<Produccion />} />
      <Route
        path="/oficina"
        element={
          <OficinaProvider>
            <Oficina />
          </OficinaProvider>
        }
      />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/sendGmail" element={<SendEmail />} />
    </Routes>
  );
}
