import { useContext, useState, useEffect } from "react";
import { InventarioContext } from "../../../context/InventarioContext";

import SelectItemInventario from "./ItemTable";

import Pagination from "@mui/material/Pagination";
import SearchCodProducto from "../../search/SearchInventario";
import { Button } from "@mui/material";
import DialogNewInventario from "../../dialog/DialogNewInventario";
import PesoUnidad from "./PesoUnidad";

const HeadTable = () => {
  return (
    <thead className="border-b font-medium dark:border-neutral-500">
      <tr>
        <th scope="col" className="px-6 py-4">
          Articulo
        </th>
        <th scope="col" className="px-6 py-4">
          nombre
        </th>
        <th scope="col" className="px-6 py-4">
          descripcion
        </th>
        <th scope="col" className="px-6 py-4">
          entrada
        </th>
        <th scope="col" className="px-6 py-4">
          salida
        </th>
        <th scope="col" className="px-6 py-4">
          stockActual
        </th>
        <th scope="col" className="px-6 py-4">
          Peso x Unidad
        </th>
        <th scope="col" className="px-6 py-4">
          Cliente
        </th>
      </tr>
    </thead>
  );
};

const BodyTable = () => {
  const { tableList, end, limit, getClienteName, listToMercaderia, setIndex } =
    useContext(InventarioContext);

  const [start, setStart] = useState(0);

  useEffect(() => setStart(end - limit), [end]);

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
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {elem.articulo}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {elem.nombre}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {" "}
                {elem.descripcion}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {elem.entrada}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {elem.salida}
              </td>
              <td
                className={`whitespace-nowrap px-6 py-4 font-medium ${
                  stockActual <= 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {stockActual}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {elem.pesoUnidad}kg
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {getClienteName(elem.idCliente)}
              </td>
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

  const [oepnDialogNewInventario, setOpenDialogNewInventario] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row justify-center ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex flex-row">
          <SearchCodProducto />
          <Button onClick={() => setListToMercaderia([])}>
            Limpiar Resaltadores
          </Button>
          <Button onClick={() => setOpenDialogNewInventario(true)}>
            New Inventario
          </Button>
          <DialogNewInventario
            open={oepnDialogNewInventario}
            close={setOpenDialogNewInventario}
          />
        </div>
        <div className="inline-block min-w-full sm:max-w-[1300px] py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden ">
            <table className="text-center min-w-full text-sm font-light">
              <HeadTable />
              <BodyTable />
            </table>
          </div>
        </div>
        <div className="flex flex-row justify-center ">
          <Pagination
            count={Math.ceil(tableList.length / limit)}
            onChange={(evt, newValue) => {
              setEnd(limit * parseInt(newValue));
              setPagina(newValue);
            }}
            page={pagina}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <SelectItemInventario />
        <PesoUnidad />
      </div>
    </div>
  );
}
