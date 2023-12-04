import { createContext, useState, useEffect, useContext } from "react";

//toastify
import { toast } from "react-toastify";

export const InventarioContext = createContext();

//Statefull
import {
  post,
  get,
  update,
  eliminar,
  getNombresInventario,
  getSumInventario,
} from "../services/api_inventario";

import { getClientes, postCliente } from "../services/api_otherTables";
import { UserContext } from "./UserContext";
import { useLocalStorage } from "usehooks-ts";

export function InventarioContextProvider(props) {
  const { userSupabase } = useContext(UserContext);

  const [index, setIndex]  = useState(null);

  //Table data
  const [tableList, setTableList] = useState([]);
  const [apiOriginal, setApiOriginal] = useState([]);

  //Search Data
  const [inventarioNombres, setInventarioNombres] = useState([]);

  //Page Table
  const [limit, setLimit] = useState(10);
  const [end, setEnd] = useState(limit);
  const [pagina, setPagina] = useState(1);

  //Clientes
  const [clientesList, setClientesList] = useState([]);

  //Lista para agregar ya sea para agregar en mercaderia o para oficina - notas de envio
  const [listToMercaderia, setListToMercaderia] = useLocalStorage(
    "resaltadorInventario",
    []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userSupabase != null) {
      getAllInventario();
      getInventarioNombres();
      getClientesAPI();
    }
  }, []);

  const getAllInventario = () => {
    get(userSupabase.token)
      .then((result) => {
        setTableList(result);
        setApiOriginal(result);
      })
      .catch((e) => {toast.error(e.data.message)});
  };

  //Get API for search
  const getInventarioNombres = () => {
    getNombresInventario(userSupabase.token)
      .then((result) => {
        setInventarioNombres(result);
      })
      .catch((e) => toast.error(e.response.data.message));
  };

  const sumInventario = (id) => {
    setLoading(true);
    getSumInventario(id, userSupabase.token)
      .then((result) => {
        const mapListInventario = apiOriginal.map((elem) => {
          if (elem.id == id)
            return { ...elem, entrada: result.entrada, salida: result.salida };
          else return elem;
        });
        setApiOriginal(mapListInventario);
        setTableList(mapListInventario);
      })
      .finally(() => setLoading(false));
  };

  //Create API inventario
  const createApi = (json) => {
    post(json, userSupabase.token)
      .then((result) => {
        setTableList([{ ...result }, ...tableList]);
        setApiOriginal([{ ...result }, ...apiOriginal]);
        toast.success("Creado Correctamente");
        getInventarioNombres();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  //Update API Inventario
  const updateApi = (id, json) => {
    update(id, json, userSupabase.token)
      .then((result) => {
        const mapListInventario = apiOriginal.map((elem) => {
          if (elem.id == id) return { ...result };
          else return elem;
        });

        setApiOriginal(mapListInventario);
        setTableList(mapListInventario);

        toast.success("Se actualizo Correctamente");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });
  };

  //Update API entrada salida
  const updateEntradaSalida = (idInventario, idCategoria, stock) => {
    const enviar = {};

    const findById = apiOriginal.find((elem) => {
      return elem.id == idInventario;
    });

    enviar.entrada = findById.entrada;
    enviar.salida = findById.salida;

    if (idCategoria == "Salida") enviar.salida += stock;
    else if (idCategoria == "Entrada") enviar.entrada += stock;
    else return toast.error("Ocurrio un error al actualizar en el inventario");

    const mapListInventario = apiOriginal.map((elem) => {
      if (elem.id == idInventario) return { ...elem, ...enviar };
      else return elem;
    });

    setApiOriginal(mapListInventario);
    setTableList(mapListInventario);
  };

  const updateEntradaSalidaFromDeleteMercaderia = (
    idInventario,
    idCategoria,
    stock
  ) => {
    const enviar = {};

    const findById = apiOriginal.find((elem) => {
      return elem.id == idInventario;
    });

    enviar.entrada = findById.entrada;
    enviar.salida = findById.salida;

    if (idCategoria == "Salida") enviar.salida -= stock;
    else if (idCategoria == "Entrada") enviar.entrada -= stock;
    else return toast.error("Ocurrio un error al actualizar en el inventario");

    const mapListInventario = apiOriginal.map((elem) => {
      if (elem.id == idInventario) return { ...elem, ...enviar };
      else return elem;
    });

    setApiOriginal(mapListInventario);
    setTableList(mapListInventario);
  };

  //Delete API inventario
  const deleteApi = (id) => {
    eliminar(id, userSupabase.token)
      .then((data) => {
        toast.success(data.message);
        setTableList(tableList.filter((elem) => elem.id != id));
        setApiOriginal(apiOriginal.filter((elem) => elem.id != id));
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  //Get old api
  const getPrevius = () => setTableList(apiOriginal);

  //Create Cliente
  const createCliente = (json) => {
    postCliente(json, userSupabase.token)
      .then((result) => {
        setClientesList(clientesList.push(result));
        toast.success("Se creo con exito");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  //Get all list clientes
  const getClientesAPI = () => {
    getClientes()
      .then((result) => setClientesList(result))
      .catch((e) => toast.error(e.response.data.message));
  };

  //Get nombres at idCliente
  const getClienteName = (idCliente) => {
    const filterList = clientesList.filter((result) => result.id === idCliente);
    if (filterList.length != 0) return filterList[0].cliente;

    return "";
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
        getPrevius,
        clientesList,
        getClienteName,
        createCliente,
        inventarioNombres,
        updateEntradaSalida,
        getAllInventario,
        updateEntradaSalidaFromDeleteMercaderia,
        setListToMercaderia,
        listToMercaderia,
        sumInventario,
        loading,
        index,
        setIndex,
      }}
    >
      {props.children}
    </InventarioContext.Provider>
  );
}
