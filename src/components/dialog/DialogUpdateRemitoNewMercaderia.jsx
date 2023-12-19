import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import useSWR from "swr";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const fetcher = ([url, token]) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => result.data);
};

export default function DialogUpdateRemitoNewMercaderia({
  open,
  close,
  apiOne,
  refresh,
}) {
  const { BASE_URL, userSupabase } = useContext(UserContext);
  const { data, isLoading } = useSWR(
    [
      `https://deposito-digrutt-express-production.up.railway.app/api/inventario/nombres`,
      userSupabase.token,
    ],
    fetcher
  );

  const [codProducto, setCodProducto] = useState(null);
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const handleUpdate = async () => {
    if (codProducto != null) {
      console.log("SEND: ", [
        {
          stock,
          price,
          idInventario: codProducto.id,
        },
      ]);

      const idRemito = apiOne.remito.id;
      try {
        const result = await axios.put(
          `https://deposito-digrutt-express-production.up.railway.app/api/remito/newProduct/${idRemito}`,
          [
            {
              stock,
              price,
              idInventario: codProducto.id,
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${userSupabase.token}`,
            },
          }
        );
        console.log(result);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }

      empty();
      refresh();
    }
  };

  const empty = () => {
    setCodProducto(null);
    setStock("");
    setPrice("");
  };

  const getDataFilterCliente = () => {
    //idCliente
    const filterCliente = data.filter((elm) => {
      return elm.idCliente === apiOne.remito.idCliente;
    });
    return filterCliente;
  };

  if (isLoading) return <></>;

  return (
    <Dialog open={open} onClose={() => close(false)}>
      <DialogTitle>Agregar Nueva Mercaderia al Remito</DialogTitle>
      <DialogContent className="flex flex-col">
        {codProducto ? (
          <div>
            <div className="my-2">
              <div className="flex flex-row">
                {codProducto.urlImage ? (
                  <div>
                    <img
                      src={codProducto.urlImage}
                      alt=""
                      className="w-15 h-10"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <h2 className="font-bold uppercase">{codProducto.nombre} </h2>
                  <p className="font-semibold text-sm text-gray-400">
                    {codProducto.descripcion}
                  </p>
                  <p className="font-semibold text-sm text-gray-400">
                    <b>Stock Actual: </b>
                    <span
                      className={
                        codProducto.entrada - codProducto.salida > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {codProducto.entrada - codProducto.salida}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ) : (
          <></>
        )}
        <Autocomplete
          options={getDataFilterCliente()}
          getOptionLabel={(elem) => elem.nombre}
          sx={{ margin: 1 }}
          value={codProducto}
          onChange={(evt, newValue) => setCodProducto(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Cod Producto" variant="outlined" />
          )}
        />
        <TextField
          label={"Stock"}
          type="number"
          value={stock}
          onChange={(evt) => setStock(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1 }}
        />
        <TextField
          label={"Precio"}
          type="number"
          value={price}
          onChange={(evt) => setPrice(evt.target.value)}
          variant="outlined"
          sx={{ margin: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close(false)} variant="text">
          Cancelar
        </Button>
        <Button onClick={handleUpdate} autoFocus variant="outlined">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
