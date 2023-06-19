import { useState, useContext, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import CardPost from "../../card/CardBodyPost";
import { toast } from "react-toastify";

export default function PutMercaderia() {
  const { createApi, inventarioNombres, idCategoria } =
    useContext(MercaderiaContext);

  const [factura, setFactura] = useState("");

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");

  const [stock, setStock] = useState("");

  const [fecha, setFecha] = useState();

  const empty = () => {
    setFactura("");
    setFecha();
    setStock("");
    setInputValue("");
    setcodProducto("");
  };

  const handleClickPost = () => {
    if (inputValue.length === 0) return toast.error("Campo Cod.Producto Vacio");

    if (fecha === undefined) return toast.error("Campo Fecha Vacia");

    if (stock.length === 0) return toast.error("Campo Cantidad vacio");

    if ( !Number.isInteger(parseInt(stock)) )
      return toast.error("Tiene que ser numerico campo cantidad");
    
    if (parseInt(stock) == NaN) 
      return toast.error("Tiene que ser numerico campo cantidad");
    

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
    <div className="infoItemTable">
      <CardPost
        title="Nueva Mercaderia"
        handlePost={handleClickPost}
        handleEmpty={empty}
      >
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Autocomplete
            disablePortal
            options={inventarioNombres}
            getOptionLabel={(elem) => elem.nombre}
            sx={{ width: 300, margin: 1 }}
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
          <p>{codProducto != undefined ? codProducto.descripcion : ""}</p>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Fecha"
              value={fecha || null}
              onChange={(evt, value) => {
                if (value.validationError != null)
                  return toast.error(value.validationError);
                else if (evt != null)
                  setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
                else setFecha(undefined);
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
          label="Cantidad"
          value={stock}
          type="number"
          onChange={(evt) => setStock(evt.target.value)}
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
    </div>
  );
}
