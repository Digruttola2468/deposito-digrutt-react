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
  const [codProducto, setcodProducto] = useState("");
  const [stock, setStock] = useState("");
  const [fecha, setFecha] = useState();

  const { api, deleteApi, updateApi, inventarioNombres} = useContext(MercaderiaContext);

  const handleDelete = () => {
    deleteApi(apiOne.id);
    handleClose();
  };

  const handleUpdate = () => {
    const filter = inventarioNombres.filter((elem) => elem.nombre == codProducto);
    updateApi(apiOne.id, {
      factura,
      idinventario: filter[0].id,
      stock,
      fecha,
    });
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
    setcodProducto(apiOne.nombre);
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
            <Card sx={{ marginLeft: 1 }}>
              <CardContent>
                <div key={elem.id}>
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
        <DialogTitle id="alert-dialog-title">Eliminar Mercaderia</DialogTitle>
        <DialogContent>
          <label className="labelListProductos">
            <input
              type="text"
              list="codigoProductos"
              className="inputListCodProductos"
              value={codProducto}
              onChange={(evt) => setcodProducto(evt.target.value)}
              placeholder="Cod Producto"
            />
          </label>

          <datalist id="codigoProductos">
            {inventarioNombres.map((elem) => {
              return <option value={elem.nombre} key={elem.id}></option>;
            })}
          </datalist>
          <TextField
            placeholder="Cantidad"
            value={stock}
            onChange={(evt) => setStock(evt.target.value)}
          />
          <TextField
            placeholder="Fecha"
            value={fecha}
            onChange={(evt) => setFecha(evt.target.value)}
          />
          <TextField
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
