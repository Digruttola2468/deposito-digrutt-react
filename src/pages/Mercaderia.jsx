import TableMercaderia from "../components/table/mercaderia/TableMercaderia";
import NavMenu from "../components/Menu";
import GraficaInventario from "./GraficaInventario";

export default function Mercaderia() {
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
          <GraficaInventario />
        </section>
      </main>
    </>
  );
}
