import { useContext, useState } from "react";
import { MercaderiaContext } from "../../../context/MercaderiaContext";
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
import { AiFillDelete } from "react-icons/ai";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSendEnvio } from "../../../services/api_otherTables";

export default function PostFacturaNegro() {
  const { inventarioNombres, clientesList, postAllFacturaNegro } =
    useContext(MercaderiaContext);

  const [nroEnvio, setNroEnvio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [cliente, setCliente] = useState("");

  //Todos los pedidos para mercaderia Salida
  const [pedidos, setPedidos] = useState([]);

  //Obtener por cliente y mostrar en el Autocomplete
  const [searchInventario, setSearchinventario] = useState([]);

  //Obtenemos el codProducto seleccionado de dicho cliente
  const [codProducto, setCodProducto] = useState(null);

  const handleClickNew = (evt) => {
    evt.preventDefault();

    if (codProducto != null) {
      setCodProducto(null);
      setPedidos([...pedidos, codProducto]);
    } else toast.error("Completar el campo");
  };

  const handleClickSend = (evt) => {
    evt.preventDefault();

    let enviar = {};
    enviar.fecha = fecha;
    enviar.nro_envio = nroEnvio;
    enviar.idCliente = cliente;
    enviar.products = [];

    let valorDeclarado = 0;
    for (let i = 0; i < pedidos.length; i++) {
      const codProductoArray = pedidos[i];

      let idProduct = codProductoArray.id;

      let stock = document.querySelector(`#stock-${codProductoArray.id}`).value;

      let precio = document.querySelector(
        `#precio-${codProductoArray.id}`
      ).value;

      if (stock == "") stock = 0;
      if (precio == "") precio = 0;
      else valorDeclarado += parseFloat(precio);

      enviar.products.push({ stock, idProduct, precio });
    }
    enviar.valorDeclarado = valorDeclarado;

    postAllFacturaNegro(enviar);
    empty();
  };

  const empty = () => {
    setNroEnvio("");
    setFecha(null);
    setCliente("");
    setPedidos([]);
    setCodProducto(null);
  };

  const handleClickGetNroEnvio = async () => {
    const nro = await getSendEnvio();
    setNroEnvio(nro.nroEnvio);
  };

  return (
    <>
      <h1 className="text-center font-bold text-2xl mt-2">
        Crear Nota de Envio
      </h1>
      <div className="mb-5">
        <section className="flex flex-col justify-around items-center lg:flex-row">
          <section className="grid place-content-center ">
            <div className="mt-4 flex flex-row">
              <TextField
                label="Nota Envio"
                value={nroEnvio}
                type="number"
                placeholder="Nota Envios"
                onChange={(evt) => setNroEnvio(evt.target.value)}
                className="w-full"
              />
              <Button onClick={handleClickGetNroEnvio}>
                Obtener Nro Envio
              </Button>
            </div>

            <div className="mt-2">
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
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="mt-3">
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    value={cliente}
                    label="Cliente"
                    onChange={(evt) => {
                      setPedidos([]);
                      setCodProducto(null);
                      const comboBoxCliente = evt.target.value;
                      setCliente(comboBoxCliente);
                      if (comboBoxCliente != "") {
                        const filterCliente = inventarioNombres.filter(
                          (elm) => {
                            return elm.idCliente === comboBoxCliente;
                          }
                        );
                        setSearchinventario(filterCliente);
                      }
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
            </div>

            <form action="" className="flex flex-col mt-5">
              <div className="flex flex-row">
                <Autocomplete
                  options={searchInventario}
                  getOptionLabel={(elem) => elem.nombre}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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
                <Button onClick={handleClickNew} variant="outlined">
                  Agregar
                </Button>
              </div>
              <div>
                {codProducto != null ? (
                  <p>
                    <b>Descripcion: </b>
                    {codProducto.descripcion}
                  </p>
                ) : (
                  <></>
                )}
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
                        disabled
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
                        label="Precio"
                        type="number"
                        variant="standard"
                        id={`precio-${elem.id}`}
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
                <>
                  <button
                    onClick={handleClickSend}
                    className="ml-2 px-6 py-3 rounded-lg bg-blue-500 text-white border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                  >
                    Enviar
                  </button>
                </>
              ) : (
                <></>
              )}
            </form>
          </section>
        </section>
      </div>
    </>
  );
}
