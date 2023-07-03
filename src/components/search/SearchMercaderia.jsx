import { Autocomplete, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

export default function SearchMercaderia() {
  const {
    inventarioNombres,
    searchEntradaApi,
    getEntradaApi,
    getSalidaApi,
    searchSalidaApi,
    idCategoria,
  } = useContext(MercaderiaContext);

  const [codProducto, setcodProducto] = useState();

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Autocomplete
        disablePortal
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
        onClick={(evt) => console.log(evt)}
        renderInput={(params) => <TextField {...params} label="Cod Producto" />}
      />
    </div>
  );
}
