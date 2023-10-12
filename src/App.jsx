import { Route, Routes, useNavigate } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";
import VerifyEmployes from "./pages/VerifyEmployes";

import { useReadLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";
import { OficinaProvider } from "./context/OficinaContext";

import Produccion from "./pages/Produccion";
import Oficina from "./pages/Oficina";

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
      <Route path="/logIn" element={<VerifyEmployes />} />
      <Route path="/signIn" element={<h1>SIGN IN - Registrarse</h1>} />
    </Routes>
  );
}
