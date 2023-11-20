import { useState, useContext, useEffect } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import { useReadLocalStorage } from "usehooks-ts";
import DialogUpdate from "../../dialog/DialogUpdate";
import DialogDelete from "../../dialog/DialogDelete";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { InventarioContext } from "../../../context/InventarioContext";
import CardItemMercaderia from "../../card/CardItemMercaderia";

export default function InfoItem() {
  const { tableList, deleteApi, updateApi, idCategoria } =
    useContext(MercaderiaContext);

  const { inventarioNombres } = useContext(InventarioContext);

  const index = useReadLocalStorage("selectIndexMercaderia");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [apiOne, setapiOne] = useState(null);

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
  };

  useEffect(() => {
    if (index != null) setapiOne(tableList.find((elem) => elem.id == index));
    else setapiOne(null);
  }, [index]);

  return (
    <div className="mt-5">
      {apiOne ? (
        <CardItemMercaderia
          data={apiOne}
          handleDelete={() => setOpenDelete(true)}
          handleUpdate={() => setOpenUpdate(true)}
        />
      ) : (
        <></>
      )}

      <DialogDelete
        show={openDelete}
        close={() => setOpenDelete(false)}
        handleDelete={handleDelete}
        title="Eliminar Mercaderia"
      />

      <DialogUpdate
        title="Actualizar Mercaderia"
        update={handleUpdate}
        show={openUpdate}
        close={() => setOpenUpdate(false)}
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
