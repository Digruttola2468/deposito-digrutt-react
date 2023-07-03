import { useState } from "react";
import "./header.css";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";

import DialogMenu from "./components/dialog/DialogMenu";

import { FaBars, FaTable, FaFileExport } from "react-icons/fa";

import Button from "@mui/material/Button";

const getContent = (page) => {
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

function Principal() {
  const [open, setOpen] = useState(false);
  
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1);
    console.log("PAGE",page);
    return page;
  });

  //Handle Click
  const toPage = (page) => (evt) => {
    evt.preventDefault();
    window.history.pushState(null, "", `/${page}`);
    console.log("TO PAGE",`/${page}`);
    setPage(page);
  };

  const handleClickBar = () => {
    const ul = document.querySelector(".listaAbsolute");
    ul.classList.toggle("mostrar");
  };

  return (
    <>
      <nav className="nav-container">
        <h1>Digrutt</h1>
        <ul className="listaAbsolute">
          <li onClick={toPage("")}>
            <a style={{cursor: "pointer"}}>
              <FaTable />
              Mercaderia
            </a>
          </li>
          <li onClick={toPage("inventario")}>
            <a style={{cursor: "pointer"}}>
              <FaTable />
              Inventario
            </a>
          </li>
          <li>
            <Button
              variant="text"
              style={{ color: "white" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Export
            </Button>
          </li>
        </ul>
        <FaBars className="barIcon" onClick={handleClickBar} />
        <DialogMenu show={open} close={setOpen}/>
      </nav>
      <main>{getContent(page)}</main>
    </>
  );
}

export default Principal;
