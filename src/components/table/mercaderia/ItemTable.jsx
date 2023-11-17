import { useState, useContext, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import { FaTrash, FaPen } from "react-icons/fa";
import { useReadLocalStorage } from "usehooks-ts";
import DialogUpdate from "../../dialog/DialogUpdate";
import DialogDelete from "../../dialog/DialogDelete";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { InventarioContext } from "../../../context/InventarioContext";

const getDateWithNameMonth = (fechaString) => {
  const monthNames = [
    "NaN",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const fDate = new Date(fechaString);
  return `${fDate.getDate()} ${
    monthNames[fDate.getMonth() + 1]
  } ${fDate.getFullYear()}`;
};


export default function InfoItem() {
  const { tableList, deleteApi, updateApi, idCategoria } =
    useContext(MercaderiaContext);
  
  const { inventarioNombres } = useContext(InventarioContext)

  const index = useReadLocalStorage("selectIndexMercaderia");
  const [openDelete, setOpenDelete] = useState(false);
  const [openActualizar, setOpenActualizar] = useState(false);

  const [apiOne, setapiOne] = useState([]);

  const [factura, setFactura] = useState("");
  const [codProducto, setcodProducto] = useState();

  //2 - Entrada
  //1 - Salida
  const [idcategoria, setIdCategoria] = useState(idCategoria);

  const [stock, setStock] = useState("");
  const [fecha, setFecha] = useState();

  //Handle
  const handleDelete = () => {
    deleteApi(apiOne.id);
    handleClose();
  };

  const handleUpdate = () => {
    const filter = inventarioNombres.filter(
      (elem) => elem.nombre.toLowerCase() == codProducto.nombre.toLowerCase()
    );
    updateApi(apiOne.id, {
      proveedor: factura,
      idinventario: filter[0].id,
      stock,
      fecha,
      idcategoria,
    });
    handleCloseUpdate(idcategoria);
  };

  const handleClickOpen = () => setOpenDelete(true);

  const handleClose = () => setOpenDelete(false);

  const handleOpenUpdate = () => {
    setFactura(apiOne.proveedor);
    setFecha(apiOne.fecha);
    setcodProducto({ nombre: apiOne.nombre, id: apiOne.idinventario });
    setStock(apiOne.stock);
    setIdCategoria(idCategoria);
    setOpenActualizar(true);
  };

  const handleCloseUpdate = () => setOpenActualizar(false);

  useEffect(() => {
    tableList.filter((elem) => elem.id == index).map((elem) => setapiOne(elem));
  });

  return (
    <div className="mt-5">
      {tableList
        .filter((elem) => elem.id == index)
        .map((elem) => {
          return (
            <Card key={elem.id}>
              <CardContent>
                <div className="flex flex-col">
                  <div className="w-full bg-slate-400 rounded-lg">
                  </div>

                  <h2 className="text-lg font-semibold uppercase">
                    {elem.nombre}
                  </h2>

                  <p>
                    <b>Descripcion</b>: {elem.descripcion}
                  </p>
                  <p>
                    <b>Fecha</b>: {getDateWithNameMonth(elem.fecha)}
                  </p>
                  <p>
                    <b>Cantidad</b>: {elem.stock}
                  </p>
                  <p>
                    <b>Proveedor</b>: {elem.proveedor}
                  </p>
                </div>
              </CardContent>
              <CardActions>
                <Tooltip
                  title="eliminar"
                  onClick={handleClickOpen}
                  className="hover:text-red-500"
                >
                  <IconButton size="small">
                    <FaTrash />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="actualizar"
                  onClick={handleOpenUpdate}
                  className="hover:text-blue-400"
                >
                  <IconButton size="small">
                    <FaPen />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          );
        })}
      <DialogDelete
        show={openDelete}
        close={handleClose}
        eliminar={handleDelete}
        title="Eliminar Mercaderia"
      />

      <DialogUpdate
        title="Actualizar Mercaderia"
        update={handleUpdate}
        show={openActualizar}
        close={handleCloseUpdate}
      >
        <FormControl sx={{ width: 300, marginLeft: 1, marginTop: 2 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={idcategoria}
            label="Categoria"
            onChange={(evt, value) => {
              setIdCategoria(value.props.value);
            }}
          >
            <MenuItem value={1}>Salida</MenuItem>
            <MenuItem value={2}>Entrada</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          disablePortal
          options={inventarioNombres}
          getOptionLabel={(elem) => elem.nombre}
          isOptionEqualToValue={(option, value) =>
            option.nombre === value.nombre
          }
          sx={{ width: 300, marginLeft: 1, marginTop: 2 }}
          value={codProducto || null}
          onChange={(evt, newValue) => setcodProducto(newValue)}
          renderInput={(params) => (
            <TextField {...params} value={"Hola"} label="Cod Producto" />
          )}
        />
        <TextField
          sx={{ marginTop: 1, marginLeft: 1 }}
          label="Cantidad"
          placeholder="Cantidad"
          value={stock}
          onChange={(evt) => setStock(evt.target.value)}
        />
        <TextField
          sx={{ marginTop: 1, marginLeft: 1 }}
          label="Fecha"
          placeholder="Fecha"
          value={fecha}
          onChange={(evt) => setFecha(evt.target.value)}
        />
        <TextField
          sx={{ marginTop: 2, marginLeft: 1 }}
          label="Factura"
          placeholder="Factura"
          value={factura}
          onChange={(evt) => setFactura(evt.target.value)}
        />
      </DialogUpdate>
    </div>
  );
}
