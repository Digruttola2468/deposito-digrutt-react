import { useContext } from "react";

import SearchCodProducto from "../components/search/SearchInventario";
import ProgressComponent from "../components/progress/ProgressComponent";

import TableComponent from "../components/table/inventario/TableInventario";

import { InventarioContext } from "../context/InventarioContext";
import GraficaInventario from "./GraficaInventario";

function Inventario() {
  const { isdone } = useContext(InventarioContext);

  return (
    <>
      {isdone ? (
        <>
          <SearchCodProducto />
          <TableComponent />
          <GraficaInventario />
        </>
      ) : (
        <></>
      )}

      <ProgressComponent open={!isdone} />
    </>
  );
}

export default Inventario;
