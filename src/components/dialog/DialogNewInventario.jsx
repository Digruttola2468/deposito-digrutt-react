import { useContext, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { InventarioContext } from "../../context/InventarioContext";
import { toast } from "react-toastify";

export default function DialogNewInventario() {
  const { showDialogNewInventario, setShowDialogNewInventario, createApi } =
    useContext(InventarioContext);

  const [codProducto, setCodProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (codProducto.length === 0) return toast.error("Campo Cod.Producto Vacio");

    if (descripcion.length === 0) return toast.error("Campo Descripcion Vacio");

    createApi({
      nombre: codProducto,
      descripcion
    });

    setCodProducto('');
    setDescripcion('');
    setShowDialogNewInventario(false);
  };

  const handleCloseDialog = () => {
    setCodProducto("");
    setDescripcion("");
    setShowDialogNewInventario(false);
  };

  return (
    <Dialog open={showDialogNewInventario} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nuevo Cod.Producto</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", padding: 3 }}
        >
          <TextField
            autoFocus
            value={codProducto}
            onChange={(event) => setCodProducto(event.target.value)}
            label="cod. Producto"
            type="text"
            variant="standard"
          />
          <TextField
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            label="Descripcion"
            multiline
            variant="standard"
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
