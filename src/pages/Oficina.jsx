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
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocRemitoPdf from "./views/Remito";

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
  const [nroOrden, setNroOrden] = useState("");
  const [listProducts, setListProducts] = useState([]);

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
    const objetCliente = clientesList.find(elem => elem.id == id);
    if (objetCliente) 
      return objetCliente;
    else return {cuit: "", cliente: "",domicilio: ""}
  }

  const handleClickNew = (evt) => {
    evt.preventDefault();

    if (codProducto != null) {
      setCodProducto(null);
      setPedidos([...pedidos, codProducto]);
    } else toast.error("Completar el campo");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let enviar = {};
    enviar.fecha = fecha;
    enviar.numRemito = numRemito;
    enviar.idCliente = cliente;
    enviar.products = [];

    for (let i = 0; i < pedidos.length; i++) {
      const codProductoArray = pedidos[i];
      console.log(codProductoArray);

      let idProduct = codProductoArray.id;

      let stock = document.querySelector(`#stock-${codProductoArray.id}`).value;
      let ordenDeCompra = document.querySelector(
        `#ordenCompra-${codProductoArray.id}`
      ).value;
      let precio = document.querySelector(`#precio-${codProductoArray.id}`).value;

      enviar.products.push({ stock, ordenDeCompra, idProduct,precio });
    }
    setListProducts(enviar.products)
    console.log("ENVIAR",enviar);
  };

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
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
            <TextField
              label="N° Orden"
              value={nroOrden}
              type="number"
              placeholder="N° Orden"
              onChange={(evt) => setNroOrden(evt.target.value)}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <Box >
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
        <section>
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
                fecha={fecha || "" }
                domicilio={getClienteById(cliente).domicilio || ""}
                nroOrden={nroOrden || ""}
                products={listProducts}
              />
            }
            fileName="remito.pdf"
          >
            <button className="ml-2 p-3 rounded-lg border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
              DOWNLOAD PDF
            </button>
          </PDFDownloadLink>
          {viewPdf ? (
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              <DocRemitoPdf
                CUIT={getClienteById(cliente).cuit || ""}
                cliente={getClienteById(cliente).cliente || ""}
                fecha={fecha || "" }
                domicilio={getClienteById(cliente).domicilio || ""}
                nroOrden={nroOrden || ""}
                products={listProducts}
                listAllProducts={inventarioNombres}
              />
            </PDFViewer>
          ) : (
            <></>
          )}
        </section>
      </main>
    </>
  );
}
