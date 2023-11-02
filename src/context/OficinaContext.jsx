import { useState, createContext, useEffect } from "react";

import { getNombresInventario } from "../services/api_inventario";
import { getClientes } from "../services/api_otherTables";
import { useReadLocalStorage } from "usehooks-ts";

import {postRemito} from '../services/api_remitos'
import { toast } from "react-toastify";

export const OficinaContext = createContext();

export const OficinaProvider = (props) => {
  const [inventarioNombres, setInventarioNombres] = useState([]);
  const token = useReadLocalStorage('token');
  const [clientesList, setClientesList] = useState([]);

  const [loadingSend, setLoadingSend] = useState(false);

  useEffect(() => {
    getInventarioNombres();
    getClientesAPI();
  }, []);

  const getClientesAPI = () => {
    getClientes().then(result => setClientesList(result))
  }

  const getInventarioNombres = () => {
    getNombresInventario(token)
      .then((result) => setInventarioNombres(result))
      .catch((error) => console.error(error));
  };

  const sendRemito = async (jsonData) => {
    setLoadingSend(true);
    try {
      const result = await postRemito(token, jsonData)
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
    setLoadingSend(false);
  }

  return (
    <OficinaContext.Provider
      value={{ inventarioNombres, getInventarioNombres,clientesList,getClientesAPI,sendRemito,loadingSend }}
    >
      {props.children}
    </OficinaContext.Provider>
  );
};
