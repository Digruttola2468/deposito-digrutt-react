import { createContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

export const MercaderiaContext = createContext();

//Hooks
import { useLocalStorage, useScreen } from "usehooks-ts";

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
import {
  getOneInventario,
  getNombresInventario,
  post as postInventario
} from "../services/api_inventario";

export function MercaderiaContextProvider(props) {
  const [api, setApi] = useLocalStorage("mercaderiaApi", []);
  const [inventarioNombres, setInventarioNombres] = useState([]);
  const [apiOriginal, setApiOriginal] = useState([]);

  //2: ENTRADA
  //1: SALIDA
  const [idCategoria, setIdCategoria] = useState();

  useEffect(() => {
    getEntrada()
      .then((result) => {setIdCategoria(2);setApi(result);setApiOriginal(result);})
      .catch((error) => console.error(error));

    getNombresInventario()
      .then((result) => setInventarioNombres(result))
      .catch((error) => console.error(error));
  }, []);

  const getEntradaApi = () => {
    getEntrada()
      .then((result) => {setIdCategoria(2);setApi(result);setApiOriginal(result);})
      .catch((error) => console.error(error));
  };

  const getSalidaApi = () => {
    getSalida()
      .then((result) => {setIdCategoria(1);setApi(result);setApiOriginal(result);})
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
        const fecha = data2.fecha.split("-").reverse().join("-");
        getOneInventario(data2.idinventario)
          .then((data) => {
            toast.success("Se envio correctamente");
            setApi([
              ...api,
              {
                ...data2,
                fecha,
                nombre: data[0].nombre,
                descripcion: data[0].descripcion,
              },
            ]);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const createInventario = (json) => {
    postInventario(json)
      .then((result) => {
        toast.success("Creado Correctamente");
        inventarioNombres.push({...result})
      })
      .catch((error) => console.log("error", error));
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

  //ORDER BY
  const orderNombreASC = () => {
    setApi(
      api.sort((a, b) => {
        if (a.nombre > b.nombre) return 1;
        if (a.nombre < b.nombre) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Nombre Ascendente");
  };
  const orderNombreDESC = () => {
    setApi(
      api.sort((a, b) => {
        if (a.nombre < b.nombre) return 1;
        if (a.nombre > b.nombre) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Nombre Descendente");
  };
  const orderFechaASC = () => {
    setApi(
      api.sort((a, b) => {
        const newA = a.fecha.split("-").reverse().join("-");
        const ADate = new Date(newA);

        const newB = b.fecha.split("-").reverse().join("-");
        const BDate = new Date(newB);

        if (ADate > BDate) return 1;
        if (ADate < BDate) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Fecha Ascendente");
  };
  const orderFechaDESC = () => {
    setApi(
      api.sort((a, b) => {
        const newA = a.fecha.split("-").reverse().join("-");
        const ADate = new Date(newA);

        const newB = b.fecha.split("-").reverse().join("-");
        const BDate = new Date(newB);

        if (ADate < BDate) return 1;
        if (ADate > BDate) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Fecha Descendente");
  };
  const orderCantidadASC = () => {
    setApi(
      api.sort((a, b) => {
        if (a.stock > b.stock) return 1;
        if (a.stock < b.stock) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Stock Ascendente");
  };
  const orderCantidadDESC = () => {
    setApi(
      api.sort((a, b) => {
        if (a.stock < b.stock) return 1;
        if (a.stock > b.stock) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Stock Descendente");
  };

  return (
    <MercaderiaContext.Provider
      value={{
        api,
        apiOriginal,
        setApi,
        inventarioNombres,
        createApi,
        updateApi,
        deleteApi,
        getEntradaApi,
        getSalidaApi,
        searchSalidaApi,
        searchEntradaApi,
        orderNombreASC,
        orderNombreDESC,
        orderFechaASC,
        orderFechaDESC,
        orderCantidadASC,
        orderCantidadDESC,
        idCategoria,
        createInventario
      }}
    >
      {props.children}
      <ToastContainer />
    </MercaderiaContext.Provider>
  );
}
