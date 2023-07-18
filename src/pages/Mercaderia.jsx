import TableMercaderia from "../components/table/mercaderia/TableMercaderia";
import PutMercaderia from "../components/table/mercaderia/PostMercaderia";
import NavMenu from "../components/Menu";

export default function Mercaderia() {
  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <section className="flex flex-col">
          <TableMercaderia />
          <PutMercaderia />
        </section>
      </main>
    </>
  );
}
