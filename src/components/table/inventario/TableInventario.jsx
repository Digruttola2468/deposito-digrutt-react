import { useContext, useState, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import SelectItemInventario from "./ItemTable";

import Pagination from "@mui/material/Pagination";
import SearchCodProducto from "../../search/SearchInventario";
import { Button } from "@mui/material";
import DialogNewInventario from "../../dialog/DialogNewInventario";
import PesoUnidad from "./PesoUnidad";
import DialogNewCliente from "../../dialog/DialogNewCliente";

const HeadTable = () => {
  return (
    <thead className="tableHeader">
      <tr>
        <th>Articulo</th>
        <th>nombre</th>
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
  const { tableList, end, limit, getClienteName, listToMercaderia, setIndex } =
    useContext(InventarioContext);

  const [start, setStart] = useState(0);

  useEffect(() => setStart(end - limit));

  return (
    <tbody>
      {tableList.length != 0 ? (
        tableList.slice(start, end).map((elem) => {
          if (elem.entrada == null) elem.entrada = 0;
          if (elem.salida == null) elem.salida = 0;

          let stockActual = elem.entrada - elem.salida;

          return (
            <tr
              key={elem.id}
              onClick={() => setIndex(elem.id)}
              className={`hover:bg-celeste-claro cursor-pointer ${
                listToMercaderia.find((ass) => ass.id == elem.id)
                  ? "bg-yellow-200"
                  : ""
              }`}
            >
              <td className="py-4 px-1">{elem.articulo}</td>
              <td className="py-4 px-1">{elem.nombre}</td>
              <td className="py-4 px-1"> {elem.descripcion}</td>
              <td className="py-4 px-1">{elem.entrada}</td>
              <td className="py-4 px-1">{elem.salida}</td>
              <td
                className={`py-4 px-1 font-bold ${
                  stockActual <= 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {stockActual}
              </td>
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
  const { tableList, limit, pagina, setPagina, setEnd, setListToMercaderia } =
    useContext(InventarioContext);

  const [openDialogNewCliente, setOpenDialogCliente] = useState(false);
  const [oepnDialogNewInventario, setOpenDialogNewInventario] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row justify-center ">
      <div className="p-3 shadow-xl">
        <div className="flex flex-col-reverse md:flex-row justify-between items-end">
          <SearchCodProducto />
          <div>
            <Button onClick={() => setListToMercaderia([])}>
              Limpiar Resaltadores
            </Button>
            <Button onClick={() => setOpenDialogCliente(true)}>
              New Cliente
            </Button>
            <Button onClick={() => setOpenDialogNewInventario(true)}>
              New Inventario
            </Button>
            <DialogNewInventario
              open={oepnDialogNewInventario}
              close={setOpenDialogNewInventario}
            />
            <DialogNewCliente
              open={openDialogNewCliente}
              close={setOpenDialogCliente}
            />
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
