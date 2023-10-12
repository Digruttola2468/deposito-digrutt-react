import { useState, createContext } from "react";

import { getNombresInventario } from "../services/api_inventario";
import { getClientes } from "../services/api_otherTables";

export const OficinaContext = createContext();

export const OficinaProvider = (props) => {
  const [inventarioNombres, setInventarioNombres] = useState([]);

  const [clientesList, setClientesList] = useState([]);

  const getClientesAPI = () => {
    getClientes().then(result => setClientesList(result))
  }

  const getInventarioNombres = () => {
    getNombresInventario()
      .then((result) => setInventarioNombres(result))
      .catch((error) => console.error(error));
  };

  return (
    <OficinaContext.Provider
      value={{ inventarioNombres, getInventarioNombres,clientesList,getClientesAPI }}
    >
      {props.children}
    </OficinaContext.Provider>
  );
};
