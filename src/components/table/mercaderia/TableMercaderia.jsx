import { useState, useContext, useEffect } from "react";
import "./table.css";

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
    <thead>
      <tr>
        <th onClick={handleNombre} style={{ cursor: "pointer" }}>
          nombre
        </th>
        <th>descripcion</th>
        <th onClick={handleStock} style={{ cursor: "pointer" }}>
          cantidad
        </th>
        <th onClick={handleFecha} style={{ cursor: "pointer" }}>
          fecha
        </th>
        <th>proveedor</th>
      </tr>
    </thead>
  );
};

const BodyTable = ({ data, end, count }) => {
  const [start, setStart] = useState(0);
  const [index, setIndex] = useLocalStorage('selectIndexMercaderia', null);
  
  useEffect(() => setStart(end - count));

  return (
    <tbody className="bodyTableMercaderia">
      {data.slice(start, end).map((elem) => {
        return (
          <tr key={elem.id} onClick={() => setIndex(elem.id)}>
            <td>{elem.nombre}</td>
            <td>{elem.descripcion}</td>
            <td>{elem.stock}</td>
            <td>{elem.fecha}</td>
            <td>{elem.proveedor}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default function TableMercaderia() {
  const {api} = useContext(MercaderiaContext);

  const LIMIT = 10;
  const [end, setEnd] = useState(LIMIT);
  
  return (
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <HeadTable />
          <BodyTable data={api} end={end} count={LIMIT}/>
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt) => setEnd(LIMIT * parseInt(evt.target.innerText))}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <InfoItem />
      </div>
    </div>
  );
}
