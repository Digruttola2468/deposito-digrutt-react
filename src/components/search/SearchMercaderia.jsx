import { Autocomplete, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

export default function SearchMercaderia() {
  const {
    api,
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
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Autocomplete
        disablePortal
        freeSolo
        options={inventarioNombres}
        getOptionLabel={(elem) => elem.nombre}
        sx={{ width: 200, marginLeft: 1 }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
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
          const resultado = api.filter((elem) => {
            return elem.nombre.toLowerCase().includes(newInputValue);
          });
          if (newInputValue !== "") setApi(resultado);
          else {
            if (idCategoria == 2) getEntradaApi();
            else getSalidaApi();
          }
        }}
        renderInput={(params) => <TextField {...params} label="Cod Producto" />}
      />
    </div>
  );
}
