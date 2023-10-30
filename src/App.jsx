import { Route, Routes } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";

import { useContext } from "react";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";
import { OficinaProvider } from "./context/OficinaContext";

import Produccion from "./pages/Produccion";
import Oficina from "./pages/Oficina";
import LogIn from "./pages/LogIn";

import SignUp from "./pages/SignUp";
import SendEmail from "./pages/SendEmail";
import WaitValidation from "./pages/WaitForValidation";
import { UserContext } from "./context/UserContext";
import ForgotPassword from "./pages/ForgotPassword";
import NotHavePermission from "./pages/NotHavePermission";

export default function App() {
  const {
    userSupabase,
    isAdmin,
    isMercaderia,
    isOficina,
    isProduccion,
    isMatriceria,
  } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAdmin || isMercaderia || isOficina ? (
            <MercaderiaContextProvider>
              <Mercaderia />
            </MercaderiaContextProvider>
          ) : (
            <NotHavePermission />
          )
        }
      />
      <Route
        path="/inventario"
        element={
          isAdmin || isMercaderia || isOficina ? (
            <InventarioContextProvider>
              <Inventario />
            </InventarioContextProvider>
          ) : (
            <NotHavePermission />
          )
        }
      />
      <Route path="/produccion" element={<Produccion />} />
      <Route
        path="/oficina"
        element={
          isAdmin || isOficina ? (
            <OficinaProvider>
              <Oficina />
            </OficinaProvider>
          ) : (
            <NotHavePermission />
          )
        }
      />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/sendGmail" element={<SendEmail />} />
      <Route path="/notVerificed" element={<WaitValidation />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
}
