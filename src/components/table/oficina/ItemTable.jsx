import { useContext, useEffect, useState } from "react";
import { OficinaContext } from "../../../context/OficinaContext";
import { InventarioContext } from "../../../context/InventarioContext";

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
  const { getClienteName } = useContext(InventarioContext);

  const [listMercaderia, setListMercaderia] = useState([]);
  const [numRemito, setNumRemito] = useState("");
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
    if (apiOne.remito != null) {
      setNumRemito(apiOne.remito.num_remito);
      setFecha(formatDate(apiOne.remito.fecha));
      setCliente(getClienteName(apiOne.remito.idCliente));
      setTotalDeclarado(apiOne.remito.total);
    }
    if (apiOne.mercaderia != null) {
      setListMercaderia(apiOne.mercaderia);
    }
  }, [apiOne]);

  return (
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border lg:mx-5 mx-1 mt-2">
      <h5 className=" text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {numRemito}
      </h5>
      <p className="mb-4  text-neutral-600 dark:text-neutral-200 text-sm">
        {fecha} - {cliente} - {`$${totalDeclarado}`}
      </p>
      {listMercaderia.map((elem) => {
        return (
          <div key={elem.id}>
            <p>
              {elem.nombre} - {elem.descripcion} -{" "}
              <span className="text-red-400">{elem.stock}</span>
            </p>{" "}
            <p></p>
          </div>
        );
      })}
    </div>
  );
}
