import { createContext, useContext, useEffect, useState } from "react";

export const FacturaNegroContext = createContext();

import { useTable } from "../hooks/useTableHook";
import { UserContext } from "./UserContext";
import {
  getOneFacturaNegro,
  getFacturaNegro,
  postFacturaNegro,
} from "../services/api_facturaNegro.js";
import { InventarioContext } from "./InventarioContext.jsx";
import { toast } from "react-toastify";

export const FacturaNegroProvider = (props) => {
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

  const { getAllInventario } = useContext(InventarioContext);

  const { userSupabase } = useContext(UserContext);

  const [apiOne, setApiOne] = useState([]);

  useEffect(() => {
    if (userSupabase != null) {
      getFacturaNegroBBDD();
    }
  }, []);

  const postFacturaNegroBBDD = (json) => {
    postFacturaNegro(json, userSupabase.token)
      .then((result) => {
        const enviar = {};
        enviar.id = result.insertId;
        enviar.nro_envio = json.nro_envio;
        enviar.idCliente = json.idCliente;
        enviar.valorDeclarado = json.valorDeclarado;
        enviar.fecha = json.fecha;

        add(enviar);
        getAllInventario();
        toast.success(result.message)
      })
      .catch((e) => console.log(e));
  };

  const getFacturaNegroBBDD = () => {
    getFacturaNegro(userSupabase.token)
      .then((result) => {
        
        setApi(result);
      })
      .catch((e) => console.log(e));
  };

  const getOneFacturaNegroBBDD = (id) => {
    getOneFacturaNegro(userSupabase.token, id)
      .then((result) => {
        if (result.error != null) toast.error(result.error.message);
        else setApiOne(result);
      })
      .catch((e) => console.log(e));
  };

  return (
    <FacturaNegroContext.Provider
      value={{
        getLengthTableList,
        showTable,
        postFacturaNegroBBDD,
        setIndex,
        limit,
        setEnd,
        getOneFacturaNegroBBDD,
        apiOne,
      }}
    >
      {props.children}
    </FacturaNegroContext.Provider>
  );
};
