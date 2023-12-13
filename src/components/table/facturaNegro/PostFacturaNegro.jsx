import { useContext, useState } from "react";
import { FacturaNegroContext } from "../../../context/FacturaNegroContext";
import { InventarioContext } from "../../../context/InventarioContext";

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSendEnvio } from "../../../services/api_otherTables";
import dayjs from "dayjs";

import { toast } from "react-toastify";
import { FiTrash } from "react-icons/fi";

export default function PostFacturaNegro() {
  const { postFacturaNegroBBDD } = useContext(FacturaNegroContext);
  const { inventarioNombres, clientesList, getClienteName,listToMercaderia } =
    useContext(InventarioContext);

  const [nroEnvio, setNroEnvio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [cliente, setCliente] = useState("");
  const [valorDeclarado, setValorDeclarado] = useState("");
  const [listProducts, setListProducts] = useState([]);

  const [dialogConfirm, setDialogConfirm] = useState(false);

  const [addClientDigrutt, setAddClientDigrutt] = useState(false);
  const [inputFecha, setInputFecha] = useState(null);

  //Todos los pedidos para mercaderia Salida
  const [pedidos, setPedidos] = useState([]);

  //Obtener por cliente y mostrar en el Autocomplete
  const [searchInventario, setSearchinventario] = useState([]);

  //Obtenemos el codProducto seleccionado de dicho cliente
  const [codProducto, setCodProducto] = useState(null);

  const handleClickNew = (evt) => {
    evt.preventDefault();

    setSearchinventario(
      searchInventario.filter((elem) => elem.id != codProducto.id)
    );

    if (codProducto != null) {
      setCodProducto(null);
      setPedidos([...pedidos, codProducto]);
    } else toast.error("Completar el campo");
  };

  const getDataListProductos = () => {
    let products = [];
    let valorDeclarado = 0;
    for (let i = 0; i < pedidos.length; i++) {
      const codProductoArray = pedidos[i];

      let idProduct = codProductoArray.id;

      let stock = document.querySelector(`#stock-${codProductoArray.id}`).value;

      let precio = document.querySelector(
        `#precio-${codProductoArray.id}`
      ).value;

      if (stock == "") stock = 1;
      if (stock <= 0) stock = 1;

      if (precio == "") precio = 0;
      if (precio <= 0) precio = 0;
      
      else valorDeclarado += parseFloat(precio);

      let findProduct = inventarioNombres.find((elem) => elem.id == idProduct);

      products.push({ stock, idProduct, precio, ...findProduct });
    }
    setValorDeclarado(valorDeclarado);
    setListProducts(products);

    return products;
  };

  const handleClickSend = (evt) => {
    let enviar = {};
    enviar.fecha = fecha;
    enviar.nro_envio = nroEnvio;
    enviar.idCliente = cliente;
    const data = getDataListProductos();
    enviar.products = data;

    postFacturaNegroBBDD(enviar);
    setDialogConfirm(false);
    empty();
  };

  const empty = () => {
    setNroEnvio("");
    setFecha(null);
    setCliente("");
    setPedidos([]);
    setCodProducto(null);
    setInputFecha(null);
  };

  const handleClickGetNroEnvio = async () => {
    const nro = await getSendEnvio();
    setNroEnvio(nro.nroEnvio);
  };

  const handleClickFechaActual = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const mounth = date.getMonth() + 1;
    const day = date.getDate();

    setFecha(`${year}-${mounth}-${day}`);
    setInputFecha(dayjs(`${year}-${mounth}-${day}`));
  };

  const handleClickAgregarListInventario = () => {
    if (listToMercaderia.length != 0) {
      const filter = listToMercaderia.filter(
        (elem) => elem.idCliente == cliente
      );

      for (let i = 0; i < filter.length; i++) {
        const element = filter[i];
        setSearchinventario(
          searchInventario.filter((elem) => elem.id != element.id)
        );
      }
      setPedidos(filter);
    }
  };

  return (
    <section>
      <h1 className="text-center font-bold text-2xl mt-2">
        Crear Nota de Envio
      </h1>
      <div className="mb-5">
        <section className="flex flex-col justify-around items-center lg:flex-row">
          <section className="grid place-content-center ">
            <div className="mx-4 flex flex-row">
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

            <div className="mx-4 my-2 flex flex-row ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Fecha"
                    value={inputFecha}
                    onChange={(evt, value) => {
                      if (evt != null) {
                        setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
                        setInputFecha(
                          dayjs(`${evt.$y}-${evt.$M + 1}-${evt.$D}`)
                        );
                      } else setFecha(undefined);
                    }}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button onClick={handleClickFechaActual}>Fecha Actual</Button>
            </div>

            <div className="mx-4 my-2 flex flex-col lg:flex-row">
              <Box className="w-full mr-2">
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
              <FormControlLabel
                control={
                  <Switch
                    value={addClientDigrutt}
                    onChange={(evt, checked) => {
                      setAddClientDigrutt(checked);

                      if (checked) {
                        //setCliente(9);
                        const filterClienteFromDigrutt =
                          inventarioNombres.filter((elm) => {
                            return elm.idCliente === 9;
                          });
                        searchInventario.push(...filterClienteFromDigrutt);
                        setSearchinventario(searchInventario);
                      } else {
                        if (searchInventario.length != 0) {
                          const filterCliente = searchInventario.filter(
                            (elm) => {
                              return elm.idCliente !== 9;
                            }
                          );
                          setSearchinventario(filterCliente);
                        }
                      }
                    }}
                    title="Agregar Productos de Digrutt"
                  />
                }
                label="Digrutt"
              />
            </div>
            <form action="" className="flex flex-col mx-4 my-2">
              <div className="flex flex-row w-[350px]">
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
            {cliente ? (
            <div className="my-5">
              <Button
                variant="outlined"
                className="w-full"
                onClick={handleClickAgregarListInventario}
              >
                Agregar por list inventario
              </Button>
            </div>
          ) : (
            <></>
          )}
          </section>
          <section className="grid place-content-center">
            <form action="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {pedidos.map((elem) => {
                  const stockActual = elem.entrada - elem.salida;
                  return (
                    <div
                      key={elem.id}
                      className="relative flex flex-col justify-between border p-2 rounded-md max-w-[340px] hover:translate-x-1 hover:translate-y-1 transition-transform duration-300"
                    >
                      <div className="flex flex-row">
                        {elem.urlImage ? (
                          <div>
                            <img
                              src={elem.urlImage}
                              alt="img"
                              className="w-15 h-10 "
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        <div>
                          <h2 className="font-bold uppercase">
                            {elem.nombre}{" "}
                            <span className="font-medium text-xs">
                              {getClienteName(elem.idCliente)}
                            </span>
                          </h2>
                          <p className="font-semibold text-sm text-gray-400">
                            {elem.descripcion}
                          </p>
                          <p className="font-semibold text-sm text-gray-400">
                            <b>Stock Actual: </b>
                            <span
                              className={
                                stockActual > 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }
                            >
                              {stockActual}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="mr-4">
                          <TextField
                            label="Cantidad"
                            type="number"
                            variant="standard"
                            id={`stock-${elem.id}`}
                            sx={{ width: 100 }}
                          />
                        </div>
                        <div className="mr-4">
                          <TextField
                            label="Precio"
                            type="number"
                            variant="standard"
                            id={`precio-${elem.id}`}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </div>

                      <div className="absolute right-2">
                        <Tooltip
                          title="borrar"
                          className=" hover:text-red-400"
                          onClick={() => {
                            const findPedidoDelete = pedidos.find(
                              (elm) => elm.id == elem.id
                            );
                            const filterDelete = pedidos.filter(
                              (elm) => elm.id !== elem.id
                            );

                            setSearchinventario([
                              findPedidoDelete,
                              ...searchInventario,
                            ]);
                            setPedidos(filterDelete);
                          }}
                        >
                          <IconButton size="small">
                            <FiTrash />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
              </div>

              {pedidos.length != 0 ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      getDataListProductos();
                      setDialogConfirm(true);
                    }}
                    className="ml-2 px-6 py-3 my-2 rounded-lg bg-blue-500 text-white border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
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
      <Dialog open={dialogConfirm} onClose={() => setDialogConfirm(false)}>
        <DialogTitle>Confirmar Nota Envio</DialogTitle>
        <DialogContent>
          <div className="flex flex-col sm:flex-row">
            <p className="px-1 font-semibold text-lg text-gray-400">
              {nroEnvio}
            </p>
            <p className="px-1 font-semibold text-lg text-gray-400">{fecha}</p>
            <p className="px-1 font-semibold text-lg uppercase text-gray-400">
              {getClienteName(cliente)}
            </p>
          </div>
          <Divider />
          {listProducts.map((elem) => {
            const stockActual = elem.entrada - elem.salida;
            return (
              <div key={elem.id}>
                <div className="my-2">
                  <div className="flex flex-row">
                    {elem.urlImage ? (
                      <div>
                        <img src={elem.urlImage} alt="" className="w-15 h-10" />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div>
                      <h2 className="font-bold uppercase">{elem.nombre} </h2>
                      <p className="font-semibold text-sm text-gray-400">
                        {elem.descripcion}
                      </p>
                      <p className="font-semibold text-sm text-gray-400">
                        <b>Stock Actual: </b>
                        <span
                          className={
                            stockActual > 0 ? "text-green-400" : "text-red-400"
                          }
                        >
                          {stockActual}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between">
                    <p> stock:{" " + elem.stock} </p>
                    <p> $ {elem.precio} </p>
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
          <p className="font-semibold text-lg text-end">
            <span className="font-semibold text-lg text-gray-400">
              Total Declarado{" "}
            </span>
            ${valorDeclarado}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConfirm(false)}>Cancelar</Button>
          <Button onClick={handleClickSend} variant="outlined">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
