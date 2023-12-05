import { useContext } from "react";
import NavMenu from "../components/Menu";
import { OficinaContext } from "../context/OficinaContext";

import ProgressComponent from "../components/progress/ProgressComponent";
import OficinaTable from "../components/table/oficina/OficinaTable";
import NewRemito from "../components/table/oficina/NewRemitoOficina";

export default function Oficina() {
  const { loadingSend } =
    useContext(OficinaContext);

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <OficinaTable />
        <NewRemito />

        <ProgressComponent open={loadingSend} />
      </main>
    </>
  );
}
