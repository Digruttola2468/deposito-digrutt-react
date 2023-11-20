import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";

const getDateWithNameMonth = (fechaString) => {
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
  const fDate = new Date(fechaString);
  return `${fDate.getDate()} ${
    monthNames[fDate.getMonth() + 1]
  } ${fDate.getFullYear()}`;
};

export default function CardItemMercaderia({
  data,
  handleUpdate,
  handleDelete,
}) {
  const { fecha, descripcion, nombre, stock, proveedor } = data;

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-col">
            <div className="w-full bg-slate-400 rounded-lg"></div>

            <h2 className="text-lg font-semibold uppercase">{nombre}</h2>

            <p>
              <b>Descripcion</b>: {descripcion}
            </p>
            <p>
              <b>Fecha</b>: {getDateWithNameMonth(fecha)}
            </p>
            <p>
              <b>Cantidad</b>: {stock}
            </p>
            <p>
              <b>Proveedor</b>: {proveedor}
            </p>
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
