import { useState, useContext, useEffect } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import { useReadLocalStorage } from "usehooks-ts";
import DialogUpdate from "../../dialog/DialogUpdate";
import DialogDelete from "../../dialog/DialogDelete";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CardItemMercaderia from "../../card/CardItemMercaderia";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function InfoItem() {
  const { tableList, deleteApi, updateApi, idCategoria } =
    useContext(MercaderiaContext);

  const index = useReadLocalStorage("selectIndexMercaderia");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [apiOne, setapiOne] = useState(null);

  //2 - Entrada
  //1 - Salida
  const [idcategoria, setIdCategoria] = useState(idCategoria);

  const [stock, setStock] = useState("");
  const [fecha, setFecha] = useState(null);

  //Handle
  const handleDelete = () => {
    deleteApi(apiOne.id);
    setOpenDelete(false);
  };

  const handleUpdate = () => {
    updateApi(apiOne.id, {
      stock,
      fecha,
      idcategoria,
    });
    setFecha(null);
    setStock("");
    setIdCategoria(idCategoria);
    setapiOne({});
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (index != null) setapiOne(tableList.find((elem) => elem.id == index));
    else setapiOne(null);
  }, [index]);

  return (
    <div className="mt-5">
      {apiOne ? (
        <CardItemMercaderia
          data={apiOne}
          handleDelete={() => setOpenDelete(true)}
          handleUpdate={() => setOpenUpdate(true)}
        />
      ) : (
        <></>
      )}

      <DialogDelete
        show={openDelete}
        close={() => setOpenDelete(false)}
        handleDelete={handleDelete}
        title="Eliminar Mercaderia"
      />

      <DialogUpdate
        title="Actualizar Mercaderia"
        handleUpdate={handleUpdate}
        show={openUpdate}
        close={() => setOpenUpdate(false)}
      >
        <div className="flex flex-col">
          <div className="my-2">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={idcategoria}
                label="Categoria"
                onChange={(evt, value) => {
                  setIdCategoria(value.props.value);
                }}
              >
                <MenuItem value={1}>Salida</MenuItem>
                <MenuItem value={2}>Entrada</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="my-2">
            <TextField
              sx={{ width: "100%" }}
              label="Cantidad"
              placeholder="Cantidad"
              value={stock}
              type="number"
              onChange={(evt) => setStock(evt.target.value)}
            />
          </div>
          <div className="my-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                value={fecha}
                onChange={(evt, value) => {
                  if (evt != null)
                    setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
                  else setFecha(null);
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </div>
        </div>
      </DialogUpdate>
    </div>
  );
}
