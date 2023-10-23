import { useContext, useState } from "react";

import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";
import { useEffect } from "react";

export default function SearchCodProducto() {
  const {
    apiOriginal,
    setTableList,
    getPrevius,
    setPagina,
    setEnd,
    limit,
    clientesList,
  } = useContext(InventarioContext);

  const [inputValue, setInputValue] = useState("");

  const [cliente, setCliente] = useState("");
  const [searchInventario, setSearchinventario] = useState(apiOriginal);

  useEffect(() => {
    if (cliente) {
      const filterCliente = apiOriginal.filter((elem) => {
        return elem.idCliente === cliente;
      });
      setSearchinventario(filterCliente);
    } else setSearchinventario(apiOriginal);
  }, [cliente]);

  return (
    <div className="flex flex-row items-center">
      <Autocomplete
        disablePortal
        freeSolo
        options={searchInventario}
        getOptionLabel={(elem) => elem.nombre}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);

          if (cliente) {
            const filterCliente = apiOriginal.filter((elem) => {
              return elem.idCliente === cliente;
            });
            const resultado = filterCliente.filter((elem) => {
              return elem.nombre.toLowerCase().includes(newInputValue);
            });
            if (newInputValue !== "") {
              setTableList(resultado);
              setPagina(1);
              setEnd(limit);
            } else{
              setTableList(
                apiOriginal.filter((elem) => {
                  return elem.idCliente === cliente;
                })
              );}
          } else {
            const resultado = apiOriginal.filter((elem) => {
              return elem.nombre.toLowerCase().includes(newInputValue);
            });
            if (newInputValue !== "") {
              setTableList(resultado);
              setPagina(1);
              setEnd(limit);
            } else getPrevius();
          }
        }}
        sx={{ width: 200, margin: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={inputValue}
            label="Buscar"
            variant="outlined"
          />
        )}
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Cliente</InputLabel>
          <Select
            value={cliente}
            label="Cliente"
            onChange={(evt) => {
              const comboBoxCliente = evt.target.value;
              setCliente(comboBoxCliente);
              setInputValue("");
              const resultado = apiOriginal.filter((elem) => {
                return elem.idCliente === comboBoxCliente;
              });
              if (comboBoxCliente !== "") {
                setTableList(resultado);
                setPagina(1);
                setEnd(limit);
              } else getPrevius();
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {clientesList.map((elem) => {
              return (
                <MenuItem key={elem.id} value={elem.id}>
                  {elem.cliente}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
