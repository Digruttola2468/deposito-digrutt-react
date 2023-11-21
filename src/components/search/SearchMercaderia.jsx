import { Autocomplete, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MercaderiaContext } from "../../context/MercaderiaContext";
import { InventarioContext } from "../../context/InventarioContext";

export default function SearchMercaderia() {
  const {
    apiOriginal,
    setTableList,
    getPrevius,
    setPagina,
    setEnd,
    limit,
    idCategoria,
    inputSearch,
    setInputSearch,
  } = useContext(MercaderiaContext);

  const { inventarioNombres } = useContext(InventarioContext);

  const [searchDescripcion, setSearchDescripcion] = useState("");

  return (
    <div className="flex flex-row items-center">
      <TextField
        sx={{ width: 200, margin: 1 }}
        label="Buscar Descripcion"
        value={searchDescripcion}
        onChange={(evt) => {
          const newValue = evt.target.value.toLowerCase();
          setSearchDescripcion(newValue);

            const resultado = apiOriginal.filter((elem) => {
              return elem.descripcion.toLowerCase().includes(newValue);
            });
            if (newValue !== "") {
              setTableList(resultado);
              setPagina(1);
              setEnd(limit);
            } else getPrevius();
          }
        }
      />
    </div>
  );
}
