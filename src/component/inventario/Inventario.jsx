import "./styleDeposito.css";
import { useContext } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import InventarioTable from "./table/Table";
import PostInventario from "./NewInventario/PostInventario";

import { InventarioContext } from "../../context/InventarioContext";
import { Autocomplete, Button, TextField } from "@mui/material";

import axios, { Axios } from "axios";
import fileDownload from "js-file-download";

function Inventario() {
  const { isdone } = useContext(InventarioContext);

  const handleClickExcel = () => {
    axios({
      url: "https://deposito-digrutt.up.railway.app/excel/inventario",
      method: "GET",
      responseType: "blob"
    }).then(res => {
      console.log(res);
      fileDownload(res.data, "inventario");
    })
  }

  return (
    <>
      <div style={{display: "flex", flexDirection: "row"}}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ width: 200, marginLeft: 1 }}
          renderInput={(params) => (
            <TextField {...params} value={"Hola"} label="Cod Producto" />
          )}
        />
        <Button variant="text">
          Buscar
        </Button>
        <Button variant="text" onClick={handleClickExcel}>
          Excel
        </Button>
      </div>
      {isdone ? (
        <>
          <InventarioTable />
          <PostInventario />
        </>
      ) : (
        <></>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isdone}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Inventario;
