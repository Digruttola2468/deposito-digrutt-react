import { useContext, useState} from "react";

import { Autocomplete,  TextField } from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";

export default function SearchCodProducto() {
  const { api, apiOriginal, searchInventario, filterApiSearch, getPrevius } =
    useContext(InventarioContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");
  return (
    <div >
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
        sx={{ width: 200, margin: 1 }}
        renderInput={(params) => (
          <TextField {...params} value={inputValue} label="Buscar" variant="standard" />
        )}
      />
    </div>
  );
}
