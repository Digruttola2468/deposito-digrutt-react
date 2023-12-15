import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";
import useSWR from "swr";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const getDateWithNameMonth = (fechaString = "") => {
  const monthNames = [
    "NaN",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let info = fechaString.split("-").join("/");
  const fDate = new Date(info);

  if (Number.isNaN(fDate.getDate())) return "";

  return `${fDate.getDate()} ${
    monthNames[fDate.getMonth() + 1]
  } ${fDate.getFullYear()}`;
};

const fetcher = ([url, token]) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => result.data);
};

export default function CardItemMercaderia({
  index,
  handleUpdate,
  handleDelete,
}) {
  const { BASE_URL, userSupabase } = useContext(UserContext);

  const { data, isLoading, error } = useSWR(
    [`${BASE_URL}/mercaderia/${index}`, userSupabase.token],
    fetcher
  );

  if (isLoading) return <></>;
  
  if (error) 
    return <></>

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-col">
            <div className="w-full bg-slate-400 rounded-lg"></div>

            <h2 className="text-lg font-semibold uppercase">{data.nombre}</h2>

            <p>
              <b>Descripcion</b>: {data.descripcion}
            </p>
            <p>
              <b>Fecha</b>: {getDateWithNameMonth(data.fecha)}
            </p>
            <p>
              <b>Cantidad</b>: {data.stock}
            </p>
            {data.remito ? (
              <p>
                <b>Remito</b>: {data.remito}
              </p>
            ) : (
              <></>
            )}
            {data.nroEnvio ? (
              <p>
                <b>Nota Envio</b>: {data.nroEnvio}
              </p>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Tooltip
            title="eliminar"
            onClick={handleDelete}
            className="hover:text-red-500"
          >
            <IconButton size="small">
              <FaTrash />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="actualizar"
            onClick={handleUpdate}
            className="hover:text-blue-400"
          >
            <IconButton size="small">
              <FaPen />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </>
  );
}
