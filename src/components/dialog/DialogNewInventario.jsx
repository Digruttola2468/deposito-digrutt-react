import { useContext, useState } from "react";

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
import { toast } from "react-toastify";

export default function DialogNewInventario({open, close}) {
  const { createApi, clientesList } =
    useContext(InventarioContext);

  const [codProducto, setCodProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pesoUnidad, setPesoUnidad] = useState("");
  const [cliente, setCliente] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (codProducto.length === 0)
      return toast.error("Campo Cod.Producto Vacio");

    if (descripcion.length === 0) return toast.error("Campo Descripcion Vacio");

    createApi({
      nombre: codProducto,
      descripcion,
      pesoUnidad: parseFloat(pesoUnidad),
      idCliente: parseInt(cliente)
    });

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setCodProducto("");
    setDescripcion("");
    setPesoUnidad("");
    setCliente("");
    close(false);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nuevo Cod.Producto</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", padding: 3 }}
        >
          <Box sx={{ marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={cliente}
                label="Cliente"
                onChange={(evt) => {
                  const comboBoxCliente = evt.target.value;
                  setCliente(comboBoxCliente);
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
          <TextField
            autoFocus
            value={codProducto}
            onChange={(event) => setCodProducto(event.target.value)}
            label="cod. Producto"
            type="text"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <TextField
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            label="Descripcion"
            multiline
            variant="standard"
            sx={{ marginTop: 2 }}
          />
          <TextField
            value={pesoUnidad}
            onChange={(event) => setPesoUnidad(event.target.value)}
            label="Peso x Unidad"
            type="number"
            variant="standard"
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
