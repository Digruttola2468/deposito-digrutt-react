import { useState, useContext, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import { useReadLocalStorage } from "usehooks-ts";

import DialogUpdate from "../../dialog/DialogUpdate";
import { Autocomplete, TextField } from "@mui/material";
import DialogDelete from "../../dialog/DialogDelete";
import CardItemInventario from "../../card/CardItemInventario";

export default function SelectItemInventario() {
  const { tableList, updateApi, deleteApi, clientesList } =
    useContext(InventarioContext);
  const index = useReadLocalStorage("selectIndexInventario");

  const [openActualizar, setOpenActualizar] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [apiOne, setapiOne] = useState(null);

  const [articulo, setArticulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [pesoUnidad, setPesoUnidad] = useState("");

  const [codCliente, setCodCliente] = useState("");

  //Handle
  const handleOpenUpdate = () => {
    setArticulo(apiOne.articulo);
    setNombre(apiOne.nombre);
    setDescripcion(apiOne.descripcion);
    setPesoUnidad(apiOne.pesoUnidad);
    if (apiOne.idCliente != null) {
      const filterCliente = clientesList.filter(
        (elem) => elem.id === apiOne.idCliente
      );
      setCodCliente(filterCliente[0]);
    } else setCodCliente("");

    setOpenActualizar(true);
  };

  const handleUpdate = () => {
    updateApi(apiOne.id, {
      articulo: articulo,
      nombre: nombre,
      descripcion: descripcion,
      pesoUnidad: parseFloat(pesoUnidad),
      idCliente: codCliente.id,
    });
    empty();
    setapiOne({});
    setOpenActualizar(false);
  };

  const handleDelete = () => {
    deleteApi(apiOne.id);
    empty();
    setOpenDelete(false);
  };

  useEffect(() => {
    if (index != null) setapiOne(tableList.find((elem) => elem.id == index));
    else setapiOne(null);
  }, [index]);

  const empty = () => {
    setOpenActualizar(false);
    setOpenDelete(false);
    setArticulo("");
    setDescripcion("");
    setNombre("");
    setPesoUnidad("");
    setCodCliente("");
  };

  return (
    <div>
      {apiOne ? <CardItemInventario
        data={apiOne}
        handleDelete={() => setOpenDelete(true)}
        handleUpdate={handleOpenUpdate}
      /> : <></>}

      <DialogUpdate
        show={openActualizar}
        title="Actualizar Inventario"
        handleUpdate={handleUpdate}
        close={() => {setOpenActualizar(false);empty()}}
      >
        <TextField
          sx={{ marginTop: 1, marginLeft: 1 }}
          label="Articulo"
          placeholder="Articulo"
          value={articulo}
          onChange={(evt) => setArticulo(evt.target.value)}
        />
        <TextField
          sx={{ marginTop: 3, marginLeft: 1 }}
          label="Cod. Producto"
          placeholder="Cod. Producto"
          value={nombre}
          onChange={(evt) => setNombre(evt.target.value)}
        />
        <TextField
          sx={{ marginTop: 3, marginLeft: 1 }}
          label="Descripcion"
          placeholder="Descripcion"
          multiline
          rows={2}
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
        handleDelete={handleDelete}
        close={() => setOpenDelete(false)}
      />
    </div>
  );
}
