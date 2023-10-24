import { Route, Routes, useNavigate } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";

import { useReadLocalStorage } from "usehooks-ts";
import { useContext, useEffect, useState } from "react";

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

export default function App() {
  const { userSupabase } = useContext(UserContext);
  const navegate = useNavigate();

  const token = useReadLocalStorage("token");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isMercaderia, setIsMercaderia] = useState(false);
  const [isOficina, setIsOficina] = useState(false);
  const [isProduccion, setIsProduccion] = useState(false);
  const [isMatriceria, setIsMatriceria] = useState(false);


  useEffect(() => {
    if (userSupabase) {
      const {
        is_admin,
        is_mercaderia,
        is_oficina,
        is_produccion,
        is_matriceria,
      } = userSupabase;
      setIsAdmin(is_admin);
      setIsMercaderia(is_mercaderia);
      setIsOficina(is_oficina);
      setIsProduccion(is_produccion);
      setIsMatriceria(is_matriceria)

      if (token) navegate("/");
      else navegate("/logIn");
    } else navegate("/logIn");
  }, [token]);

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
            <h1>NO ESTAS HABILITADO</h1>
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
            <h1>NO ESTAS HABILITADO</h1>
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
            <h1>NO ESTAS HABILITADO</h1>
          )
        }
      />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/sendGmail" element={<SendEmail />} />
      <Route path="/notVerificed" element={<WaitValidation />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
    </Routes>
  );
}
