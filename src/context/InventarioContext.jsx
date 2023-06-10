import { createContext, useState, useEffect } from "react";

//toastify 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const InventarioContext = createContext();

//Hook 
import { useLocalStorage } from "usehooks-ts";

//Statefull
import { post, get, update, eliminar } from "../services/api_inventario";

export function InventarioContextProvider(props) {
  const [api, setApi] = useLocalStorage("inventarioApi", []);
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
    post
      .then((result) => {
        toast.success("Creado Correctamente");
        setApi([...api, result]);
      })
      .catch((error) => console.log("error", error));
  };

  const updateApi = (id, json) => {
    update
      .then((result) => {
        const newUserForeignInfo = [...api];
        let index = newUserForeignInfo.findIndex(
          (elem) => elem.idinventario == result.idinventario
        );

        newUserForeignInfo.splice(index, 1, result);

        setApi(newUserForeignInfo);

        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.log("error", error));
  };

  const deleteApi = (id) => {
    eliminar
      .then((data) => {
        toast.success(data.message);
        setApi(api.filter((elem) => elem.id != id));
      })
      .catch((error) => console.error("Error:", error));
  };

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
      }}
    >
      {props.children}
      <ToastContainer />
    </InventarioContext.Provider>
  );
}
