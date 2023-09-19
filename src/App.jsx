import { Route, Routes, useNavigate } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";
import VerifyEmployes from "./pages/VerifyEmployes";

import { useReadLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";
import Produccion from "./pages/Produccion";

export default function App() {
  const navegate = useNavigate();

  const key = useReadLocalStorage("key");

  useEffect(() => {
    if (key != "digrutt2322") navegate("/verifyEmployes");
  }, [key]);

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
      <Route
        path="/produccion"
        element={
            <Produccion />
        }
      />
      <Route path="/verifyEmployes" element={<VerifyEmployes />} />
    </Routes>
  );
}