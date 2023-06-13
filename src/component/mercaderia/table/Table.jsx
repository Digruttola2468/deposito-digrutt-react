import * as React from "react";
import "./table.css";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import InfoItem from "./ItemTable/InfoItem";

import Pagination from "@mui/material/Pagination";

export function TableMercaderia() {
  const {
    api,
    orderNombreASC,
    orderNombreDESC,
    orderFechaASC,
    orderFechaDESC,
    orderCantidadASC,
    orderCantidadDESC,
  } = React.useContext(MercaderiaContext);

  const LIMIT = 10;

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(LIMIT);
  const [index, setIndex] = React.useState(0);

  //1: ASC
  //0: DESC
  const [order, setOrder] = React.useState(1);

  React.useEffect(() => {
    setStart(end - LIMIT);
  });

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
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th onClick={handleNombre} style={{ cursor: "pointer" }}>
                nombre
              </th>
              <th>descripcion</th>
              <th onClick={handleStock} style={{ cursor: "pointer" }}>cantidad</th>
              <th onClick={handleFecha} style={{ cursor: "pointer" }}>
                fecha
              </th>
              <th>proveedor</th>
            </tr>
          </thead>
          <tbody className="bodyTableMercaderia">
            {[...api].slice(start, end).map((elem) => {
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
        </table>
        <Pagination
          count={Math.ceil(api.length / LIMIT)}
          onChange={(evt) => setEnd(LIMIT * parseInt(evt.target.innerText))}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <InfoItem index={index} />
      </div>
    </div>
  );
}
