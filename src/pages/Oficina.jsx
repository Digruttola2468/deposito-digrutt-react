import { useState } from "react";
import NavMenu from "../components/Menu";

export default function Oficina() {
  const [numRemito, setNumRemito] = useState("");
  const [codProducto, setCodProducto] = useState("");

  const [pedidos, setPedidos] = useState(["AXE-012", "MET-015", "CRI-023"]);

  const handleClickNew = (evt) => {
    evt.preventDefault();

    setCodProducto("");
    setPedidos([...pedidos, codProducto]);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    for (let i = 0; i < pedidos.length; i++) {
        const codProductoArray = pedidos[i];
        
        console.log(document.querySelector(`#input-${codProductoArray}`).value);
        console.log(document.querySelector(`#stock-${codProductoArray}`).value);
        console.log(document.querySelector(`#ordenCompra-${codProductoArray}`).value);
        console.log('\n');
        console.log('\n');
    }

  }

  const show = () => {};

  return (
    <>
      <header className="bg-celeste-oscuro">
        <NavMenu />
      </header>
      <main>
        <section>
          <div action="">
            <h1>REMITO N°{numRemito}</h1>
            <input
              value={numRemito}
              type="number"
              placeholder="N° Remito"
              onChange={(evt) => {
                setNumRemito(evt.target.value);
              }}
            />
            <input type="date" placeholder="fecha" />
          </div>
          <form action="">
            <input
              type="text"
              value={codProducto}
              placeholder="Cod.Producto"
              onChange={(evt) => setCodProducto(evt.target.value)}
            />
            <button onClick={handleClickNew}>Agregar</button>
          </form>
        </section>
        <section>
          <form action="" onSubmit={handleSubmit}>
            {pedidos.map((elem) => {
              return (
                <div key={elem}>
                  <input type="text" defaultValue={elem} id={`input-${elem}`}/>
                  <input type="number" placeholder="Stock" id={`stock-${elem}`} />
                  <input type="text" placeholder="Orden de compra" id={`ordenCompra-${elem}`} />
                </div>
              );
            })}
            <button>Agregar</button>
          </form>
        </section>
      </main>
    </>
  );
}