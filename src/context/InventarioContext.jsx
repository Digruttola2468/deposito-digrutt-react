import { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const InventarioContext = createContext();

import { useLocalStorage } from "usehooks-ts";

export function InventarioContextProvider(props) {
  const [api, setApi] = useLocalStorage("inventarioApi", []);

  useEffect(() => {
    fetch("https://deposito-digrutt.up.railway.app/inventario/sumstock")
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  }, []);

  const createApi = (json) => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    };

    fetch("https://deposito-digrutt.up.railway.app/inventario", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Creado Correctamente");
        setApi([...api, result]);
      })
      .catch((error) => console.log("error", error));
  };

  const updateApi = (id, json) => {
    const raw = JSON.stringify(json);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    };

    fetch(
      `https://deposito-digrutt.up.railway.app/inventario/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        
        const newUserForeignInfo = [...api];
        let index = newUserForeignInfo.findIndex(
          (elem) => elem.idinventario == result.idinventario
        );

        newUserForeignInfo.splice(index, 1, result);

        setApi(newUserForeignInfo);

        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.log("error", error));
  };

  const deleteApi = (id) => {
    fetch(`https://deposito-digrutt.up.railway.app/inventario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setApi(api.filter((elem) => elem.id != id));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <InventarioContext.Provider
      value={{ api, createApi, updateApi, deleteApi }}
    >
      {props.children}
      <ToastContainer />
    </InventarioContext.Provider>
  );
}
