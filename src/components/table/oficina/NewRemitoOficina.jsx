import { useContext, useState } from "react";
import { OficinaContext } from "../../../context/OficinaContext";
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
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocRemitoPdf from "../../../pages/views/Remito";
import { InventarioContext } from "../../../context/InventarioContext";
import { FiTrash } from "react-icons/fi";
import dayjs from "dayjs";

export default function NewRemito() {
  const { inventarioNombres, clientesList, sendRemito } =
    useContext(OficinaContext);
  const { getClienteName, listToMercaderia } = useContext(InventarioContext);

  const [dialogConfirm, setDialogConfirm] = useState(false);

  //Campos Remito
  const [numRemito, setNumRemito] = useState("");
  const [fecha, setFecha] = useState(null);
  const [cliente, setCliente] = useState("");
  const [nroOrden, setNroOrden] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [valorDeclarado, setValorDeclarado] = useState(0);

  //View PDF
  const [viewPdf, setViewPdf] = useState(false);

  //Obtener por cliente y mostrar en el Autocomplete
  const [searchInventario, setSearchinventario] = useState([]);

  //Obtenemos el codProducto seleccionado de dicho cliente
  const [codProducto, setCodProducto] = useState(null);

  //Si o Si hay que colocar el cliente
  const [disableInputCodProduct, setDisableInputCodProduct] = useState(true);

  //Todos los pedidos para mercaderia Salida
  const [pedidos, setPedidos] = useState([]);

  const getClienteById = (id) => {
    const objetCliente = clientesList.find((elem) => elem.id == id);
    if (objetCliente) return objetCliente;
    else return { cuit: "", cliente: "", domicilio: "" };
  };

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

  const getDataListPedido = () => {
    let list = [];
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

      let findProduct = inventarioNombres.find((elem) => elem.id == idProduct);

      list.push({ stock, idProduct, precio, ...findProduct });
    }
    setValorDeclarado(valorDeclarado);
    setListProducts(list);

    return list;
  };

  const handleClickSend = (evt) => {
    evt.preventDefault();

    let enviar = {};
    enviar.fecha = fecha;
    enviar.numRemito = numRemito;
    enviar.idCliente = cliente;
    enviar.nroOrden = nroOrden;
    enviar.products = [];
    enviar.valorDeclarado = valorDeclarado;

    const data = getDataListPedido();
    enviar.products = data;

    sendRemito(enviar);
    setDialogConfirm(false);
    empty();
  };

  const handleClickShowPdf = (evt) => {
    evt.preventDefault();

    let enviar = {};
    enviar.fecha = fecha;
    enviar.numRemito = numRemito;
    enviar.idCliente = cliente;
    enviar.nroOrden = nroOrden;
    enviar.products = [];

    let valorDeclarado = 0;
    for (let i = 0; i < pedidos.length; i++) {
      const codProductoArray = pedidos[i];
      console.log(codProductoArray);

      let idProduct = codProductoArray.id;

      let stock = document.querySelector(`#stock-${codProductoArray.id}`).value;
      let precio = document.querySelector(
        `#precio-${codProductoArray.id}`
      ).value;

      if (precio == "") precio = 0;

      valorDeclarado += parseFloat(precio);
      enviar.products.push({ stock, idProduct, precio });
    }
    enviar.valorDeclarado = valorDeclarado;

    setListProducts(enviar.products);
  };

  const empty = () => {
    setNumRemito("");
    setFecha(null);
    setCliente("");
    setNroOrden("");
    setListProducts([]);
    setPedidos([]);
    setViewPdf(false);
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
    <>
      <section className="flex flex-col justify-center items-center gap-5 lg:flex-row">
        <section className="grid place-content-center ">
          <h1 className="mt-3 font-bold">REMITO N°{numRemito}</h1>
          <div className="mt-4 ">
            <TextField
              label="N° Remito"
              value={numRemito}
              type="number"
              placeholder="N° Remito"
              onChange={(evt) => setNumRemito(evt.target.value)}
              className="w-full"
            />
          </div>

          <div className="mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Fecha"
                  value={dayjs(fecha)}
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
            <TextField
              label="N° Orden"
              value={nroOrden}
              type="text"
              placeholder="N° Orden"
              onChange={(evt) => setNroOrden(evt.target.value)}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <Box>
              <FormControl fullWidth>
                <InputLabel>Cliente</InputLabel>
                <Select
                  value={cliente}
                  label="Cliente"
                  onChange={(evt) => {
                    setListProducts([]);
                    setPedidos([]);
                    setCodProducto(null);
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
          </div>
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
        <section className="flex flex-col">
          <form action="" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            stockActual > 0 ? "text-green-400" : "text-red-400"
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
                            <InputAdornment position="start">$</InputAdornment>
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
          </form>
          {pedidos.length != 0 ? (
            <div className="flex flex-row justify-self-start my-2">
              <button
                onClick={() => {
                  getDataListPedido();
                  setDialogConfirm(true);
                }}
                className="ml-2 px-6 py-3 rounded-lg bg-blue-500 text-white border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              >
                Enviar
              </button>
              <button
                onClick={handleClickShowPdf}
                className="ml-2 p-3  gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              >
                Agregar PDF
              </button>
            </div>
          ) : (
            <></>
          )}
        </section>
      </section>

      <section className="mt-5">
        <button
          onClick={() => setViewPdf(!viewPdf)}
          className="ml-2 p-3 rounded-lg border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
        >
          Ver PDF
        </button>
        <PDFDownloadLink
          document={
            <DocRemitoPdf
              CUIT={getClienteById(cliente).cuit || ""}
              cliente={getClienteById(cliente).cliente || ""}
              fecha={fecha || ""}
              domicilio={getClienteById(cliente).domicilio || ""}
              nroOrden={nroOrden || ""}
              products={listProducts}
              listAllProducts={inventarioNombres}
            />
          }
          fileName="remito.pdf"
        >
          <button className="ml-2 p-3 rounded-lg border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
            DOWNLOAD PDF
          </button>
        </PDFDownloadLink>
        {viewPdf ? (
          <PDFViewer className="w-full h-screen">
            <DocRemitoPdf
              CUIT={getClienteById(cliente).cuit || ""}
              cliente={getClienteById(cliente).cliente || ""}
              fecha={fecha || ""}
              domicilio={getClienteById(cliente).domicilio || ""}
              nroOrden={nroOrden || ""}
              products={listProducts}
              listAllProducts={inventarioNombres}
            />
          </PDFViewer>
        ) : (
          <></>
        )}

        <Dialog open={dialogConfirm} onClose={() => setDialogConfirm(false)}>
          <DialogTitle>Confirmar Remito</DialogTitle>
          <DialogContent>
            <div className="flex flex-col sm:flex-row">
              <p className="px-1 font-semibold text-lg text-gray-400">
                {numRemito}
              </p>
              <p className="px-1 font-semibold text-lg text-gray-400">
                {fecha}
              </p>
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
                          <img
                            src={elem.urlImage}
                            alt=""
                            className="w-15 h-10"
                          />
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
    </>
  );
}
