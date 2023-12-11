import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../../../context/UserContext";
import { Card, CardActions, CardContent, IconButton, Tooltip } from "@mui/material";
import { FaPen, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function ItemCliente({ index = 0 }) {
  const { BASE_URL } = useContext(UserContext);

  const { data, isLoading, error } = useSWR(
    `${BASE_URL}/cliente/${index}`,
    (url) => axios.get(url)
  );

  if (index == 0) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col">
          <div className="w-full bg-slate-400 rounded-lg"></div>

          <h2 className="text-lg font-semibold uppercase">
            {data.data.cliente}
          </h2>

          <p>
            <b>Codigo</b>: {data.data.codigo}
          </p>
          <p>
            <b>Domicilio</b>: {data.data.domicilio}
          </p>
          <p>
            <b>Localidad: </b>: {data.data.localidad}
          </p>
          <p>
            <b>Gmail: </b>: {data.data.mail}
          </p>
          <p>
            <b>Cuit: </b>: {data.data.cuit}
          </p>
        </div>
      </CardContent>
      <CardActions>
        <Tooltip
          title="eliminar"
          onClick={() => {
            alert("Fuera de servicio");
          }}
          className="hover:text-red-500"
        >
          <IconButton size="small">
            <FaTrash />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="actualizar"
          onClick={() => {
            alert("Fuera de servicio");
          }}
          className="hover:text-blue-400"
        >
          <IconButton size="small">
            <FaPen />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
/** */
