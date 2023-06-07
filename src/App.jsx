import { useState } from "react";

import "./header.css";
import logo from './assets/logo.png'

import Deposito from "./component/deposito/Deposito";
import Mercaderia from "./component/mercaderia/Mercaderia";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";

function App() {
  
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1);
    return page;
  });

  const getContent = () => {
    if (page === "deposito") return <Deposito />;
    else return (
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
            <a href="/deposito-digrutt-react/mercaderia" onClick={toPage("mercaderia")}>
              Mercaderia
            </a>
          </li>
          <li>
            <a href="/deposito-digrutt-react/deposito" onClick={toPage("deposito")}>
              Inventario
            </a>
          </li>
        </ul>
      </nav>

      <main>
        {getContent()}
      </main>
    </>
  );
}

export default App;
