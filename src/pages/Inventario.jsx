import { useContext } from "react";

import { InventarioContext } from "../context/InventarioContext";

import ProgressComponent from "../components/progress/ProgressComponent";
import TableComponent from "../components/table/inventario/TableInventario";
import GraficaInventario from "./GraficaInventario";
import NavMenu from "../components/Menu";

export default function Inventario() {
  const { isdone } = useContext(InventarioContext);

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        {isdone ? (
          <>
            <section>
              <TableComponent />
            </section>
            <section>
              <GraficaInventario />
            </section>
          </>
        ) : (
          <></>
        )}
      </main>

      <ProgressComponent open={!isdone} />
    </>
  );
}