import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function BodyTable({ data, end, count }) {
  const [start, setStart] = useState(0);
  const [index, setIndex] = useLocalStorage("selectIndexMercaderia", null);

  useEffect(() => setStart(end - count));

  return (
    <tbody>
      {data.length != 0 ? (
        data.slice(start, end).map((elem) => {
          return (
            <tr
              key={elem.id}
              onClick={() => setIndex(elem.id)}
              className="hover:bg-celeste-claro cursor-pointer"
            >
              <td className="py-4 px-1">{elem.nombre}</td>
              <td className="py-4 px-1">{elem.descripcion}</td>
              <td className="py-4 px-1">{elem.stock}</td>
              <td className="py-4 px-1">{elem.fecha}</td>
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
