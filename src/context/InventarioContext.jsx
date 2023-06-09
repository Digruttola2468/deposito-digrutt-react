import { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const InventarioContext = createContext();

export function InventarioContextProvider(props) {
  const [api, setApi] = useState([]);

  useEffect(() => {
    fetch("https://deposito-digrutt.up.railway.app/inventario/sumstock")
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <InventarioContext.Provider value={{api}}>
      {props.children}
      <ToastContainer />
    </InventarioContext.Provider>
  );
}
