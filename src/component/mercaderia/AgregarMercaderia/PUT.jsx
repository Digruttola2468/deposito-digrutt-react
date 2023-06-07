import { useState, useContext, useEffect } from "react";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
  const [codProducto, setcodProducto] = useState();
  const [stock, setStock] = useState("");
  const [fecha, setFecha] = useState();

  const [inputValue, setInputValue] = useState("");

  const empty = () => {
    setFactura("");
    setFecha();
    setStock("");
    setInputValue("");
    setcodProducto("");
  };

  const handleClickPost = () => {
    const filter = inventarioNombres.filter(
      (elem) => elem.nombre == codProducto.nombre
    );
    createApi({
      fecha,
      proveedor: factura,
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={inventarioNombres}
          getOptionLabel={(elem) => elem.nombre}
          sx={{ width: 300, marginLeft: 1 }}
          value={codProducto || null}
          onChange={(evt, newValue) => setcodProducto(newValue)}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText="Required"
              value={"Hola"}
              label="Cod Producto"
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Fecha"
              value={fecha || null}
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
          type="number"
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
