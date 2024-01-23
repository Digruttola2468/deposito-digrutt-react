import { Route, Routes } from "react-router-dom";

import { useContext } from "react";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { OficinaProvider } from "./context/OficinaContext";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";

import Produccion from "./pages/Produccion";
import Oficina from "./pages/Oficina";
import LogIn from "./pages/LogIn";

import SignUp from "./pages/SignUp";
import SendEmail from "./pages/SendEmail";
import WaitValidation from "./pages/WaitForValidation";
import { UserContext } from "./context/UserContext";
import ForgotPassword from "./pages/ForgotPassword";
import NotHavePermission from "./pages/NotHavePermission";
import { FacturaNegroProvider } from "./context/FacturaNegroContext";
import NotaEnvio from "./pages/NotaEnvio";
import NewMercaderiaResaltadores from "./pages/NewMercaderiaResaltadores";

export default function App() {
  const { userSupabase } = useContext(UserContext);

  console.log(userSupabase);

  if (userSupabase != null) {
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
          path="/newMercaderia"
          element={
            <MercaderiaContextProvider>
              <NewMercaderiaResaltadores />
            </MercaderiaContextProvider>
          }
        />
        <Route path="/inventario" element={<Inventario />} />
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
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/sendGmail" element={<SendEmail />} />
        <Route path="/notVerificed" element={<WaitValidation />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/facturaNegro"
          element={
            <FacturaNegroProvider>
              <NotaEnvio />
            </FacturaNegroProvider>
          }
        />
      </Routes>
    );
  } else
    return (
      <Routes>
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/sendGmail" element={<SendEmail />} />
        <Route path="/notVerificed" element={<WaitValidation />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    );
}
