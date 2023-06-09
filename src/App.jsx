import { useState } from "react";

import "./header.css";
import logo from "./assets/logo.png";

import Inventario from "./component/inventario/Inventario";
import Mercaderia from "./component/mercaderia/Mercaderia";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";

function App() {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1);
    return page;
  });

  const getContent = () => {
    if (page === "inventario")
      return (
        <InventarioContextProvider>
          <Inventario />
        </InventarioContextProvider>
      );
    else
      return (
        <MercaderiaContextProvider>
          <Mercaderia />
        </MercaderiaContextProvider>
      );
  };

  const toPage = (page) => (evt) => {
    evt.preventDefault();
    window.history.pushState(null, "", `/${page}`);
    setPage(page);
  };

  return (
    <>
      <nav className="nav-container">
        <ul>
          <li>
            <a
              href="/mercaderia"
              onClick={toPage("mercaderia")}
            >
              Mercaderia
            </a>
          </li>
          <li>
            <a
              href="/inventario"
              onClick={toPage("inventario")}
            >
              Inventario
            </a>
          </li>
        </ul>
      </nav>

      <main>{getContent()}</main>
    </>
  );
}

export default App;
