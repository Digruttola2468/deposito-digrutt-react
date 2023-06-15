import { useState, useContext } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import CardPost from "../../card/CardBodyPost";

import TextField from "@mui/material/TextField";

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
    console.log("create");
    
    createApi({
      nombre,
      descripcion
    });
    

    empty();
  };

  return (
    <>
      <CardPost title="Nuevo Inventario"
      handlePost={handleClickPost} handleEmpty={empty}>
        <TextField
          error={inputNombreError}
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
      </CardPost>
    </>
  );
}
