
import { useContext, useEffect, useState } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import { FaFileExcel } from "react-icons/fa";
import { FacturaNegroContext } from "../../../context/FacturaNegroContext";

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

export default function ItemTableNotaEnvio() {
  const { apiOne } = useContext(FacturaNegroContext);
  const { getClienteName } = useContext(InventarioContext);

  const [listMercaderia, setListMercaderia] = useState([]);

  const [nro_envio, setNroEnvio] = useState("");
  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState("");
  const [totalDeclarado, setTotalDeclarado] = useState("");

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  useEffect(() => {
    if (apiOne.notaEnvio != null) {
      setNroEnvio(apiOne.notaEnvio.nro_envio);
      setFecha(formatDate(apiOne.notaEnvio.fecha));
      setCliente(getClienteName(apiOne.notaEnvio.idCliente));
      setTotalDeclarado(apiOne.notaEnvio.valorDeclarado);
    }
    if (apiOne.mercaderia != null) {
      setListMercaderia(apiOne.mercaderia);
    }
  }, [apiOne]);

  const handleClickExcel = () => {
    
  }

  return (
    <>
      {apiOne.notaEnvio != null ? (
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border lg:mx-5 mx-1 mt-2">
          <h5 className="relative text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {nro_envio}
            <span className="absolute right-1">
              <FaFileExcel className="hover:text-green-700 cursor-pointer transition-all duration-300" onClick={handleClickExcel} />
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
