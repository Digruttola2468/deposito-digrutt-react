import { createContext, useState, useEffect } from "react";

//toastify
import { toast } from "react-toastify";

export const InventarioContext = createContext();

//Hook
import { useLocalStorage } from "usehooks-ts";

//Statefull
import { post, get, update, eliminar } from "../services/api_inventario";

export function InventarioContextProvider(props) {
  //Table data
  const [tableList, setTableList] = useLocalStorage("inventario", []);
  const [apiOriginal, setApiOriginal] = useState([]);

  //if the progress to get data is done
  const [isdone, setDone] = useState(false);

  //Page Table
  const [limit, setLimit] = useState(10);
  const [end, setEnd] = useState(limit);
  const [pagina, setPagina] = useState(1);

  //show dialog to create inventario
  const [showDialogNewInventario, setShowDialogNewInventario] = useState(false);

  useEffect(() => {
    get()
      .then((result) => {
        console.log(result);
        setTableList(result);
        setApiOriginal(result);
        setDone(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const createApi = (json) => {
    post(json)
      .then((result) => {
        toast.success("Creado Correctamente");
        console.log("al crear inventario",result);
        setTableList([{ ...result, entrada: 0, salida: 0 }, ...tableList ]);
        setApiOriginal([ { ...result, entrada: 0, salida: 0 }, ...apiOriginal]);
      })
      .catch((error) => console.log("error", error));
  };

  const updateApi = (id, json, jsonEntradaSalida) => {
    update(id, json, jsonEntradaSalida)
      .then((result) => {
        const newUserForeignInfo = [...tableList];
        let index = newUserForeignInfo.findIndex(
          (elem) => elem.id == result.id
        );

        newUserForeignInfo.splice(index, 1, {
          ...result,
          ...jsonEntradaSalida,
        });

        setTableList(newUserForeignInfo);
        setApiOriginal(newUserForeignInfo);

        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.error("error", error));
  };

  const deleteApi = (id) => {
    eliminar(id)
      .then((data) => {
        toast.success(data.message);
        setTableList(tableList.filter((elem) => elem.id != id));
        setApiOriginal(apiOriginal.filter((elem) => elem.id != id));
      })
      .catch((error) => console.error("Error:", error));
  };

  const getPrevius = () => setTableList(apiOriginal);

  //ORDER BY
  const orderNombreASC = () => {
    setTableList(
      tableList.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      })
    );
    toast.info("Ordenado Nombre Ascendente");
  };
  const orderNombreDES = () => {
    setTableList(
      tableList.sort((a, b) => {
        if (a.nombre < b.nombre) {
          return 1;
        }
        if (a.nombre > b.nombre) {
          return -1;
        }
        return 0;
      })
    );
    toast.info("Ordenado Nombre Descendente");
  };

  return (
    <InventarioContext.Provider
      value={{
        tableList,
        setTableList,
        limit,
        setLimit,
        apiOriginal,
        pagina,
        setPagina,
        end,
        setEnd,
        createApi,
        updateApi,
        deleteApi,
        orderNombreASC,
        orderNombreDES,
        isdone,
        getPrevius,
        showDialogNewInventario,
        setShowDialogNewInventario,
      }}
    >
      {props.children}
    </InventarioContext.Provider>
  );
}
