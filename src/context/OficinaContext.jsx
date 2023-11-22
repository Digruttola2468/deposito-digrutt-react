import { useState, createContext, useContext, useEffect } from "react";

import { getOneRemito, getRemitos, postRemito } from "../services/api_remitos";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { InventarioContext } from "./InventarioContext";

export const OficinaContext = createContext();

import { useTable } from "../hooks/useTableHook";

export const OficinaProvider = (props) => {
  const {
    add,
    deletet,
    getOne,
    getPrevius,
    setApi,
    showTable,
    update,
    setIndex,
    getLengthTableList,
    limit,
    setEnd,
  } = useTable();

  const { inventarioNombres, clientesList } = useContext(InventarioContext);
  const { userSupabase } = useContext(UserContext);

  const [loadingSend, setLoadingSend] = useState(false);

  const [apiOne, setApiOne] = useState([]);

  useEffect(() => {
    if (userSupabase != null) {
      getApiFetch();
    }
  }, []);

  const sendRemito = async (jsonData) => {
    setLoadingSend(true);
    try {
      const result = await postRemito(userSupabase.token, jsonData);
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
    setLoadingSend(false);
  };
  const getOneRemitoBBDD = (id) => {
    getOneRemito(userSupabase.token, id)
      .then((result) => {
        if (result.error != null) 
          toast.error(result.error.message)
        else setApiOne(result);
      })
      .catch((e) => console.log(e));
  };

  const getApiFetch = () => {
    setLoadingSend(true);
    getRemitos(userSupabase.token)
      .then((result) => {
        setApi(result);
      })
      .catch((e) => console.error(e));
    setLoadingSend(false);
  };

  return (
    <OficinaContext.Provider
      value={{
        getLengthTableList,
        showTable,
        inventarioNombres,
        clientesList,
        sendRemito,
        loadingSend,
        setIndex,
        limit,
        setEnd,
        getOneRemitoBBDD,
        apiOne
      }}
    >
      {props.children}
    </OficinaContext.Provider>
  );
};
