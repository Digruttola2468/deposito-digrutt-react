import { useState, useContext } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import DialogUpdate from "../../dialog/DialogUpdate";
import { Autocomplete, TextField } from "@mui/material";
import DialogDelete from "../../dialog/DialogDelete";
import CardItemInventario from "../../card/CardItemInventario";

export default function SelectItemInventario() {
  const { updateApi, deleteApi, clientesList, index, apiOriginal } =
    useContext(InventarioContext);

  //Open - Close Dialog
  const [openActualizar, setOpenActualizar] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  //Update Dialog
  const [articulo, setArticulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [pesoUnidad, setPesoUnidad] = useState("");
  const [codCliente, setCodCliente] = useState(null);

  const handleUpdate = () => {
    updateApi(index, {
      articulo,
      nombre,
      descripcion,
      pesoUnidad: parseFloat(pesoUnidad),
      idCliente: codCliente != null ? codCliente.id : null,
    });
    empty();
    setOpenActualizar(false);
  };

  const handleDelete = () => {
    deleteApi(index);
    empty();
    setOpenDelete(false);
  };

  const empty = () => {
    setOpenActualizar(false);
    setOpenDelete(false);
    setArticulo("");
    setDescripcion("");
    setNombre("");
    setPesoUnidad("");
    setCodCliente(null);
  };

  return (
    <div>
      {index != null ? (
        <CardItemInventario
          handleUpdate={() => {
            const apiOne = apiOriginal.find(elem => elem.id === index);
            if (apiOne) {
              setArticulo(apiOne.articulo);
              setDescripcion(apiOne.descripcion);
              setNombre(apiOne.nombre);
              setPesoUnidad(apiOne.pesoUnidad);
            }
            setOpenActualizar(true);}}
          handleDelete={() => setOpenDelete(true)}
        />
      ) : (
        <></>
      )}

      <DialogUpdate
        show={openActualizar}
        title="Actualizar Inventario"
        handleUpdate={handleUpdate}
        close={() => {
          setOpenActualizar(false);
          empty();
        }}
      >
        <TextField
          sx={{ marginTop: 1, marginLeft: 1 }}
          label="Articulo"
          value={articulo}
          onChange={(evt) => setArticulo(evt.target.value)}
        />
        <TextField
          sx={{ marginTop: 3, marginLeft: 1 }}
          label="Cod. Producto"
          value={nombre}
          onChange={(evt) => setNombre(evt.target.value)}
        />
        <TextField
          sx={{ marginTop: 3, marginLeft: 1 }}
          label="Descripcion"
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
          value={codCliente}
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
