import { useContext, useState, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import SelectItemInventario from "./ItemTable";

import { useLocalStorage } from "usehooks-ts";

import Pagination from "@mui/material/Pagination";
import SearchCodProducto from "../../search/SearchInventario";

const HeadTable = () => {
  const { orderNombreASC, orderNombreDES } = useContext(InventarioContext);
  const [order,setOrder] = useState(false);

  //Handle Button
  const handleNombre = () => {
    if (order) orderNombreASC();
    else orderNombreDES();
    setOrder(!order);
  };
  return (
    <thead className="tableHeader">
      <tr>
        <th onClick={handleNombre} className="cursor-pointer py-4 px-1">
          nombre
        </th>
        <th>descripcion</th>
        <th>entrada</th>
        <th>salida</th>
        <th>stockActual</th>
      </tr>
    </thead>
  );
};

const BodyTable = ({ data, end, count }) => {
  const [index, setIndex] = useLocalStorage("selectIndexInventario", 0);
  const [start, setStart] = useState(0);

  useEffect(() => setStart(end - count));

  return (
    <tbody>
      {data.length != 0 ? (
        data.slice(start, end).map((elem) => {
          return (
            <tr
              key={elem.id}
              onClick={() => setIndex(elem.id)}
              className="hover:bg-celeste-claro cursor-pointer"
            >
              <td className="py-4 px-1">{elem.nombre}</td>
              <td className="py-4 px-1"> {elem.descripcion}</td>
              <td className="py-4 px-1">{elem.entrada}</td>
              <td className="py-4 px-1">{elem.salida}</td>
              <td className="py-4 px-1">{elem.entrada - elem.salida}</td>
            </tr>
          );
        })
      ) : (
        <tr className="">
          <td></td>
          <td></td>
          <td className="text-red-400">NO HAY DATOS</td>
          <td></td>
          <td></td>
        </tr>
      )}
    </tbody>
  );
};

export default function TableComponent() {
  const { api } = useContext(InventarioContext);
  
  const LIMIT = 10;
  const [end, setEnd] = useState(LIMIT);

  return (
    <div className="flex flex-col lg:flex-row justify-center ">
      <div className="p-3 flex flex-col items-center shadow-lg">
        <SearchCodProducto />
        <table className="table">
          <HeadTable />
          <BodyTable data={api} count={LIMIT} end={end} />
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt, newValue) => setEnd(LIMIT * parseInt(newValue))}
        />
      </div>

      <SelectItemInventario />
    </div>
  );
}
