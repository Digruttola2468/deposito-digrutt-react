import {
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function DialogUpdateCliente({
  open = false,
  close,
  apiOne = null,
  refresh
}) {
  const { BASE_URL, userSupabase } = useContext(UserContext);

  const {
    data: localidadApi,
    isLoading,
    error,
  } = useSWR(`${BASE_URL}/localidad`, fetcher);

  const [cliente, setCliente] = useState("");
  const [cuit, setCuit] = useState("");
  const [gmail, setGmail] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [localidad, setLocalidad] = useState("");

  const handleUpdate = () => {
    const id = apiOne.id;

    const enviar = {
      cliente: cliente == "" ? null : cliente,
      domicilio: domicilio == "" ? null : domicilio,
      localidad: localidad == "" ? null : localidad,
      mail: gmail == "" ? null : gmail,
      cuit: cuit == "" ? null : cuit,
    };

    axios
      .put(`${BASE_URL}/cliente/${id}`, enviar, {
        headers: {
          Authorization: `Bearer ${userSupabase.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        refresh();
        close(false);
        empty();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const empty = () => {
    setCliente("");
    setCuit("");
    setGmail("");
    setDomicilio("");
    setLocalidad("");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        close(false);
        empty();
      }}
    >
      <DialogTitle>Actualizar Cliente</DialogTitle>
      <DialogContent className="flex flex-col">
        <TextField
          sx={{ margin: 1 }}
          label="Cliente"
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder={apiOne ? apiOne.cliente : ""}
        />
        <TextField
          sx={{ margin: 1 }}
          type="email"
          label="Correo Electronico"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          placeholder={apiOne ? apiOne.mail : ""}
        />
        <TextField
          sx={{ margin: 1 }}
          label="Domicilio"
          type="text"
          value={domicilio}
          onChange={(e) => setDomicilio(e.target.value)}
          placeholder={apiOne ? apiOne.domicilio : ""}
        />
        <TextField
          sx={{ margin: 1 }}
          label="CUIT"
          type="number"
          value={cuit}
          onChange={(e) => setCuit(e.target.value)}
          placeholder={apiOne ? apiOne.cuit : ""}
        />
        <Box sx={{ margin: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Localidad</InputLabel>
            <Select
              value={localidad}
              label="Localidad"
              onChange={(evt) => setLocalidad(evt.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isLoading ? (
                <></>
              ) : (
                localidadApi.map((elem) => {
                  return (
                    <MenuItem key={elem.id} value={elem.id}>
                      {elem.ciudad}
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            close(false);
            empty();
          }}
          variant="text"
        >
          Cancelar
        </Button>
        <Button onClick={handleUpdate} autoFocus variant="outlined">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
