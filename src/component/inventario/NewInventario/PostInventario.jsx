import { useState, useContext } from "react";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

import { InventarioContext } from "../../../context/InventarioContext";

export default function PostInventario() {
  const { createApi } = useContext(InventarioContext);

  const [nombre, setNombre] = useState("");
  const [inputNombreError, setInputNombreError] = useState(false);

  const [descripcion, setDescripcion] = useState("");
  const [inputDescripcionError, setInputDescripcionError] = useState(false);

  const empty = () => {
    setNombre("");
    setDescripcion("");
  };

  const handleClickPost = () => {
    console.log("ACA");
    createApi({
      nombre,
      descripcion
    });

    empty();
  };

  return (
    <Card sx={{ marginLeft: 1, marginTop: 1 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Nuevo Inventario</h2>

        <TextField
          error={inputNombreError}
          id="outlined-basic"
          label="Cod Producto"
          value={nombre}
          onChange={(evt) => {
            setNombre(evt.target.value);
            setInputNombreError(false);
          }}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
        <TextField
          error={inputDescripcionError}
          id="outlined-basic"
          label="Descripcion"
          multiline
          value={descripcion}
          onChange={(evt) => {
            setDescripcion(evt.target.value);
            setInputDescripcionError(false);
          }}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClickPost}>
          Agregar
        </Button>
        <Button variant="text" onClick={() => empty()}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
}
