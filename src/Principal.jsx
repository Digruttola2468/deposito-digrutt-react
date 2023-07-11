import { useState } from "react";
import "./header.css";

import Inventario from "./pages/Inventario";
import Mercaderia from "./pages/Mercaderia";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";

import DialogMenu from "./components/dialog/DialogMenu";

import { FaBars, FaTable, FaFileExport } from "react-icons/fa";

import Button from "@mui/material/Button";
import { useLocalStorage } from "usehooks-ts";

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

  const [page, setPage] = useLocalStorage("page", () => {
    const { pathname } = window.location;
    const page = pathname.slice(1);
    return page;
  });

  //Handle Click
  const toPage = (page) => (evt) => {
    evt.preventDefault();
    setPage(page);
  };

  const handleClickBar = () => {
    const ul = document.querySelector(".listaAbsolute");
    ul.classList.toggle("mostrar");
  };

  return (
    <>
      <header className="bg-celeste-oscuro">
        <nav className="container m-auto relative flex flex-row justify-between items-center py-0 px-2">
          <h1 className="text-white text-4xl ">Digrutt</h1>
          <ul className="flex flex-row items-center">
            <li onClick={toPage("")} className="ml-1">
              <a
                className="text-white flex flex-row items-center cursor-pointer "
              >
                <FaTable />
                Mercaderia
              </a>
            </li>
            <li onClick={toPage("inventario")} className="ml-1">
              <a
                style={{ cursor: "pointer" }}
                className="text-white flex flex-row items-center cursor-pointer"
              >
                <FaTable />
                Inventario
              </a>
            </li>
            <li className="ml-1">
              <Button
                variant="text"
                style={{ color: "white" }}
                className="text-white"
                onClick={() => setOpen(true)}
              >
                Export
              </Button>
            </li>
          </ul>
          <FaBars className="barIcon" onClick={handleClickBar} />
          <DialogMenu show={open} close={setOpen} />
        </nav>
      </header>

      <main>{getContent(page)}</main>
    </>
  );
}

export default Principal;
