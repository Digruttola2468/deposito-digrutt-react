import { useContext, useState, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import SelectItemInventario from "./ItemTable";

import { useLocalStorage } from "usehooks-ts";

import Pagination from "@mui/material/Pagination";

const BodyTable = ({ data , end, count }) => {
  const [index,setIndex] = useLocalStorage('selectIndexInventario', 0);
  const [start, setStart] = useState(0);
  
  useEffect(() => setStart(end - count));

  return (
    <tbody className="bodyTableMercaderia">
      {data.slice(start, end).map((elem) => {
        return (
          <tr key={elem.id} onClick={() => setIndex(elem.id)}>
            <td>{elem.nombre}</td>
            <td>{elem.descripcion}</td>
            <td>{elem.Entrada}</td>
            <td>{elem.Salida}</td>
            <td>{elem.Entrada - elem.Salida}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default function TableComponent() { 
  const { api, orderNombreASC, orderNombreDES } = useContext(InventarioContext);

  const LIMIT = 10;

  //1: ASC 
  //0: DESC
  const [order, setOrder] = useState(1);
  const [end, setEnd] = useState(LIMIT);

  //Handle Button
  const handleNombre = () => {
    if (order) orderNombreASC();
    else orderNombreDES();
    setOrder(!order);
  };

  return (
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th onClick={handleNombre} style={{ cursor: "pointer" }}>
                nombre
              </th>
              <th>descripcion</th>
              <th>entrada</th>
              <th>salida</th>
              <th>stockActual</th>
            </tr>
          </thead>
          <BodyTable
            data={api}
            count={LIMIT}
            end={end}
          />
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt) => setEnd(LIMIT * parseInt(evt.target.innerText))}
        />
      </div>

      <SelectItemInventario />
    </div>
  );
}
