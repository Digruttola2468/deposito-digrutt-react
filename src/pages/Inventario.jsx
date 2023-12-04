import TableComponent from "../components/table/inventario/TableInventario";
import NavMenu from "../components/Menu";

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
      </main>
    </>
  );
}
