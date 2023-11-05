import TableMercaderia from "../components/table/mercaderia/TableMercaderia";
import NavMenu from "../components/Menu";
import GraficaInventario from "./GraficaInventario";
import PostFacturaNegro from "../components/table/mercaderia/PostFacturaNegro";
import ProgressComponent from "../components/progress/ProgressComponent";
import { useContext } from "react";
import { MercaderiaContext } from "../context/MercaderiaContext";

export default function Mercaderia() {
  const {isDoneFacturaNegro} = useContext(MercaderiaContext);

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <section className="flex flex-col">
          <TableMercaderia />
        </section>
        <section>
          <PostFacturaNegro />
        </section>
        <section>
          <GraficaInventario />
        </section>
        <ProgressComponent open={isDoneFacturaNegro} />
      </main>
    </>
  );
}
