import "./styleMercaderia.css";
import * as React from "react";

import { TableMercaderia } from "./table/Table";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Mercaderia() {
  const [fecha, setFecha] = React.useState();

  return (
    <section className="sectionContainer">
      <TableMercaderia
        apiUrl={"https://deposito-digrutt.up.railway.app/mercaderia/entrada"}
      />
      <section className="infoItemTable">
        <div>
          <Card sx={{ marginLeft: 1, marginTop: 1 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <h2>Nueva Mercaderia</h2>
              <TextField
                id="outlined-basic"
                label="N° Factura"
                variant="outlined"
                sx={{ margin: 1, width: 300 }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Fecha"
                    value={fecha}
                    onChange={() => setFecha(fecha)}
                    format="DD/MM/YYYY"
                    sx={{ margin: 1, width: 300 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                sx={{ margin: 1, width: 300 }}
              />
              <label className="labelListProductos">
                <input
                  type="text"
                  list="codigoProductos"
                  className="inputListCodProductos"
                  placeholder="Cod Producto"
                />
              </label>

              <datalist id="codigoProductos">
                <option value="bobina237"></option>  
                <option value="aditivo051"></option> 
                <option value="arandela334"></option>
                <option value="cubre320"></option>
                <option value="bolsa229"></option>  
                <option value="perilla079"></option>
                <option value="perilla084"></option>
                <option value="vaso302"></option>    
              </datalist>
            </CardContent>
            <CardActions>
              <Button variant="outlined">Agregar</Button>
              <Button variant="text">Clear</Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </section>
  );
}

export default Mercaderia;
