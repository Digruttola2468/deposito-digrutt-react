import { useContext, useState, useEffect } from "react";

import { Autocomplete, Button, TextField } from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";

export default function SearchCodProducto  () {
    const { api,searchInventario, getPrevius } = useContext(InventarioContext);
  
    const [codProducto, setcodProducto] = useState();
    const [inputValue, setInputValue] = useState("");
    const [condicional, setCondicional] = useState(false);
  
    const handleClickSearch = () => searchInventario(codProducto);
    
    useEffect(() => {
      if (codProducto == undefined) {
        if (condicional) getPrevius();
        setCondicional(false);
      }
    });
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          disablePortal
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
    );
  };