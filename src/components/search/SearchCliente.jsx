import { useContext, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useSWR from "swr";
import { UserContext } from "../../context/UserContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function SearchCliente({ data = [], setData, paginaInit }) {
  const { BASE_URL } = useContext(UserContext);
  const {
    data: localidadApi,
    isLoading,
    error,
  } = useSWR(`${BASE_URL}/localidad`, fetcher);

  const [localidad, setLocalidad] = useState("");

  if (isLoading) {
    return <></>;
  }

  return (
    <div >
      <Box sx={{ minWidth: 120, margin: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Localidad</InputLabel>
          <Select
            value={localidad}
            label="Localidad"
            onChange={(evt) => {
              paginaInit();
              const comboBoxLocalidad = evt.target.value;
              setLocalidad(comboBoxLocalidad);
              const resultado = data.filter((elem) => {
                return elem.localidad === comboBoxLocalidad;
              });
              if (comboBoxLocalidad !== "") {
                setData(resultado);
              }else setData(data);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {localidadApi.map((elem) => {
              return (
                <MenuItem key={elem.id} value={elem.id}>
                  {elem.ciudad}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
/**
 *
 *
 *
 */
