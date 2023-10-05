import { useState, useContext, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import { useReadLocalStorage } from "usehooks-ts";

import PostInventario from "./PostInventario";
import DialogUpdate from "../../dialog/DialogUpdate";
import BodyCardItem from "../../card/CardBodyItem";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DialogDelete from "../../dialog/DialogDelete";

export default function SelectItemInventario() {
  const { tableList, updateApi, deleteApi, clientesList } =
    useContext(InventarioContext);
  const index = useReadLocalStorage("selectIndexInventario");

  const [openActualizar, setOpenActualizar] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [apiOne, setapiOne] = useState([]);

  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [pesoUnidad, setPesoUnidad] = useState("");

  const [codCliente, setCodCliente] = useState("");

  //Handle
  const handleOpenUpdate = () => {
    setDescripcion(apiOne.descripcion);
    setNombre(apiOne.nombre);
    if (apiOne.idCliente != null) {
      const filterCliente = clientesList.filter(
        (elem) => elem.id === apiOne.idCliente
      );
      setCodCliente(filterCliente[0]);
    } else setCodCliente("");

    setOpenActualizar(true);
  };

  const handleUpdate = () => {
    updateApi(
      apiOne.id,
      {
        nombre,
        descripcion,
        pesoUnidad: parseFloat(pesoUnidad),
        idCliente: codCliente.id,
      },
      { entrada: apiOne.entrada, salida: apiOne.salida }
    );
    setOpenActualizar(false);
  };

  const handleDelete = () => {
    deleteApi(apiOne.id);
    setOpenDelete(false);
  };

  useEffect(() => {
    tableList.filter((elem) => elem.id == index).map((elem) => setapiOne(elem));
    return () => {};
  });

  return (
    <div>
      <BodyCardItem
        handleDelete={() => setOpenDelete(true)}
        handleUpdate={handleOpenUpdate}
      />

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
        <TextField
          value={pesoUnidad}
          onChange={(event) => setPesoUnidad(event.target.value)}
          label="Peso x Unidad"
          type="number"
          sx={{ marginTop: 3, marginLeft: 1 }}
        />
        <Autocomplete
          options={clientesList}
          getOptionLabel={(elem) => elem.cliente}
          value={codCliente || null}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(evt, newValue) => setCodCliente(newValue)}
          sx={{ marginTop: 3, marginLeft: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Clientes" variant="outlined" />
          )}
        />
      </DialogUpdate>
      <DialogDelete
        title="Eliminar Mercaderia"
        show={openDelete}
        eliminar={handleDelete}
        close={() => setOpenDelete(false)}
      />
    </div>
  );
}
