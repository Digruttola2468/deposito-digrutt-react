import { useState, useContext, useEffect } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";
import { useReadLocalStorage } from "usehooks-ts";
import DialogUpdate from "../../dialog/DialogUpdate";
import DialogDelete from "../../dialog/DialogDelete";
import { TextField } from "@mui/material";
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
    });
    setFecha(null);
    setStock("");
    setapiOne({});
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (index != null) setapiOne(tableList.find((elem) => elem.id == index));
    else setapiOne(null);
  }, [index]);

  return (
    <div className="mt-5">
      <CardItemMercaderia
        index={index}
        handleDelete={() => setOpenDelete(true)}
        handleUpdate={() => setOpenUpdate(true)}
      />

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
