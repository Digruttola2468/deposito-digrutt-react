import { useState } from "react";

import "./header.css";

import Inventario from "./component/inventario/Inventario";
import Mercaderia from "./component/mercaderia/Mercaderia";

import { MercaderiaContextProvider } from "./context/MercaderiaContext";
import { InventarioContextProvider } from "./context/InventarioContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { CiExport } from "react-icons/ci";
import { FaBars, FaTable } from "react-icons/fa";

import axios from "axios";
import fileDownload from "js-file-download";

function App() {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1);
    return page;
  });
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleClickBar = () => {
    const ul = document.querySelector(".listaAbsolute");
    ul.classList.toggle("mostrar");
  };

  const handleExportMercaderia = () => {
    axios({
      url: "https://deposito-digrutt.up.railway.app/excel/mercaderia",
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, "mercaderia.xlsx");
    });
  };
  const handleExportInventario = () => {
    axios({
      url: "https://deposito-digrutt.up.railway.app/excel/inventario",
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, "inventario.xlsx");
    });
  };

  return (
    <>
      <nav className="nav-container">
        <h1>Digrutt</h1>
        <ul className="listaAbsolute">
          <li>
            <a href="/mercaderia" onClick={toPage("mercaderia")}>
              <FaTable /> Mercaderia
            </a>
          </li>
          <li>
            <a href="/inventario" onClick={toPage("inventario")}>
              <FaTable /> Inventario
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
              <CiExport />
              Export
            </Button>
          </li>
        </ul>
        <FaBars className="barIcon" onClick={handleClickBar} />
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Exportar tabla en Excel
          </DialogTitle>
          <DialogContent>
            <Button onClick={handleExportMercaderia} autoFocus>
              Export Mercaderia
            </Button>
            <Button onClick={handleExportInventario} autoFocus>
              Export Inventario
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </nav>
      <main>{getContent()}</main>
    </>
  );
}

export default App;
