import TableMercaderia from "../components/table/mercaderia/TableMercaderia";
import PutMercaderia from "../components/table/mercaderia/PostMercaderia";
import SearchMercaderia from "../components/search/SearchMercaderia";

export default function Mercaderia() {
  return (
    <section className="flex flex-col">
      <TableMercaderia />
      <PutMercaderia />
    </section>
  );
}
