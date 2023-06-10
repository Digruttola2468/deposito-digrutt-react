import { createContext, useEffect } from "react";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MercaderiaContext = createContext();

//Hooks
import { useLocalStorage } from "usehooks-ts";

//API REST
import {
  update,
  eliminar,
  getEntrada,
  getSalida,
  post,
  searchEntrada,
  searchSalida,
} from "../services/api_mercaderia";

import {getOneInventario, getNombresInventario} from "../services/api_inventario";


export function MercaderiaContextProvider(props) {
  const [api, setApi] = useLocalStorage("mercaderiaApi", []);
  const [inventarioNombres, setInventarioNombres] = useLocalStorage(
    "inventarioNombres",
    []
  );

  useEffect(() => {
    getEntrada()
      .then((result) => setApi(result))
      .catch((error) => console.error(error));

    getNombresInventario()
      .then((result) => setInventarioNombres(result))
      .catch((error) => console.error(error));
  }, []);

  const getEntradaApi = () => {
    getEntrada()
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  };

  const getSalidaApi = () => {
    getSalida()
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  };

  const updateApi = (id, json) => {
    update(id, json)
      .then((result) => {
        const newUserForeignInfo = [...api];
        let index = newUserForeignInfo.findIndex(
          (elem) => elem.id == result.id
        );

        const filter = inventarioNombres.filter(
          (elem) => elem.id == result.idinventario
        );

        newUserForeignInfo.splice(index, 1, {
          ...result,
          nombre: filter[0].nombre,
          descripcion: filter[0].descripcion,
        });

        setApi(newUserForeignInfo);

        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.log("error", error));
  };

  const createApi = (json) => {
    post(json)
      .then((data2) => {
        getOneInventario(data2.idinventario)
          .then((data) => {
            toast.success("Se envio correctamente");
            setApi([
              ...api,
              {
                ...data2,
                nombre: data[0].nombre,
                descripcion: data[0].descripcion,
              },
            ]);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const deleteApi = (id) => {
    eliminar(id)
      .then((data) => {
        toast.success(data.message);
        setApi(api.filter((elem) => elem.id != id));
      })
      .catch((error) => console.error("Error:", error));
  };

  const searchEntradaApi = (search) => {
    searchEntrada(search)
      .then((result) => {
        if (result.message) return toast.error(result.message);
        setApi(result);
      })
      .catch((error) => console.log(error));
  };

  const searchSalidaApi = (search) => {
    searchSalida(search)
      .then((result) => {
        if (result.message) return toast.error(result.message);
        setApi(result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <MercaderiaContext.Provider
      value={{
        api,
        inventarioNombres,
        createApi,
        updateApi,
        deleteApi,
        getEntradaApi,
        getSalidaApi,
        searchSalidaApi,
        searchEntradaApi,
      }}
    >
      {props.children}
      <ToastContainer />
    </MercaderiaContext.Provider>
  );
}
