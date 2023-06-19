import { useState, useContext } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import CardPost from "../../card/CardBodyPost";

import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

export default function PostInventario() {
  const { createApi } = useContext(InventarioContext);

  const [nombre, setNombre] = useState("");

  const [descripcion, setDescripcion] = useState("");

  const empty = () => {
    setNombre("");
    setDescripcion("");
  };

  const handleClickPost = () => {
    if (nombre.length === 0) 
      return toast.error("Campo Cod.Producto Vacio");
    
    if (descripcion.length === 0 )
      return toast.error("Campo Descripcion Vacio");
    
    createApi({
      nombre,
      descripcion
    });
    
    empty();
  };

  return (
    <>
      <CardPost
        title="Nuevo Inventario"
        handlePost={handleClickPost}
        handleEmpty={empty}
      >
        <TextField
          label="Cod Producto"
          value={nombre}
          onChange={(evt) => setNombre(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
        <TextField
          label="Descripcion"
          multiline
          value={descripcion}
          onChange={(evt) => setDescripcion(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
      </CardPost>
    </>
  );
}
