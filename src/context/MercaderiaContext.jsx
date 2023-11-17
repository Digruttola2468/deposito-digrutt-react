import { createContext, useContext, useEffect, useState } from "react";

export const MercaderiaContext = createContext();

//API REST
import {
  update,
  eliminar,
  post,
  getAllMercaderia,
  getGrafica,
} from "../services/api_mercaderia";

import {
  getOneInventario,
  getNombresInventario,
  post as postInventario,
} from "../services/api_inventario";

import {
  getClientes,
  getFacturaNegro,
  postFacturaNegro,
} from "../services/api_otherTables";

import { toast } from "react-toastify";
import { useReadLocalStorage } from "usehooks-ts";
import { InventarioContext } from "./InventarioContext";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export function MercaderiaContextProvider(props) {
  const { userSupabase } = useContext(UserContext);
  const {
    clientesList,
    updateEntradaSalida,
    getAllInventario,
    updateEntradaSalidaFromDeleteMercaderia,
  } = useContext(InventarioContext);
  //table search
  const [inputSearch, setInputSearch] = useState("");

  //table data
  const [tableList, setTableList] = useState([]);
  const [apiOriginal, setApiOriginal] = useState([]);

  //Get all Name inventarios
  const [inventarioNombres, setInventarioNombres] = useState([]);

  //table page
  const [pagina, setPagina] = useState(1);
  const [limit, setLimit] = useState(10);
  const [end, setEnd] = useState(limit);

  //2: ENTRADA
  //1: SALIDA
  const [idCategoria, setIdCategoria] = useState(2);

  //grafica
  const [grafica, setGrafica] = useState([]);

  const [listFacturaNegro, setListFacturaNegro] = useState([]);

  //Loading to send factura Negro
  const [isDoneFacturaNegro, setIsDoneFacturaNegro] = useState(false);

  const getAllFacturasNegro = () => {
    getFacturaNegro(userSupabase.token)
      .then((result) => {
        setListFacturaNegro(result);
      })
      .catch((e) => console.log(e));
  };

  const postAllFacturaNegro = (json) => {
    setIsDoneFacturaNegro(true);
    postFacturaNegro(json, userSupabase.token)
      .then((result) => {
        toast.success(result.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
    setIsDoneFacturaNegro(false);
  };

  //Get List mercaderia from BBDD
  const getListMercaderiaAll = () => {
    getAllMercaderia(userSupabase.token)
      .then((result) => {
        setApiOriginal(result);
        setTableList(result.filter((e) => e.categoria == "Entrada"));
        setIdCategoria(2);
      })
      .catch((e) => toast.error(e.response.data.message));
  };

  const getGraficaMercaderia = (idinventario) => {
    getGrafica(idinventario, userSupabase.token).then((result) => {
      setGrafica(result);
    });
  };

  //
  useEffect(() => {
    if (userSupabase != null) {
      getListMercaderiaAll();
      getAllFacturasNegro();
    } 
  }, []);

  //filtramos list Mercaderia BBDD
  const getEntradaSalidaAllMercaderia = (category) => {
    return apiOriginal.filter((e) => e.categoria == category);
  };

  const getEntradaApi = () => {
    setTableList(getEntradaSalidaAllMercaderia("Entrada"));
    setIdCategoria(2); //Entrada

    //Obtiene los primemos 10
    setEnd(limit * 1);
    setPagina(1);

    setInputSearch("");
  };

  const getSalidaApi = () => {
    setTableList(getEntradaSalidaAllMercaderia("Salida"));
    setIdCategoria(1); //Salida

    //Obtiene los primemos 10
    setEnd(limit * 1);
    setPagina(1);

    setInputSearch("");
  };

  //update table
  const getPrevius = () => {
    if (idCategoria === 2) getEntradaApi();
    else if (idCategoria === 1) getSalidaApi();
    else console.error("Error: idCategoria no es ni 1 (entrada) ni 2 (salida)");
  };

  //update BBDD
  const updateApi = (id, json) => {
    update(id, json, userSupabase.token)
      .then((result) => {
        const mapListInventario = apiOriginal.map((elem) => {
          if (elem.id == id) return { ...result };
          else return elem;
        });

        setTableList(mapListInventario);
        setApiOriginal(mapListInventario);

        //Refresh Inventario
        getAllInventario();

        toast.success("Se actualizo Correctamente");
      })
      .catch((e) => toast.error(e.response.data.message));
  };

  //create BBDD
  const createApi = (json) => {
    post(json, userSupabase.token)
      .then((data2) => {
        setApiOriginal([
          {
            ...data2,
          },
          ...apiOriginal,
        ]);
        setTableList([
          {
            ...data2,
          },
          ...tableList,
        ]);

        updateEntradaSalida(data2.idinventario, data2.categoria, data2.stock);
        toast.success("Se agrego correctamente");
      })
      .catch((e) => toast.error(e.response.data.message));
  };

  //create inventario BBDD
  const createInventario = (json) => {
    postInventario(json, userSupabase.token)
      .then((result) => {
        toast.success("Creado Correctamente");
        inventarioNombres.push({ ...result });
      })
      .catch((error) => console.log("error", error));
  };

  //delete BBDD
  const deleteApi = (id) => {
    eliminar(id, userSupabase.token)
      .then((data) => {
        toast.success(data.message);

        const findById = apiOriginal.find((elem) => {
          return elem.id == id;
        });
        updateEntradaSalidaFromDeleteMercaderia(
          findById.idinventario,
          findById.categoria,
          findById.stock
        );

        setApiOriginal(apiOriginal.filter((elem) => elem.id != id));
        setTableList(tableList.filter((elem) => elem.id != id));
      })
      .catch((e) => toast.error(e.response.data.message));
  };

  //ORDER BY
  const orderNombreASC = () => {
    setTableList(
      tableList.sort((a, b) => {
        if (a.nombre > b.nombre) return 1;
        if (a.nombre < b.nombre) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Nombre Ascendente");
  };
  const orderNombreDESC = () => {
    setTableList(
      tableList.sort((a, b) => {
        if (a.nombre < b.nombre) return 1;
        if (a.nombre > b.nombre) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Nombre Descendente");
  };
  const orderFechaASC = () => {
    setTableList(
      tableList.sort((a, b) => {
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
    setTableList(
      tableList.sort((a, b) => {
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
    setTableList(
      tableList.sort((a, b) => {
        if (a.stock > b.stock) return 1;
        if (a.stock < b.stock) return -1;
        return 0;
      })
    );
    toast.info("Ordenado Stock Ascendente");
  };
  const orderCantidadDESC = () => {
    setTableList(
      tableList.sort((a, b) => {
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
        inputSearch,
        setInputSearch,
        tableList,
        setTableList,
        apiOriginal,
        inventarioNombres,
        pagina,
        setPagina,
        limit,
        setLimit,
        end,
        setEnd,
        idCategoria,
        setIdCategoria,
        getGraficaMercaderia,
        grafica,
        getEntradaApi,
        getSalidaApi,
        getPrevius,
        createApi,
        updateApi,
        deleteApi,
        createInventario,
        orderNombreASC,
        orderNombreDESC,
        orderFechaASC,
        orderFechaDESC,
        orderCantidadASC,
        orderCantidadDESC,
        isDoneFacturaNegro,
        clientesList,
        postAllFacturaNegro,
      }}
    >
      {props.children}
    </MercaderiaContext.Provider>
  );
}
