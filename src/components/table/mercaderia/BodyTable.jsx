import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

const getDateWithNameMonth = (fechaString) => {
  const fDate = new Date(fechaString);
  return `${fDate.getDate()}/${fDate.getMonth() + 1}/${fDate.getFullYear()}`;
};

export default function BodyTable() {
  const { tableList, end, limit } = useContext(MercaderiaContext);

  const [start, setStart] = useState(0);
  const [index, setIndex] = useLocalStorage("selectIndexMercaderia", null);

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
              <td className="py-4 px-1">{elem.nombre}</td>
              <td className="py-4 px-1">{elem.descripcion}</td>
              <td className="py-4 px-1">{elem.stock}</td>
              <td className="py-4 px-1">{getDateWithNameMonth(elem.fecha)}</td>
              <td className="py-4 px-1">{elem.proveedor}</td>
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
}
