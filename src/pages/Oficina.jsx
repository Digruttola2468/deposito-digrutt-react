import { useContext, useEffect, useState } from "react";
import NavMenu from "../components/Menu";
import { OficinaContext } from "../context/OficinaContext";
import { AiFillDelete } from "react-icons/ai";

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function Oficina() {
  const {
    inventarioNombres,
    getInventarioNombres,
    getClientesAPI,
    clientesList,
  } = useContext(OficinaContext);

  //Campos fundamental Remito
  const [numRemito, setNumRemito] = useState("");
  const [fecha, setFecha] = useState(null);
  const [cliente, setCliente] = useState("");

  //Obtener por cliente y mostrar en el Autocomplete
  const [searchInventario, setSearchinventario] = useState([]);

  //Obtenemos el codProducto seleccionado de dicho cliente
  const [codProducto, setCodProducto] = useState(null);

  //Si o Si hay que colocar el cliente
  const [disableInputCodProduct, setDisableInputCodProduct] = useState(true);

  //Todos los pedidos para mercaderia Salida
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getInventarioNombres();
    getClientesAPI();
  }, []);

  const handleClickNew = (evt) => {
    evt.preventDefault();

    if (codProducto != null) {
      setCodProducto(null);
      setPedidos([...pedidos, codProducto]);
    } else toast.error("Completar el campo");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    for (let i = 0; i < pedidos.length; i++) {
      const codProductoArray = pedidos[i];

      console.log(
        document.querySelector(`#input-${codProductoArray.id}`).value
      );
      console.log(
        document.querySelector(`#stock-${codProductoArray.id}`).value
      );
      console.log(
        document.querySelector(`#ordenCompra-${codProductoArray.id}`).value
      );
    }
  };

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <section className="grid place-content-center ">
          <h1 className="mb-5 font-bold">REMITO N°{numRemito}</h1>
          <TextField
            label="N° Remito"
            value={numRemito}
            type="number"
            placeholder="N° Remito"
            onChange={(evt) => setNumRemito(evt.target.value)}
            className="mb-5"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Fecha"
                value={fecha}
                onChange={(evt, value) => {
                  if (value.validationError != null)
                    return toast.error(value.validationError);
                  else if (evt != null)
                    setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
                  else setFecha(undefined);
                }}
                format="DD/MM/YYYY"
                className="mb-2"
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box className="mt-2">
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={cliente}
                label="Cliente"
                onChange={(evt) => {
                  const comboBoxCliente = evt.target.value;
                  setCliente(comboBoxCliente);
                  if (comboBoxCliente != "") {
                    setDisableInputCodProduct(false);
                    const filterCliente = inventarioNombres.filter((elm) => {
                      return elm.idCliente === comboBoxCliente;
                    });
                    setSearchinventario(filterCliente);
                  } else setDisableInputCodProduct(true);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {clientesList.map((elem) => {
                  return (
                    <MenuItem key={elem.id} value={elem.id}>
                      {elem.cliente}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <form action="" className="flex flex-col mt-5">
            <div className="flex flex-row">
              <Autocomplete
                disabled={disableInputCodProduct}
                options={searchInventario}
                getOptionLabel={(elem) => elem.nombre}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 200 }}
                value={codProducto}
                onChange={(evt, newValue) => {
                  setCodProducto(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Buscar" variant="outlined" />
                )}
                className="mr-3 "
              />
              <Button
                disabled={disableInputCodProduct}
                onClick={handleClickNew}
                variant="outlined"
              >
                Agregar
              </Button>
            </div>
            <div>
              {
                codProducto != null ? (<p>
                  <b>Descripcion: </b>{codProducto.descripcion}
                </p>) : <></>
              }
              
            </div>
          </form>
        </section>
        <section className="grid place-content-center">
          <form action="">
            {pedidos.map((elem) => {
              return (
                <div
                  key={elem.id}
                  className="my-4 flex flex-row items-center justify-around"
                >
                  <div className="mr-4">
                    <TextField
                      label="Cod Producto"
                      type="text"
                      variant="standard"
                      defaultValue={elem.nombre}
                      id={`input-${elem.id}`}
                      sx={{ width: 150 }}
                    />
                  </div>
                  <div className="mr-4">
                    <TextField
                      label="Stock"
                      type="number"
                      variant="standard"
                      id={`stock-${elem.id}`}
                      className="ml-4"
                      sx={{ width: 100 }}
                    />
                  </div>
                  <div className="mr-4">
                    <TextField
                      label="Orden De Compra"
                      type="text"
                      variant="standard"
                      id={`ordenCompra-${elem.id}`}
                      className="ml-4"
                      sx={{ width: 150 }}
                    />
                  </div>

                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        const filterDelete = pedidos.filter(
                          (elm) => elm.id !== elem.id
                        );
                        setPedidos(filterDelete);
                      }}
                    >
                      <AiFillDelete />
                    </IconButton>
                  </div>
                </div>
              );
            })}
            {pedidos.length != 0 ? (
              <Button variant="contained" onClick={handleSubmit}>
                Agregar Mercaderia
              </Button>
            ) : (
              <></>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
