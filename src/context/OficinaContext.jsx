import { useState, createContext, useEffect, useContext } from "react";

import { getNombresInventario } from "../services/api_inventario";
import { getClientes } from "../services/api_otherTables";
import { useReadLocalStorage } from "usehooks-ts";

import { postRemito } from "../services/api_remitos";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const OficinaContext = createContext();

export const OficinaProvider = (props) => {
  const { userSupabase } = useContext(UserContext);

  const [inventarioNombres, setInventarioNombres] = useState([]);
  const [clientesList, setClientesList] = useState([]);

  const [loadingSend, setLoadingSend] = useState(false);

  useEffect(() => {
    if (userSupabase != null) {
      getInventarioNombres();
      getClientesAPI();
    }
  }, []);

  const getClientesAPI = () => {
    getClientes().then((result) => setClientesList(result));
  };

  const getInventarioNombres = () => {
    getNombresInventario(userSupabase.token)
      .then((result) => setInventarioNombres(result))
      .catch((error) => console.error(error));
  };

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

  return (
    <OficinaContext.Provider
      value={{
        inventarioNombres,
        getInventarioNombres,
        clientesList,
        getClientesAPI,
        sendRemito,
        loadingSend,
      }}
    >
      {props.children}
    </OficinaContext.Provider>
  );
};
