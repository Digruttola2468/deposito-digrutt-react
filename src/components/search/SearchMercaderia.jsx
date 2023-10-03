import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

export default function SearchMercaderia() {
  const {
    tableList,
    setTableList,
    inventarioNombres,
    getPrevius,
    getProductosInventario,
    setPagina,
    setEnd,
    limit,
    inputSearch, 
    setInputSearch
  } = useContext(MercaderiaContext);

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
        sx={{ width: 140, marginLeft: 1 }}
        inputValue={inputSearch}
        onInputChange={(event, newInputValue) => {
          setInputSearch(newInputValue);
          const resultado = tableList.filter((elem) => {
            return elem.nombre.toLowerCase().includes(newInputValue);
          });
          if (newInputValue !== "") {
            setTableList(resultado);
            setPagina(1);
            setEnd(limit);
          } else getPrevius();
        }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar" variant="standard" />
        )}
      />
    </div>
  );
}
