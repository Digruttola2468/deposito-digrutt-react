import { Route, Routes, useNavigate } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";
import VerifyEmployes from "./pages/VerifyEmployes";

import { useReadLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

import NavMenu from "./components/Menu";
import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";

function App() {
  const navegate = useNavigate();

  const key = useReadLocalStorage("key");

  useEffect(() => {
    if (key != "digrutt2468") navegate("/verifyEmployes");
  }, []);

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main >
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
          <Route path="/verifyEmployes" element={<VerifyEmployes />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
