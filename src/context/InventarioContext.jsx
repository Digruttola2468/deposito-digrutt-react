import { createContext, useState, useEffect } from "react";

//toastify
import { toast } from "react-toastify";

export const InventarioContext = createContext();

//Hook
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

//Statefull
import { post, get, update, eliminar } from "../services/api_inventario";

import { getClientes, postCliente } from "../services/api_otherTables";

export function InventarioContextProvider(props) {
  const token = useReadLocalStorage("token");

  //Table data
  const [tableList, setTableList] = useState([]);
  const [apiOriginal, setApiOriginal] = useState([]);

  //if the progress to get data is done
  const [isdone, setDone] = useState(false);

  //Page Table
  const [limit, setLimit] = useState(10);
  const [end, setEnd] = useState(limit);
  const [pagina, setPagina] = useState(1);

  //show dialog to create inventario
  const [showDialogNewInventario, setShowDialogNewInventario] = useState(false);

  //show dialog to create Cliente
  const [showDialogNewCliente, setShowDialogNewCliente] = useState(false);

  const [clientesList, setClientesList] = useState([]);

  const getClientesAPI = () => {
    getClientes().then((result) => setClientesList(result));
  };

  const getClienteName = (idCliente) => {
    const filterList = clientesList.filter((result) => result.id === idCliente);
    if (filterList.length != 0) return filterList[0].cliente;

    return "";
  };

  useEffect(() => {
    get(token)
      .then((result) => {
        setTableList(result);
        setApiOriginal(result);
        setDone(true);
      })
      .catch((error) => console.error(error));
    getClientesAPI();
  }, []);

  const createApi = (json) => {
    post(json, token)
      .then((result) => {
        toast.success("Creado Correctamente");
        console.log("al crear inventario", result);
        setTableList([{ ...result, entrada: 0, salida: 0 }, ...tableList]);
        setApiOriginal([{ ...result, entrada: 0, salida: 0 }, ...apiOriginal]);
      })
      .catch((e) => {
        toast.error(e.response.data.message); 
      });
  };

  const updateApi = (id, json, jsonEntradaSalida, token) => {
    update(id, json, token)
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
      .catch((e) => {
        toast.error(e.response.data.message); 
      });
  };

  const deleteApi = (id, token) => {
    eliminar(id, token)
      .then((data) => {
        toast.success(data.message);
        setTableList(tableList.filter((elem) => elem.id != id));
        setApiOriginal(apiOriginal.filter((elem) => elem.id != id));
      })
      .catch((e) => {
        toast.error(e.response.data.message); 
      });
  };

  const getPrevius = () => setTableList(apiOriginal);

  const createCliente = (json) => {
    postCliente(json, token)
      .then((result) => {
        clientesList.push(result);
        setClientesList(clientesList);
        toast.success("Se creo con exito");
      })
      .catch((e) => {
        toast.error(e.response.data.message); 
      });
  };

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
        clientesList,
        getClienteName,
        createCliente,
        showDialogNewCliente,
        setShowDialogNewCliente,
      }}
    >
      {props.children}
    </InventarioContext.Provider>
  );
}
