import { createContext, useState, useEffect } from "react";

//toastify 
import { ToastContainer, toast } from "react-toastify";

export const InventarioContext = createContext();

//Hook 
import { useLocalStorage } from "usehooks-ts";

//Statefull
import { post, get, update, eliminar } from "../services/api_inventario";

export function InventarioContextProvider(props) {
  const [api, setApi] = useLocalStorage("inventarioApi", []);
  const [aux, setAux] = useState([]);
  const [isdone, setDone] = useState(false);

  useEffect(() => {
    get()
      .then((result) => {
        setApi(result);
        setDone(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const createApi = (json) => {
    post(json)
      .then((result) => {
        console.log(result);
        console.log(api);
        toast.success("Creado Correctamente");
        setApi([...api, {...result, Entrada: 0,
          Salida: 0}]);
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

        newUserForeignInfo.splice(index, 1, {...result, ...jsonEntradaSalida});

        setApi(newUserForeignInfo);
        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.error("error", error));
  };

  const deleteApi = (id) => {
    eliminar
      .then((data) => {
        toast.success(data.message);
        setApi(api.filter((elem) => elem.id != id));
      })
      .catch((error) => console.error("Error:", error));
  };

  const searchInventario = (codProducto) => {
    setAux(api);
    const filter = api.filter(elem => elem.nombre == codProducto.nombre);
    setApi(filter);
  };

  const getPrevius = () => {
    setApi(aux);
  }

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
        createApi,
        updateApi,
        deleteApi,
        orderNombreASC,
        orderNombreDES,
        isdone,
        searchInventario,
        getPrevius
      }}
    >
      {props.children}
      <ToastContainer />
    </InventarioContext.Provider>
  );
}
