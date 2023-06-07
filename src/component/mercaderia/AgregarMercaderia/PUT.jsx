import { useState, useContext } from "react";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

export default function PutMercaderia() {
  const { createApi, inventarioNombres } = useContext(MercaderiaContext);

  //2 - Entrada
  //1 - Salida
  const [idcategoria, setIdCategoria] = useState(2);

  const [factura, setFactura] = useState("");
  const [codProducto, setcodProducto] = useState("");
  const [stock, setStock] = useState("");
  const [fecha, setFecha] = useState();

  const empty = () => {
    setFactura("");
    setFecha();
    setStock("");
    setcodProducto("");
  };

  const handleClickPost = () => {
    const filter = inventarioNombres.filter((elem) => elem.nombre == codProducto);
    createApi({
      fecha,
      factura,
      stock,
      idinventario: filter[0].id,
      idcategoria,
    });
    empty();
  };

  return (
    <Card sx={{ marginLeft: 1, marginTop: 1 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Nueva Mercaderia</h2>
        <label className="labelListProductos">
          <input
            type="text"
            list="codigoProductos"
            className="inputListCodProductos"
            value={codProducto}
            onChange={(evt) => setcodProducto(evt.target.value)}
            placeholder="Cod Producto"
          />
          <p className="required">Required</p>
        </label>

        <datalist id="codigoProductos">
          {inventarioNombres.map((elem) => {
            return <option value={elem.nombre} key={elem.id}></option>;
          })}
        </datalist>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Fecha"
              value={fecha}
              onChange={(evt) => {
                setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
              }}
              slotProps={{
                textField: {
                  helperText: "Required",
                },
              }}
              format="DD/MM/YYYY"
              sx={{ margin: 1, width: 300 }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          helperText="Required"
          id="outlined-basic"
          label="Cantidad"
          value={stock}
          onChange={(evt) => setStock(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
        <TextField
          id="outlined-basic"
          label="N° Factura"
          value={factura}
          onChange={(evt) => setFactura(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClickPost}>
          Agregar
        </Button>
        <Button variant="text" onClick={() => empty()}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
}
