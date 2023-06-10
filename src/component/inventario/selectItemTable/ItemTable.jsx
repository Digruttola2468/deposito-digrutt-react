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
import IconButtonMui from "../../mercaderia/IconButtonMui/Button";

//Context
import { InventarioContext } from "../../../context/InventarioContext";

//REACT ICONS
import { FaTrash, FaPen } from "react-icons/fa";

export default function SelectItemInventario({ index }) {
  const { api, updateApi } = useContext(InventarioContext);

  //Dialog
  const [openActualizar, setOpenActualizar] = useState(false);

  //Get api when click item table
  const [apiOne, setapiOne] = useState([]);

  //TextField Update
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");

  const handleUpdate = () => {
    updateApi(
      apiOne.idinventario,
      {
        nombre,
        descripcion,
      },
      { Entrada: apiOne.Entrada, Salida: apiOne.Salida }
    );
    handleCloseUpdate();
  };

  //DIALOG
  const handleCloseUpdate = () => setOpenActualizar(false);

  const handleOpenUpdate = () => {
    setDescripcion(apiOne.descripcion);
    setNombre(apiOne.nombre);
    setOpenActualizar(true);
  };

  useEffect(() => {
    api
      .filter((elem) => elem.idinventario == index)
      .map((elem) => setapiOne(elem));
    return () => {};
  });

  return (
    <div>
      {api
        .filter((elem) => elem.idinventario == index)
        .map((elem) => {
          return (
            <Card key={elem.idinventario} sx={{ marginLeft: 1, marginTop: 3 }}>
              <CardContent>
                <div>
                  <h2>{elem.nombre}</h2>
                  <p>
                    <b>Descripcion</b>: {elem.descripcion}
                  </p>
                  <p>
                    <b>Salida</b>: {elem.Salida}
                  </p>
                  <p>
                    <b>Entrada</b>: {elem.Entrada}
                  </p>
                  <p>
                    <b>Stock Actual</b>: {elem.Entrada - elem.Salida}
                  </p>
                </div>
              </CardContent>
              <CardActions>
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
        open={openActualizar}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Actualizar Inventario</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", padding: 3 }}
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
