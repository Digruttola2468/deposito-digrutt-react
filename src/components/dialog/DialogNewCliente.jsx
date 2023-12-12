import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";
import useSWR from "swr";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function DialogNewCliente({ open = false, close }) {
  const { createCliente } = useContext(InventarioContext);
  const { BASE_URL } = useContext(UserContext);

  const { data, isLoading, error } = useSWR(`${BASE_URL}/localidad`, fetcher);

  const [codigo, setCodigo] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [mail, setGmail] = useState("");
  const [cuit, setCuit] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    createCliente({
      codigo: codigo,
      cliente: nombreCliente,
      domicilio,
      idLocalidad: localidad,
      mail,
      cuit,
    });

    close(false);
    empty();
  };

  const handleCloseDialog = () => {
    empty();
    close(false);
  };

  const empty = () => {
    setCodigo("");
    setNombreCliente("");
    setDomicilio("");
    setLocalidad("");
    setGmail("");
    setCuit("");
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nuevo Cliente</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", padding: 3 }}
        >
          <TextField
            autoFocus
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            label="Codigo 3 DIG"
            type="text"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <TextField
            autoFocus
            value={nombreCliente}
            onChange={(event) => setNombreCliente(event.target.value)}
            label="Nombre Cliente"
            type="text"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <TextField
            value={domicilio}
            onChange={(event) => setDomicilio(event.target.value)}
            label="Domicilio"
            type="text"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <TextField
            value={mail}
            onChange={(event) => setGmail(event.target.value)}
            label="Correo Electronico"
            type="text"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <TextField
            value={cuit}
            onChange={(event) => setCuit(event.target.value)}
            label="CUIT"
            type="text"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <Box sx={{ marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Localidad</InputLabel>
              <Select
                value={localidad}
                label="Localidad"
                onChange={(evt) => {
                  const comboBoxCliente = evt.target.value;
                  setLocalidad(comboBoxCliente);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {!isLoading ? (
                  data.map((elem) => {
                    return (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.ciudad}
                      </MenuItem>
                    );
                  })
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
