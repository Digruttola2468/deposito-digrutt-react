import { Autocomplete, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

import iconSearch from "../../assets/search.svg";

export default function SearchMercaderia() {
  const {
    apiOriginal,
    setApi,
    inventarioNombres,
    searchEntradaApi,
    getEntradaApi,
    getSalidaApi,
    searchSalidaApi,
    idCategoria,
  } = useContext(MercaderiaContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputCod] = useState("");

  return (
    <div className="flex flex-row items-center">
      <Autocomplete
        disablePortal
        freeSolo
        options={inventarioNombres}
        getOptionLabel={(elem) => elem.nombre}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 200, marginLeft: 1 }}
        value={codProducto || null}
        onChange={(evt, newValue) => {
          setcodProducto(newValue);
          if (newValue != null) {
            if (idCategoria == 2) searchEntradaApi(newValue.nombre);
            else searchSalidaApi(newValue.nombre);
          } else {
            if (idCategoria == 2) getEntradaApi();
            else getSalidaApi();
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputCod(newInputValue);
          const resultado = apiOriginal.filter((elem) => {
            return elem.nombre.toLowerCase().includes(newInputValue);
          });
          if (newInputValue !== "") setApi(resultado);
          else {
            if (idCategoria == 2) getEntradaApi();
            else getSalidaApi();
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar" variant="standard" />
        )}
      />
    </div>
  );
}
