import { useState } from "react";

import "./header.css";

import Deposito from "./component/deposito/Deposito";
import Mercaderia from "./component/mercaderia/Mercaderia";
import Home from "./component/home/Home";

window.document.title = 'Digrutt admin';

function App() {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1);
    return page;
  });

  
  const getContent = () => {
    if (page === "deposito") return <Deposito />;
    else if (page === "mercaderia") return <Mercaderia />;
    else if (page === "precios") return <h1>Precios</h1>;
    else return <Home />;
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
            <a href="/mercaderia" onClick={toPage("mercaderia")}>
              Mercaderia
            </a>
          </li>
          <li>
            <a href="/deposito" onClick={toPage("deposito")}>
              Deposito
            </a>
          </li>
          <li>
            <a href="/precios" onClick={toPage("precios")}>
              Precios
            </a>
          </li>
          <li>
            <a href="/" onClick={toPage("")}>
              Home
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
