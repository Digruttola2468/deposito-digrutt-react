import { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

export default function AutoCompleteField({value,setValue}) {
  
  const {inventarioNombres} = useContext(MercaderiaContext);

  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={inventarioNombres}
      getOptionLabel={(elem) => elem.nombre}
      sx={{ width: 300, marginLeft: 1 }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} helperText="Required" value={"Hola"} label="Cod Producto" />
      )}
    />
  );
}
