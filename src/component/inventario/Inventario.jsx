import "./styleDeposito.css";
import { useContext, useState, useEffect } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import InventarioTable from "./table/Table";
import PostInventario from "./NewInventario/PostInventario";

import { InventarioContext } from "../../context/InventarioContext";
import { Autocomplete, Button, TextField } from "@mui/material";

function Inventario() {
  const { isdone, api, searchInventario, getPrevius } =
    useContext(InventarioContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");

  const [condicional, setCondicional] = useState(false);

  useEffect(() => {
    if (codProducto == undefined) {
      if (condicional) getPrevius();
      setCondicional(false);
    }
  });

  const handleClickSearch = () => {
    searchInventario(codProducto);
  };

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
              options={api}
              getOptionLabel={(elem) => elem.nombre}
              //Al seleccionar
              value={codProducto || null}
              onChange={(evt, newValue) => {
                setCondicional(true);
                setcodProducto(newValue);
              }}
              //Al escribir
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
              }}
              sx={{ width: 200, marginLeft: 1 }}
              renderInput={(params) => (
                <TextField {...params} value={"Hola"} label="Cod Producto" />
              )}
            />
            <Button variant="text" onClick={handleClickSearch}>
              Buscar
            </Button>
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
