import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

export default function SearchMercaderia() {
  const {
    apiOriginal,
    setApi,
    inventarioNombres,
    getEntradaApi,
    getSalidaApi,
    idCategoria,
    getProductosInventario
  } = useContext(MercaderiaContext);

  const [inputValue, setInputCod] = useState("");

  useEffect(() => {
    getProductosInventario();
  }, []);

  return (
    <div className="flex flex-row items-center">
      <Autocomplete
        disablePortal
        freeSolo
        options={inventarioNombres}
        getOptionLabel={(elem) => elem.nombre}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 200, marginLeft: 1 }}
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
