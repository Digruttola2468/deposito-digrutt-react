import { useContext } from "react";

import SearchCodProducto from "../components/search/SearchInventario";
import ProgressComponent from "../components/progress/ProgressComponent";

import TableComponent from "../components/table/inventario/TableInventario";

import { InventarioContext } from "../context/InventarioContext";

function Inventario() {
  const { isdone } = useContext(InventarioContext);
 
  return (
    <>
      {isdone ? (
        <>
          <SearchCodProducto />
          <TableComponent />
        </>
      ) : (
        <></>
      )}

      <ProgressComponent open={!isdone} />
    </>
  );
}

export default Inventario;
