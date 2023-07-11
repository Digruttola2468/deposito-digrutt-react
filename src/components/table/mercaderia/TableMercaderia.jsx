import { useState, useContext, useEffect } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import InfoItem from "./ItemTable";

import Pagination from "@mui/material/Pagination";
import { useLocalStorage } from "usehooks-ts";

const HeadTable = () => {
  const {
    orderNombreASC,
    orderNombreDESC,
    orderFechaASC,
    orderFechaDESC,
    orderCantidadASC,
    orderCantidadDESC,
  } = useContext(MercaderiaContext);
  
  
  //1: ASC
  //0: DESC
  const [order, setOrder] = useState(1);


  const handleNombre = () => {
    if (order) orderNombreASC();
    else orderNombreDESC();
    setOrder(!order);
  };

  const handleFecha = () => {
    if (order) orderFechaASC();
    else orderFechaDESC();
    setOrder(!order);
  };

  const handleStock = () => {
    if (order) orderCantidadASC();
    else orderCantidadDESC();
    setOrder(!order);
  };

  return (
    <thead className="bg-gris-oscuro text-white border-b-[5px] border-celeste-oscuro ">
      <tr>
        <th onClick={handleNombre} className="cursor-pointer py-4 px-1" >
          nombre
        </th>
        <th>descripcion</th>
        <th onClick={handleStock} className="cursor-pointer py-4 px-1">
          cantidad
        </th>
        <th onClick={handleFecha} className="cursor-pointer py-4 px-1">
          fecha
        </th>
        <th className="py-4 px-1">proveedor</th>
      </tr>
    </thead>
  );
};

const BodyTable = ({ data, end, count }) => {
  const [start, setStart] = useState(0);
  const [index, setIndex] = useLocalStorage('selectIndexMercaderia', null);
  
  useEffect(() => setStart(end - count));

  return (
    <tbody className="">
      {data.length != 0 ? data.slice(start, end).map((elem) => {
        return (
          <tr key={elem.id} onClick={() => setIndex(elem.id)} className="hover:bg-celeste-claro cursor-pointer">
            <td className="py-4 px-1">{elem.nombre}</td>
            <td className="py-4 px-1">{elem.descripcion}</td>
            <td className="py-4 px-1">{elem.stock}</td>
            <td className="py-4 px-1">{elem.fecha}</td>
            <td className="py-4 px-1">{elem.proveedor}</td>
          </tr>
        );
      }) : <p className="text-red-500 relative m-auto left-[100%] z-20">NO HAY DATOS</p>}
    </tbody>
  );
};

export default function TableMercaderia() {
  const {api} = useContext(MercaderiaContext);

  const LIMIT = 10;
  const [end, setEnd] = useState(LIMIT);
  
  return (
    <div className="flex flex-col lg:flex-row justify-center  ">
      <div className="">
        <table className="block overflow-x-scroll whitespace-nowrap sm:text-center border-collapse sm:mt-5 border border-gris-oscuro">
          <HeadTable />
          <BodyTable data={api} end={end} count={LIMIT}/>
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt, value) => setEnd(LIMIT * parseInt(value))}
        />
      </div>
      <InfoItem />
    </div>
  );
}
