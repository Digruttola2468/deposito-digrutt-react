import { useContext, useState, useEffect } from "react";

import { Autocomplete, Button, TextField } from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";

export default function SearchCodProducto() {
  const { api,apiOriginal, searchInventario, filterApiSearch, getPrevius } = useContext(InventarioContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");
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
        freeSolo
        options={api}
        getOptionLabel={(elem) => elem.nombre}
        isOptionEqualToValue={(option, value) =>
          option.idinventario === value.idinventario
        }
        //Al seleccionar
        value={codProducto || null}
        onChange={(evt, newValue) => {
          setcodProducto(newValue);

          if (newValue != null) searchInventario(newValue.nombre);
          else getPrevius();
        }}
        //Al escribir
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
          const resultado = apiOriginal.filter((elem) => {
            return elem.nombre.toLowerCase().includes(newInputValue);
          });
          
          if (newInputValue !== "") filterApiSearch(resultado);
          else getPrevius();
          
          
        }}
        sx={{ width: 200, marginLeft: 1 }}
        renderInput={(params) => (
          <TextField {...params} value={"Hola"} label="Cod Producto" />
        )}
      />
    </div>
  );
}
