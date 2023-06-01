import "./table.css";

import { getMercaderiaInput,getMercaderiaOutput } from "../../../data/mercaderiaInput.js";

export default function Table() {
  return (
    <table className="tableMercaderia">
      <thead>
        <tr>
          <th>n° Factura</th>
          <th>Fecha</th>
          <th>Stock</th>
          <th>Cod. Producto</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody className="bodyTableMercaderia">
        {getMercaderiaOutput.map((elem) => {
          return (
            <tr key={elem.id}>
              <td>{elem.proveedor}</td>
              <td>{elem.fecha}</td>
              <td>{elem.stock}</td>
              <td>{elem.nombre}</td>
              <td>{elem.descripcion}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
