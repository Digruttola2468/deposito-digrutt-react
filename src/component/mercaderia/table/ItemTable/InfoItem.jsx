import { useState, useContext, useEffect } from "react";

//MUI COMPONENT
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Autocomplete from "@mui/material/Autocomplete";

//COMPONENT OWN
import IconButtonMui from "../../IconButtonMui/Button";

//Context
import { MercaderiaContext } from "../../../../context/MercaderiaContext";

//REACT ICONS
import { FaTrash, FaPen } from "react-icons/fa";

export default function InfoItem({ index }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openActualizar, setOpenActualizar] = useState(false);

  const [apiOne, setapiOne] = useState([]);

  const [factura, setFactura] = useState("");
  const [codProducto, setcodProducto] = useState();
  const [idcategoria, setIdCategoria] = useState();
  const [stock, setStock] = useState("");
  const [fecha, setFecha] = useState();

  const { api, deleteApi, updateApi, inventarioNombres } =
    useContext(MercaderiaContext);

  const handleDelete = () => {
    deleteApi(apiOne.id);
    handleClose();
  };

  const handleUpdate = () => {
    const filter = inventarioNombres.filter(
      (elem) => elem.nombre == codProducto.nombre
    );
    console.log(api);
    /*updateApi(apiOne.id, {
      proveedor: factura,
      idinventario: filter[0].id,
      stock,
      fecha,
    });*/
    handleCloseUpdate();
  };

  //DIALOG
  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpenUpdate = () => {
    setFactura(apiOne.proveedor);
    setFecha(apiOne.fecha);
    setcodProducto({ nombre: apiOne.nombre, id: apiOne.idinventario });
    setStock(apiOne.stock);
    setOpenActualizar(true);
  };

  const handleCloseUpdate = () => {
    setOpenActualizar(false);
  };

  useEffect(() => {
    [...api]
      .filter((elem) => elem.id == index)
      .map((elem) => {
        setapiOne(elem);
      });
  });

  return (
    <div>
      {[...api]
        .filter((elem) => elem.id == index)
        .map((elem) => {
          return (
            <Card key={elem.id} sx={{ marginLeft: 1 }}>
              <CardContent>
                <div>
                  <h2>{elem.nombre}</h2>
                  <p>
                    <b>Descripcion</b>: {elem.descripcion}
                  </p>
                  <p>
                    <b>Fecha</b>: {elem.fecha}
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
                <IconButtonMui
                  title="eliminar"
                  callback={handleClickOpen}
                  classf="pdf"
                  size="small"
                >
                  <FaTrash />
                </IconButtonMui>
                <IconButtonMui
                  title="actualizar"
                  callback={handleOpenUpdate}
                  classf="update"
                  size="small"
                >
                  <FaPen />
                </IconButtonMui>
              </CardActions>
            </Card>
          );
        })}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar Mercaderia</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estas seguro que queres eliminar ??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openActualizar}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Actualizar Mercaderia</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", padding: 3 }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"

            options={[{nombre: "Entrada", value: 2},{nombre: "Salida", value: 1}]}
            getOptionLabel={(elem) => elem.nombre}
            sx={{ width: 300, marginLeft: 1, marginTop: 2 }}
            value={idcategoria || null}
            onChange={(evt, newValue) => setIdCategoria(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Categoria" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={inventarioNombres}
            getOptionLabel={(elem) => elem.nombre}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancelar</Button>
          <Button onClick={handleUpdate} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
