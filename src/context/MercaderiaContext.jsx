import { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MercaderiaContext = createContext();

export function MercaderiaContextProvider(props) {
  const [api, setApi] = useState([]);
  const [inventarioNombres, setInventarioNombres] = useState([]);

  useEffect(() => {
    fetch("https://deposito-digrutt.up.railway.app/mercaderia/entrada")
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));

    fetch("https://deposito-digrutt.up.railway.app/inventario/nombres")
      .then((result) => result.json())
      .then((result) => setInventarioNombres(result))
      .catch((error) => console.error(error));
  }, []);

  const getEntradaApi = () => {
    fetch("https://deposito-digrutt.up.railway.app/mercaderia/entrada")
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
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
      `https://deposito-digrutt.up.railway.app/mercaderia/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        const newUserForeignInfo = [...api];
        let index = newUserForeignInfo.findIndex(elem => elem.id == result.id);

        const filter = inventarioNombres.filter(
          (elem) => elem.id == result.idinventario
        );

        newUserForeignInfo.splice(index, 1, {
          ...result,
          nombre: filter[0].nombre,
          descripcion: filter[0].descripcion,
        });

        setApi(newUserForeignInfo); 

        toast.success("Se actualizo Correctamente");
      })
      .catch((error) => console.log("error", error));
  };

  const createApi = (json) => {
    fetch("https://deposito-digrutt.up.railway.app/mercaderia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => response.json())
      .then((data2) => {
        fetch(
          `https://deposito-digrutt.up.railway.app/inventario/${data2.idinventario}`
        )
          .then((response) => response.json())
          .then((data) => {
            toast.success("Se envio correctamente");
            setApi([
              ...api,
              {
                ...data2,
                nombre: data[0].nombre,
                descripcion: data[0].descripcion,
              },
            ]);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteApi = (id) => {
    fetch(`https://deposito-digrutt.up.railway.app/mercaderia/${id}`, {
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

  const searchByCodProductoApi = (search) => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://deposito-digrutt.up.railway.app/mercaderia/entrada/${search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setApi(result))
      .catch((error) => console.log("error", error));
    
  };

  return (
    <MercaderiaContext.Provider
      value={{
        api,
        inventarioNombres,
        createApi,
        updateApi,
        deleteApi,
        getEntradaApi,
        searchByCodProductoApi,
      }}
    >
      {props.children}
      <ToastContainer />
    </MercaderiaContext.Provider>
  );
}
