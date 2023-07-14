import { useContext } from "react";
import { MercaderiaContext } from "../../../context/MercaderiaContext";

import SearchMercaderia from "../../search/SearchMercaderia";

export default function TopTable() {
    const { getEntradaApi, getSalidaApi, idCategoria } =
    useContext(MercaderiaContext);
  return (
    <div className="w-full flex justify-between items-end flex-row ">
      <SearchMercaderia />
      <div className="hidden sm:block">
        <button
          onClick={() => getSalidaApi()}
          className={`${
            idCategoria == 1 ? "underline" : ""
          }  decoration-solid decoration-2 `}
        >
          Salida
        </button>
        <button
          onClick={() => getEntradaApi()}
          className={`${
            idCategoria == 2 ? "underline" : ""
          }  decoration-solid decoration-2 ml-3`}
        >
          Entrada
        </button>
      </div>
    </div>
  );
}
