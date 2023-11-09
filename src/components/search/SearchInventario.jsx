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

  const [cliente, setCliente] = useState("");
  const [searchDescripcion, setSearchDescripcion] = useState("");

  return (
    <div className="flex flex-row items-center">
      <TextField
      sx={{ width: 200, margin: 1 }}
        label="Buscar Descripcion"
        value={searchDescripcion}
        onChange={(evt) => {
          const newValue = evt.target.value;
          setSearchDescripcion(newValue);

          if (cliente) {
            const filterCliente = apiOriginal.filter((elem) => {
              return elem.idCliente === cliente;
            });
            const resultado = filterCliente.filter((elem) => {
              return elem.descripcion.toLowerCase().includes(newValue);
            });
            if (newValue !== "") {
              setTableList(resultado);
              setPagina(1);
              setEnd(limit);
            } else {
              setTableList(
                apiOriginal.filter((elem) => {
                  return elem.idCliente === cliente;
                })
              );
            }
          } else {
            const resultado = apiOriginal.filter((elem) => {
              return elem.descripcion.toLowerCase().includes(newValue);
            });
            if (newValue !== "") {
              setTableList(resultado);
              setPagina(1);
              setEnd(limit);
            } else getPrevius();
          }
        }}
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
