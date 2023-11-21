import { useContext, useState } from "react";
import { MercaderiaContext } from "../../../context/MercaderiaContext";

export default function HeadTable() {
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
  const [order, setOrder] = useState(true);

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
    <thead className="tableHeader">
      <tr>
        <th onClick={handleNombre} className="cursor-pointer py-4 px-1">
          nombre
        </th>
        <th>descripcion</th>
        <th onClick={handleStock} className="cursor-pointer py-4 px-1">
          cantidad
        </th>
        <th onClick={handleFecha} className="cursor-pointer py-4 px-1">
          fecha
        </th>
      </tr>
    </thead>
  );
}
