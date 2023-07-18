import { useContext, useEffect, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";

export default function SearchCodProducto() {
  const { api, apiOriginal, filterApiSearch, getPrevius } =
    useContext(InventarioContext);

  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Autocomplete
        disablePortal
        freeSolo
        options={api}
        getOptionLabel={elem => elem.nombre}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
          const resultado = apiOriginal.filter((elem) => {
            return elem.nombre.toLowerCase().includes(newInputValue);
          });

          if (newInputValue !== "") filterApiSearch(resultado);
          else getPrevius();
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
    </div>
  );
}
