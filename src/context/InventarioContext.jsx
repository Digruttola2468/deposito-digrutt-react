import { createContext, useState, useEffect } from "react";

//toastify
import { toast } from "react-toastify";

export const InventarioContext = createContext();

//Hook
import { useLocalStorage } from "usehooks-ts";

//Statefull
import { post, get, update, eliminar } from "../services/api_inventario";

export function InventarioContextProvider(props) {
  const [api, setApi] = useLocalStorage("inventario", []);
  const [apiOriginal, setApiOriginal] = useState([]);

  const [isdone, setDone] = useState(false);

  const [showDialogNewInventario, setShowDialogNewInventario] = useState(false);

  useEffect(() => {
    get()
      .then((result) => {
        setApi(result);
        setApiOriginal(result);
        setDone(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const createApi = (json) => {
    post(json)
      .then((result) => {
        toast.success("Creado Correctamente");
        setApi([...api, { ...result, entrada: 0, salida: 0 }]);
        setApiOriginal([...apiOriginal, { ...result, entrada: 0, salida: 0 }]);
      })
      .catch((error) => console.log("error", error));
  };

  const updateApi = (id, json, jsonEntradaSalida) => {
    update(id, json, jsonEntradaSalida)
      .then((result) => {
        const newUserForeignInfo = [...api];
        let index = newUserForeignInfo.findIndex(
          (elem) => elem.id == result.id
        );

        newUserForeignInfo.splice(index, 1, {
          ...result,
          ...jsonEntradaSalida,
        });

        setApi(newUserForeignInfo);
        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.error("error", error));
  };

  const deleteApi = (id) => {
    eliminar(id)
      .then((data) => {
        toast.success(data.message);
        setApi(api.filter((elem) => elem.id != id));
        setApiOriginal(apiOriginal.filter((elem) => elem.id != id));
      })
      .catch((error) => console.error("Error:", error));
  };

  const searchInventario = (codProducto) => {
    const filter = api.filter((elem) =>
      elem.nombre.toLowerCase().includes(codProducto)
    );
    setApi(filter);
  };

  const filterApiSearch = (filter) => setApi(filter);

  const getPrevius = () => {
    setApi(apiOriginal);
    /*get()
      .then((result) => {
        setApi(result);
      })
      .catch((error) => console.error(error));*/
  };

  //ORDER BY
  const orderNombreASC = () => {
    setApi(
      api.sort((a, b) => {
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
    setApi(
      api.sort((a, b) => {
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
        api,
        apiOriginal,
        filterApiSearch,
        createApi,
        updateApi,
        deleteApi,
        orderNombreASC,
        orderNombreDES,
        isdone,
        searchInventario,
        getPrevius,
        showDialogNewInventario,
        setShowDialogNewInventario,
      }}
    >
      {props.children}
    </InventarioContext.Provider>
  );
}
