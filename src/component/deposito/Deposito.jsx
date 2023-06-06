import "./styleDeposito.css";
import * as React from "react";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";
import { TableInventario } from "../mercaderia/table/Table";

function Deposito() {
  return (
    <>
      <TableInventario
        apiUrl={"https://deposito-digrutt.up.railway.app/inventario"}
      />
      <div>
        <Card sx={{ marginLeft: 1, marginTop: 1 }}>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <h2>Nuevo Producto</h2>
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              sx={{ margin: 1, width: 300 }}
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              sx={{ margin: 1, width: 300 }}
            />
            <TextField
              id="outlined-basic"
              label="Color"
              variant="outlined"
              sx={{ margin: 1, width: 300 }}
            />
            <TextField
              id="outlined-basic"
              label="Tipo"
              variant="outlined"
              sx={{ margin: 1, width: 300 }}
            />
          </CardContent>
          <CardActions>
            <Button variant="outlined">Agregar</Button>
            <Button variant="text">Clear</Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default Deposito;
