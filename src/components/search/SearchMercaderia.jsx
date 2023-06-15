import { Autocomplete, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

export default function SearchMercaderia() {
  const {
    inventarioNombres,
    searchEntradaApi,
    getEntradaApi,
    getSalidaApi,
    searchSalidaApi,
  } = useContext(MercaderiaContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");
  const [condicional, setCondicional] = useState(false);

  const handleClickSeach = () => {
    if (checked) searchEntradaApi (codProducto.nombre);
    else searchSalidaApi(codProducto.nombre);
  };

  
  useEffect(() => {
    if (codProducto == undefined) {
      if (condicional) {
        if (checked) getEntradaApi();
        else getSalidaApi();

        setCondicional(false);
      }
    }
  });
  return (
    <div className="searchCodProducto">
      <Autocomplete
        disablePortal
        options={inventarioNombres}
        getOptionLabel={(elem) => elem.nombre}
        sx={{ width: 200, marginLeft: 1 }}
        value={codProducto || null}
        onChange={(evt, newValue) => {
          setCondicional(true);
          setcodProducto(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Cod Producto" />}
      />
      <Button variant="text" onClick={handleClickSeach}>
        Buscar
      </Button>
    </div>
  );
}
