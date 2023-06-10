import * as React from "react";
import "./table.css";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import InfoItem from "./ItemTable/InfoItem";

import Pagination from "@mui/material/Pagination";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function TableMercaderia() {

  const { api } = React.useContext(MercaderiaContext);

  const LIMIT = 10;

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(LIMIT);

  const [index, setIndex] = React.useState(0);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setStart(end - LIMIT);
  });

  return (
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th>nombre</th>
              <th>descripcion</th>
              <th>cantidad</th>
              <th>fecha</th>
              <th>proveedor</th>
            </tr>
          </thead>
          <tbody className="bodyTableMercaderia">
            {[...api].slice(start, end).map((elem) => {
              return (
                <tr key={elem.id } onClick={() => setIndex(elem.id)}>
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
