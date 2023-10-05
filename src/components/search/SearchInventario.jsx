import { useContext, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";

export default function SearchCodProducto() {
  const {
    apiOriginal,
    setTableList,
    getPrevius,
    setPagina,
    setEnd,
    limit,
  } = useContext(InventarioContext);

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Autocomplete
        disablePortal
        freeSolo
        options={apiOriginal}
        getOptionLabel={(elem) => elem.nombre}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
          const resultado = apiOriginal.filter((elem) => {
            return elem.nombre.toLowerCase().includes(newInputValue);
          });
          if (newInputValue !== "") {
            setTableList(resultado);
            setPagina(1);
            setEnd(limit);
          } else getPrevius();
        }}
        sx={{ width: 200, margin: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={inputValue}
            label="Buscar"
            variant="standard"
          />
        )}
      />
    </>
  );
}
