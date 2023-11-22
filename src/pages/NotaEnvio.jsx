import NavMenu from "../components/Menu";
import PostFacturaNegro from "../components/table/facturaNegro/PostFacturaNegro";
import TableNotaEnvio from "../components/table/facturaNegro/TableNotaEnvio";

export default function NotaEnvio() {
  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu/>
      </header>
      <main>
        <TableNotaEnvio />
        <PostFacturaNegro />
      </main>
    </>
  );
}
