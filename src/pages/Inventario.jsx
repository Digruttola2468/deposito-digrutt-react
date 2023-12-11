import TableComponent from "../components/table/inventario/TableInventario";
import NavMenu from "../components/Menu";
import TableCliente from "../components/table/clientes/TableCliente";

export default function Inventario() {
  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <section>
          <TableComponent />
        </section>
        <section>
          <TableCliente />
        </section>
      </main>
    </>
  );
}
