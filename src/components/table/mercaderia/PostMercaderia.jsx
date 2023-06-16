import { useState, useContext, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import CardPost from "../../card/CardBodyPost";

export default function PutMercaderia() {
  const { createApi, inventarioNombres, idCategoria } =
    useContext(MercaderiaContext);

  const [factura, setFactura] = useState("");

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");
  const [inputCodError, setInputCodError] = useState(false);

  const [stock, setStock] = useState("");
  const [inputStockError, setInputStockError] = useState(false);

  const [fecha, setFecha] = useState();
  const [inputFechaError, setInputFechaError] = useState(false);

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
      idcategoria: idCategoria,
    });

    empty();
  };

  return (
    <section className="infoItemTable">
      <CardPost
        title="Nueva Mercaderia"
        handlePost={handleClickPost}
        handleEmpty={empty}
      >
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          <Autocomplete
            disablePortal
            options={inventarioNombres}
            getOptionLabel={(elem) => elem.nombre}
            sx={{ width: 300, margin: 1 }}
            value={codProducto || null}
            onChange={(evt, newValue) => {
              setcodProducto(newValue);
              setInputCodError(false);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={inputCodError}
                helperText="Required"
                value={"Hola"}
                label="Cod Producto"
              />
            )}
          />
          <p>{codProducto != undefined ? codProducto.descripcion : ""}</p>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Fecha"
              value={fecha || null}
              onChange={(evt) => {
                setInputFechaError(false);
                setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
              }}
              slotProps={{
                textField: {
                  error: inputFechaError,
                  helperText: "Required",
                },
              }}
              format="DD/MM/YYYY"
              sx={{ margin: 1, width: 300 }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          error={inputStockError}
          helperText="Required"
          label="Cantidad"
          value={stock}
          type="number"
          onChange={(evt) => {
            setStock(evt.target.value);
            setInputStockError(false);
          }}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
        <TextField
          label="N° Factura"
          value={factura}
          onChange={(evt) => setFactura(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1, width: 300 }}
        />
      </CardPost>
    </section>
  );
}
