import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { useContext } from "react";

import { InventarioContext } from "../../context/InventarioContext";
import { useReadLocalStorage } from "usehooks-ts";

export default function BodyCardItem({ handleDelete, handleUpdate }) {
  const { tableList, getClienteName } = useContext(InventarioContext);
  const index = useReadLocalStorage("selectIndexInventario");

  return (
    <>
      {tableList
        .filter((elem) => elem.id == index)
        .map((elem) => {
          return (
            <Card key={elem.id} className="ml-2 mt-4">
              <CardContent>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold uppercase">
                    {elem.nombre}
                  </h2>
                  {elem.articulo ? (
                    <p>
                      <b>Articulo</b>: {elem.articulo}
                    </p>
                  ) : (
                    <></>
                  )}
                  <p>
                    <b>Descripcion</b>: {elem.descripcion}
                  </p>
                  <p>
                    <b>Entrada</b>: {elem.entrada}
                  </p>
                  <p>
                    <b>Salida</b>: {elem.salida}
                  </p>
                  <p>
                    <b>Stock Actual</b>: {elem.entrada - elem.salida}
                  </p>
                  {elem.pesoUnidad ? (
                    <p>
                      <b>Peso x Unidad</b>: {elem.pesoUnidad} kg
                    </p>
                  ) : (
                    <></>
                  )}
                  {elem.idCliente != null ? (
                    <p>
                      <b>Cliente</b>: {getClienteName(elem.idCliente)}
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
          );
        })}
    </>
  );
}
