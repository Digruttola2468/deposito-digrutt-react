import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { InventarioContext } from "../../context/InventarioContext";
import { useContext } from "react";

export default function CardItemInventario({ data, handleUpdate, handleDelete }) {
  const { getClienteName } = useContext(InventarioContext);
  const {
    nombre,
    articulo,
    descripcion,
    entrada,
    salida,
    idCliente,
    pesoUnidad,
  } = data;

  const stockActual = entrada - salida;

  return (
    <>
      <Card className="ml-2 mt-4">
        <CardContent>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold uppercase">{nombre}</h2>
            {articulo ? (
              <p>
                <b>Articulo</b>: {articulo}
              </p>
            ) : (
              <></>
            )}
            <p>
              <b>Descripcion</b>: {descripcion}
            </p>
            <p>
              <b>Entrada</b>: {entrada}
            </p>
            <p>
              <b>Salida</b>: {salida}
            </p>
            <p>
              <b>Stock Actual</b>: {stockActual}
            </p>
            {pesoUnidad ? (
              <p>
                <b>Peso x Unidad</b>: {pesoUnidad} kg
              </p>
            ) : (
              <></>
            )}
            {idCliente != null ? (
              <p>
                <b>Cliente</b>: {getClienteName(idCliente)}
              </p>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Tooltip
            title="Eliminar"
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
            className=" hover:text-blue-400"
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
