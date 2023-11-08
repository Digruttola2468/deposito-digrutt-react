import { useContext, useState, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import SelectItemInventario from "./ItemTable";

import { useLocalStorage } from "usehooks-ts";

import Pagination from "@mui/material/Pagination";
import SearchCodProducto from "../../search/SearchInventario";
import { Button } from "@mui/material";
import DialogNewInventario from "../../dialog/DialogNewInventario";
import PesoUnidad from "./PesoUnidad";
import DialogNewCliente from "../../dialog/DialogNewCliente";

const HeadTable = () => {
  const { orderNombreASC, orderNombreDES } = useContext(InventarioContext);
  const [order, setOrder] = useState(false);

  //Handle Button
  const handleNombre = () => {
    if (order) orderNombreASC();
    else orderNombreDES();
    setOrder(!order);
  };
  return (
    <thead className="tableHeader">
      <tr>
        <th>
          Articulo
        </th>
        <th onClick={handleNombre} className="cursor-pointer py-4 px-1">
          nombre
        </th>
        <th>descripcion</th>
        <th>entrada</th>
        <th>salida</th>
        <th>stockActual</th>
        <th>Peso x Unidad</th>
        <th>Cliente</th>
      </tr>
    </thead>
  );
};

const BodyTable = () => {
  const { tableList, end, limit, getClienteName } =
    useContext(InventarioContext);

  const [index, setIndex] = useLocalStorage("selectIndexInventario", 0);
  const [start, setStart] = useState(0);

  useEffect(() => setStart(end - limit));

  return (
    <tbody>
      {tableList.length != 0 ? (
        tableList.slice(start, end).map((elem) => {
          return (
            <tr
              key={elem.id}
              onClick={() => setIndex(elem.id)}
              className="hover:bg-celeste-claro cursor-pointer"
            >
              <td className="py-4 px-1">{elem.articulo}</td>
              <td className="py-4 px-1">{elem.nombre}</td>
              <td className="py-4 px-1"> {elem.descripcion}</td>
              <td className="py-4 px-1">{elem.entrada}</td>
              <td className="py-4 px-1">{elem.salida}</td>
              <td className="py-4 px-1">{elem.entrada - elem.salida}</td>
              <td className="py-4 px-1">{elem.pesoUnidad}kg</td>
              <td className="py-4 px-1">{getClienteName(elem.idCliente)}</td>
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
          <td></td>
        </tr>
      )}
    </tbody>
  );
};

export default function TableComponent() {
  const {
    setShowDialogNewInventario,
    setShowDialogNewCliente,
    tableList,
    limit,
    pagina,
    setPagina,
    setEnd,
  } = useContext(InventarioContext);

  return (
    <div className="flex flex-col lg:flex-row justify-center ">
      <div className="p-3 shadow-xl">
        <div className="flex flex-row justify-between items-end">
          <SearchCodProducto />
          <div>
          <Button onClick={() => setShowDialogNewCliente(true)}>
            New Cliente
          </Button>
          <Button onClick={() => setShowDialogNewInventario(true)}>
            New Inventario
          </Button>
          <DialogNewInventario />
          <DialogNewCliente />
          </div>
          
        </div>
        <table className="table">
          <HeadTable />
          <BodyTable />
        </table>
        <Pagination
          count={Math.ceil(tableList.length / limit)}
          onChange={(evt, newValue) => {
            setEnd(limit * parseInt(newValue));
            setPagina(newValue);
          }}
          page={pagina}
        />
      </div>

      <div className="flex flex-col">
        <SelectItemInventario />
        <PesoUnidad />
      </div>
    </div>
  );
}
