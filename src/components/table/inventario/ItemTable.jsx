import { useState, useContext, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import { useReadLocalStorage } from "usehooks-ts";

import PostInventario from "./PostInventario";
import DialogUpdate from "../../dialog/DialogUpdate";
import BodyCardItem from "../../card/CardBodyItem";

import { TextField } from "@mui/material";

export default function SelectItemInventario() {
  const { api, updateApi } = useContext(InventarioContext);
  const index = useReadLocalStorage("selectIndexInventario");

  const [openActualizar, setOpenActualizar] = useState(false);

  const [apiOne, setapiOne] = useState([]);

  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");

  //Handle
  const handleOpenUpdate = () => {
    setDescripcion(apiOne.descripcion);
    setNombre(apiOne.nombre);
    setOpenActualizar(true);
  };

  const handleUpdate = () => {
    updateApi(
      apiOne.id,
      {
        nombre,
        descripcion,
      },
      { entrada: apiOne.entrada, salida: apiOne.salida }
    );
    setOpenActualizar(false);
  };

  useEffect(() => {
    api
      .filter((elem) => elem.id == index)
      .map((elem) => setapiOne(elem));
    return () => {};
  });

  return (
    <div>
      <BodyCardItem data={api} handleUpdate={handleOpenUpdate} index={index}/>
      <PostInventario />

      <DialogUpdate
        show={openActualizar}
        title="Actualizar Inventario"
        update={handleUpdate}
        close={() => setOpenActualizar(false)}
      >
        <TextField
          sx={{ marginTop: 1, marginLeft: 1 }}
          label="Cod. Producto"
          placeholder="Cod. Producto"
          value={nombre}
          onChange={(evt) => setNombre(evt.target.value)}
        />
        <TextField
          multiline
          sx={{ marginTop: 3, marginLeft: 1 }}
          label="Descripcion"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(evt) => setDescripcion(evt.target.value)}
        />
      </DialogUpdate>
    </div>
  );
}
