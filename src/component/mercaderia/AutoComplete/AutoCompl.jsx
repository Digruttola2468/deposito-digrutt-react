import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

export default function AutoCompleteField(props) {
  
  const {inventarioNombres} = useContext(MercaderiaContext);


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={inventarioNombres}
      getOptionLabel={(elem) => elem.nombre}
      sx={{ width: 200, marginLeft: 1 }}
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField {...params}  value={"Hola"} label="Cod Producto" />
      )}
    />
  );
}
