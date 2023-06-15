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
            <Card key={elem.id} sx={{ marginLeft: 1, marginTop: 3 }}>
              <CardContent>
                <div>
                  <h2>{elem.nombre}</h2>
                  <p>
                    <b>Descripcion</b>: {elem.descripcion}
                  </p>
                  <p>
                    <b>Salida</b>: {elem.Salida}
                  </p>
                  <p>
                    <b>Entrada</b>: {elem.Entrada}
                  </p>
                  <p>
                    <b>Stock Actual</b>: {elem.Entrada - elem.Salida}
                  </p>
                </div>
              </CardContent>
              <CardActions>
                {handleDelete != undefined ? (
                  <Tooltip
                    title="Eliminar"
                    onClick={handleDelete}
                    className="pdf"
                  >
                    <IconButton size="small">
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
                    className="update"
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
