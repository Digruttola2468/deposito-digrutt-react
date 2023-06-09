import { useContext, useState, useEffect } from "react";

import { InventarioContext } from "../../../context/InventarioContext";

//MUI
import Pagination from "@mui/material/Pagination";
import SelectItemInventario from "../selectItemTable/ItemTable";

export default function InventarioTable() {
  const { api } = useContext(InventarioContext);

  const LIMIT = 10;
  const [open, setOpen] = useState(false);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(LIMIT);

  const [index, setIndex] = useState(0);

  const [page, setPage] = useState(1);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => setStart(end - LIMIT));

  return (
    <div className="divTable">
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th>nombre</th>
              <th>descripcion</th>
              <th>entrada</th>
              <th>salida</th>
              <th>stockActual</th>
            </tr>
          </thead>
          <tbody className="bodyTableMercaderia">
            {api.slice(start, end).map((elem) => {
              return (
                <tr
                  key={api.idinventario}
                  onClick={() => setIndex(elem.idinventario)}
                >
                  <td>{elem.nombre}</td>
                  <td>{elem.descripcion}</td>
                  <td>{elem.Entrada}</td>
                  <td>{elem.Salida}</td>
                  <td>{elem.Entrada - elem.Salida}</td>
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
      <SelectItemInventario index={index} />
    </div>
  );
}
