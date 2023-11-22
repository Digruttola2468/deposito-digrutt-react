import { useContext, useState } from "react";
import { InventarioContext } from "../../../context/InventarioContext";
import { FacturaNegroContext } from "../../../context/FacturaNegroContext";
import { Pagination } from "@mui/material";
import ItemTableNotaEnvio from "./ItemTableNotaEnvio";

export default function TableNotaEnvio() {
  const {
    getLengthTableList,
    showTable,
    setIndex,
    limit,
    setEnd,
    getOneFacturaNegroBBDD
  } = useContext(FacturaNegroContext);

  const { getClienteName } = useContext(InventarioContext);

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const [start, setStart] = useState(0);

  return (
    <section className="flex flex-col lg:flex-row lg:justify-center lg:items-center ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:max-w-[800px] py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden ">
            <table className="min-w-full text-left text-sm font-light ">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    N° Envio
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Valor Total Declarado
                  </th>
                </tr>
              </thead>
              <tbody>
                {showTable(start).map((elem) => {
                  return (
                    <tr
                      className={`border-b dark:border-neutral-500 hover:border-info-200 hover:bg-cyan-200 hover:text-neutral-800`}
                      key={elem.id}
                      onClick={() => {
                        setIndex(elem.id);
                        getOneFacturaNegroBBDD(elem.id)
                      }}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {elem.nro_envio}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {formatDate(elem.fecha)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {getClienteName(elem.idCliente)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        ${elem.valorDeclarado}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-row justify-center ">
              <Pagination
                count={Math.ceil(getLengthTableList() / limit)}
                onChange={(evt, value) => {
                  setEnd(limit * parseInt(value));
                  setStart(limit * parseInt(value) - limit);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ItemTableNotaEnvio />
    </section>
  );
}
