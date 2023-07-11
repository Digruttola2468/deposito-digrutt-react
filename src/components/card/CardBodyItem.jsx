import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";

export default function BodyCardItem({
  data,
  handleDelete,
  handleUpdate,
  index,
}) {
  return (
    <>
      {data
        .filter((elem) => elem.id == index)
        .map((elem) => {
          return (
            <Card key={elem.id} className="ml-2 mt-4">
              <CardContent>
                <div>
                  <h2>{elem.nombre}</h2>
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
                </div>
              </CardContent>
              <CardActions>
                {handleDelete != undefined ? (
                  <Tooltip
                    title="Eliminar"
                    onClick={handleDelete}
                    className="hover:text-red-500" 
                  >
                    <IconButton size="small" >
                      <FaTrash />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
                {handleUpdate != undefined ? (
                  <Tooltip
                    title="actualizar"
                    onClick={handleUpdate}
                    className=" hover:text-blue-400"
                  >
                    <IconButton size="small">
                      <FaPen />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </CardActions>
            </Card>
          );
        })}
    </>
  );
}
