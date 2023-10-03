import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";

export default function SearchMercaderia() {
  const {
    apiOriginal,
    setTableList,
    inventarioNombres,
    getPrevius,
    getProductosInventario,
    setPagina,
    setEnd,
    limit,
    idCategoria,
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

          let listMercaderia = [];
          if (idCategoria === 1) {
            listMercaderia = apiOriginal.filter((e) => e.categoria == "Salida");
          }else if (idCategoria === 2) {
            listMercaderia = apiOriginal.filter((e) => e.categoria == "Entrada");
          }else return console.error("ERROR: No es ni 1 ni 2 el idcategoria");
          
          const resultado =  listMercaderia.filter((elem) => {
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
