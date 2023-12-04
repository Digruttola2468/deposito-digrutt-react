import { useContext, useEffect, useState } from "react";
import NavMenu from "../components/Menu";
import { OficinaContext } from "../context/OficinaContext";
import { AiFillDelete } from "react-icons/ai";


import ProgressComponent from "../components/progress/ProgressComponent";
import OficinaTable from "../components/table/oficina/OficinaTable";
import NewRemito from "../components/table/oficina/NewRemitoOficina";

export default function Oficina() {
  const { inventarioNombres, clientesList, sendRemito, loadingSend } =
    useContext(OficinaContext);

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

  const handleClickSend = (evt) => {
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

      let idProduct = codProductoArray.id;

      let stock = document.querySelector(`#stock-${codProductoArray.id}`).value;
      let ordenDeCompra = document.querySelector(
        `#ordenCompra-${codProductoArray.id}`
      ).value;
      let precio = document.querySelector(
        `#precio-${codProductoArray.id}`
      ).value;

      if (stock == "") stock = 0;

      if (precio == "") precio = 0;
      else valorDeclarado += parseFloat(precio);

      enviar.products.push({ stock, ordenDeCompra, idProduct, precio });
    }
    enviar.valorDeclarado = valorDeclarado;
    setListProducts(enviar.products);
    sendRemito(enviar);
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
      let ordenDeCompra = document.querySelector(
        `#ordenCompra-${codProductoArray.id}`
      ).value;
      let precio = document.querySelector(
        `#precio-${codProductoArray.id}`
      ).value;

      if (precio == "") precio = 0;

      valorDeclarado += parseFloat(precio);
      enviar.products.push({ stock, ordenDeCompra, idProduct, precio });
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

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <OficinaTable />
        <NewRemito />

        <ProgressComponent open={loadingSend} />
      </main>
    </>
  );
}
