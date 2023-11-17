import { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import { toast } from "react-toastify";

import { MdExpandMore } from "react-icons/md";

import { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useReadLocalStorage } from "usehooks-ts";
import { InventarioContext } from "../../../context/InventarioContext";

const filter = createFilterOptions();

export default function PutMercaderia() {
  const { createApi, idCategoria, createInventario } =
    useContext(MercaderiaContext);
  const { inventarioNombres } = useContext(InventarioContext);

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
    createInventario({
      nombre: dialogValue.cod,
      descripcion: dialogValue.descripcion,
    });
    handleClose();
  };

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");

  const [stock, setStock] = useState("");

  const [fecha, setFecha] = useState();

  const empty = () => {
    setFecha();
    setStock("");
    setInputValue("");
    setcodProducto("");
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
    createApi(
      {
        fecha,
        stock,
        idinventario: filter[0].id,
        idcategoria: idCategoria,
      }
    );

    empty();
  };

  return (
    <Accordion className="mt-2">
      <AccordionSummary expandIcon={<MdExpandMore />}>
        Nueva Mercaderia
      </AccordionSummary>
      <AccordionDetails>
        {idCategoria == 2 ? (
          <form className="flex flex-col">
            <div className="w-full flex flex-row items-center justify-between my-2">
              <p className="text-gray-400">
                {codProducto != undefined ? codProducto.descripcion : ""}
              </p>
            </div>
            <div className="flex flex-row">
              <Autocomplete
                disablePortal
                options={inventarioNombres}
                getOptionLabel={(elem) => elem.nombre}
                sx={{ width: 200, marginTop: 1 }}
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
                onInputChange={(_, newInputValue) =>
                  setInputValue(newInputValue)
                }
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
              <TextField
                helperText="Required"
                label="Cantidad"
                value={stock}
                type="number"
                onChange={(evt) => setStock(evt.target.value)}
                variant="outlined"
                sx={{ width: 150, marginLeft: 1, marginTop: 1 }}
              />
            </div>
            <div className="flex flex-row items-center ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{ width: 200 }}>
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
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="flex flex-row justify-end">
              <Button onClick={empty}>Limpiar</Button>
              <Button onClick={handleClickPost}>Agregar</Button>
            </div>
          </form>
        ) : (
          <></>
        )}
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
      </AccordionDetails>
    </Accordion>
  );
}
