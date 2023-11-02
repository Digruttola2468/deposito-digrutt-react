import { useState, useContext } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import CardPost from "../../card/CardBodyPost";

import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

export default function PostInventario() {
  const { createApi } = useContext(InventarioContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pesoUnidad, setPesoUnidad] = useState("");
  
  const token = useReadLocalStorage('token')

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
    }, token);
    
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
        <TextField
          label="Peso x Unidad"
          value={pesoUnidad}
          type="number"
          onChange={(evt) => setPesoUnidad(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
      </CardPost>
    </>
  );
}
