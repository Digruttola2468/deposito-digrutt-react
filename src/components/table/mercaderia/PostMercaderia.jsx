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

import Checkbox from "@mui/material/Checkbox";

import { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const filter = createFilterOptions();

export default function PutMercaderia() {
  const { createApi, inventarioNombres, idCategoria, createInventario } =
    useContext(MercaderiaContext);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    cod: "",
    descripcion: "",
  });

  const handleClose = () => {
    setDialogValue({
      cod: "",
      descripcion: "",
    });
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cod", dialogValue.cod);
    console.log("Descripcion", dialogValue.descripcion);
    createInventario({
      nombre: dialogValue.cod,
      descripcion: dialogValue.descripcion,
    });
    handleClose();
  };

  const [factura, setFactura] = useState("");

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");

  const [stock, setStock] = useState("");

  const [fecha, setFecha] = useState();

  const empty = () => {
    setFactura("");
    setFecha();
    setStock("");
    if (!checked) {
      setInputValue("");
      setcodProducto("");
    }
  };

  const handleClickPost = () => {
    if (inputValue.length === 0) return toast.error("Campo Cod.Producto Vacio");

    if (fecha === undefined) return toast.error("Campo Fecha Vacia");

    if (stock.length === 0) return toast.error("Campo Cantidad vacio");

    if (!Number.isInteger(parseInt(stock)))
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
    <form>
      <CardPost
        title="Nueva Mercaderia"
        handlePost={handleClickPost}
        handleEmpty={empty}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                size="small"
              />
            }
            label="Mantener el valor Cod.Producto"
            sx={{ marginLeft: 1 }}
          />
        </FormGroup>
        <div className="flex flex-row flex-wrap">
          <Autocomplete
            disablePortal
            options={inventarioNombres}
            getOptionLabel={(elem) => elem.nombre}
            sx={{ width: 300, margin: 1 }}
            value={codProducto || null}
            onChange={(evt, newValue) => {
              if (newValue && newValue.id === undefined) {
                toggleOpen(true);
                setDialogValue({
                  cod: newValue.inputValue,
                  descripcion: "",
                });
              } else setcodProducto(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  nombre: `Agregar "${params.inputValue}"`,
                });
              }

              return filtered;
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

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Nuevo Cod.Producto</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", padding: 3 }}
          >
            <TextField
              autoFocus
              value={dialogValue.cod}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  cod: event.target.value,
                })
              }
              label="cod. Producto"
              type="text"
              variant="standard"
            />
            <TextField
              value={dialogValue.descripcion}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  descripcion: event.target.value,
                })
              }
              label="Descripcion"
              multiline
              variant="standard"
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </form>
  );
}
