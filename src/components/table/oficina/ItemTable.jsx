import { useContext, useEffect, useState } from "react";
import { OficinaContext } from "../../../context/OficinaContext";
import { InventarioContext } from "../../../context/InventarioContext";

import { TbPdf } from "react-icons/tb";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocRemitoPdf from "../../../pages/views/Remito";
import DocRemitoPdfItemTable from "../../../pages/views/RemitoItemTable";

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ItemTableOficina() {
  const { apiOne } = useContext(OficinaContext);
  const { getClienteName, clientesList } = useContext(InventarioContext);

  const [listMercaderia, setListMercaderia] = useState([]);
  const [numRemito, setNumRemito] = useState("");
  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState("");
  const [totalDeclarado, setTotalDeclarado] = useState("");

  const formatDate = (fecha) => {
    let info = fecha.split('-').join('/');
    const date = new Date(info);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  useEffect(() => {
    if (apiOne.remito != null) {
      setNumRemito(apiOne.remito.num_remito);
      setFecha(formatDate(apiOne.remito.fecha));
      setCliente(getClienteName(apiOne.remito.idCliente));
      setTotalDeclarado(apiOne.remito.total);
    }
    if (apiOne.mercaderia != null) {
      console.log(apiOne.mercaderia);
      setListMercaderia(apiOne.mercaderia);
    }
  }, [apiOne]);

  const getClienteById = (id) => {
    const objetCliente = clientesList.find((elem) => elem.id == id);
    if (objetCliente) return objetCliente;
    else return { cuit: "", cliente: "", domicilio: "" };
  };

  return (
    <>
      {apiOne.remito != null ? (
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border lg:mx-5 mx-1 mt-2">
          <h5 className="relative text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {numRemito}
            <span className="absolute right-1">
              <PDFDownloadLink
                document={
                  <DocRemitoPdfItemTable
                    CUIT={getClienteById(apiOne.remito.idCliente).cuit}
                    cliente={getClienteById(apiOne.remito.idCliente).cliente }
                    fecha={apiOne.remito.fecha}
                    domicilio={getClienteById(apiOne.remito.idCliente).domicilio}
                    totalDeclarado={apiOne.remito.total}
                    products={listMercaderia}
                  />
                }
                fileName={`${numRemito}-remito.pdf`}
              >
                <TbPdf
                  className="hover:text-red-500 cursor-pointer transition-all duration-300"
                />
              </PDFDownloadLink>
            </span>
          </h5>
          <p className="mb-4  text-neutral-600 dark:text-neutral-200 text-sm">
            {fecha} - {cliente} - {`$${totalDeclarado}`}
          </p>
          {listMercaderia.map((elem) => {
            return (
              <div key={elem.id}>
                <p>
                  ✔️{elem.nombre} - {elem.descripcion} -{" "}
                  <span className="text-red-400">{elem.stock}</span>
                </p>{" "}
                <p></p>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
