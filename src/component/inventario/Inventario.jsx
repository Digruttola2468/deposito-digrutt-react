import "./styleDeposito.css";
import { useContext } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import InventarioTable from "./table/Table";
import PostInventario from "./NewInventario/PostInventario";

import { InventarioContext } from "../../context/InventarioContext";
import { Autocomplete, Button, TextField } from "@mui/material";

function Inventario() {
  const { isdone } = useContext(InventarioContext);

  return (
    <>
      {isdone ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{ width: 200, marginLeft: 1 }}
              renderInput={(params) => (
                <TextField {...params} value={"Hola"} label="Cod Producto" />
              )}
            />
            <Button variant="text">Buscar</Button>
          </div>
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
