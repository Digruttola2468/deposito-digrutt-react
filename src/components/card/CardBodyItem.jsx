import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";

const URL =
  "https://ujutbcehnajaspkfqgyp.supabase.co/storage/v1/object/public/Digrutt/";

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
                <div className="flex flex-col">
                  <div className="w-full bg-slate-400 rounded-lg">
                    <div className="m-auto w-[150px] ">
                      <img src={`${URL}/${elem.nombre}.png`} alt="" />
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold uppercase">
                    {elem.nombre}
                  </h2>
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
