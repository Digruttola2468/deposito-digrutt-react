import "./table.css";

import { getMercaderiaInput,getMercaderiaOutput } from "../../../data/mercaderiaInput.js";

export default function Table({children}) {
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
        {children}
      </tbody>
    </table>
  );
}
