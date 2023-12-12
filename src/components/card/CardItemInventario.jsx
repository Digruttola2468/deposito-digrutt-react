import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Tooltip from "@mui/material/Tooltip";
import { FaTrash, FaPen } from "react-icons/fa";
import { CardMedia, IconButton, Skeleton, Typography } from "@mui/material";
import { InventarioContext } from "../../context/InventarioContext";
import { useContext, useState } from "react";

import { IoIosRefresh } from "react-icons/io";
import { RxPlus } from "react-icons/rx";
import { RiSubtractLine } from "react-icons/ri";
import useSWR from "swr";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const fetcher = ([url, token]) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function CardItemInventario({handleUpdate = ()=>{}, handleDelete = ()=>{}}) {
  const {
    getClienteName,
    setListToMercaderia,
    listToMercaderia,
    sumInventario,
    index,
  } = useContext(InventarioContext);
  const { BASE_URL, userSupabase } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useSWR(
    [`${BASE_URL}/inventario/${index}`, userSupabase.token],
    fetcher
  );

  const handleClickSumInventario = () => {
    setLoading(true);
    sumInventario(index);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  const handleClickNewMercaderia = () => {
    const stockActual = data.data.entrada - data.data.salida;

    const dataEnviar = {
      id: data.data.id,
      nombre: data.data.nombre,
      articulo: data.data.articulo,
      descripcion: data.data.descripcion,
      idCliente: data.data.idCliente,
      urlImage: data.data.url_image,
      entrada: data.data.entrada,
      salida: data.data.salida,
      stockActual,
    }

    if (listToMercaderia.length != 0) {
      const findSameId = listToMercaderia.find(
        (elem) => elem.id == data.data.id
      );
      if (findSameId) return;

      listToMercaderia.push(dataEnviar);
      setListToMercaderia(listToMercaderia);
    } else {
      listToMercaderia.push(dataEnviar);
      setListToMercaderia(listToMercaderia);
    }
  };

  const handleClickRestMercaderia = () => {
    const filter = listToMercaderia.filter((elem) => elem.id != data.data.id);
    setListToMercaderia(filter);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h1">
            <Skeleton animation="pulse" />
          </Typography>
          <Typography variant="p">
            <Skeleton animation="pulse" />
          </Typography>
          <Typography variant="p">
            <Skeleton animation="pulse" />
          </Typography>
          <Typography variant="p">
            <Skeleton animation="pulse" />
          </Typography>
        </CardContent>
        <CardActions>
          <Skeleton
            variant="circular"
            animation="pulse"
            width={20}
            height={20}
          />
          <Skeleton
            variant="circular"
            animation="pulse"
            width={20}
            height={20}
          />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card className="ml-2 mt-4">
      {data.data.url_image ? (
        <CardMedia
          sx={{ height: 100, objectFit: "contain" }}
          image={data.data.url_image}
          title={data.data.nombre}
          component={"img"}
        />
      ) : (
        <></>
      )}
      <CardContent className="relative">
        <div
          className="absolute right-5 top-5 cursor-pointer"
          onClick={handleClickSumInventario}
        >
          <Tooltip title="refresh" className=" hover:text-blue-400">
            <IconButton size="small">
              <IoIosRefresh className={`${loading ? "animate-spin" : ""}`} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold uppercase">
            {data.data.nombre}
          </h2>
          {data.data.articulo ? (
            <p>
              <b>Articulo</b>: {data.data.articulo}
            </p>
          ) : (
            <></>
          )}
          <p>
            <b>Descripcion</b>: {data.data.descripcion}
          </p>
          <p>
            <b>Entrada</b>: {data.data.entrada}
          </p>
          <p>
            <b>Salida</b>: {data.data.salida}
          </p>
          <p>
            <b>Stock Actual</b>: {data.data.entrada - data.data.salida}
          </p>
          {data.data.pesoUnidad ? (
            <p>
              <b>Peso x Unidad</b>: {data.data.pesoUnidad} kg
            </p>
          ) : (
            <></>
          )}
          {data.data.idCliente != null ? (
            <p>
              <b>Cliente</b>: {getClienteName(data.data.idCliente)}
            </p>
          ) : (
            <></>
          )}
        </div>
      </CardContent>
      <CardActions className="relative">
        <Tooltip title="Eliminar" className="hover:text-red-500" onClick={handleDelete}>
          <IconButton size="small">
            <FaTrash />
          </IconButton>
        </Tooltip>
        <Tooltip title="actualizar" className=" hover:text-blue-400" onClick={handleUpdate}>
          <IconButton size="small">
            <FaPen />
          </IconButton>
        </Tooltip>
        <div className="absolute bottom-2 right-5 flex flex-row">
          <div className=" cursor-pointer" onClick={handleClickNewMercaderia}>
            <Tooltip
              title="agregar resaltador"
              className=" hover:text-blue-400"
            >
              <IconButton size="small">
                <RxPlus />
              </IconButton>
            </Tooltip>
          </div>
          <div className=" cursor-pointer" onClick={handleClickRestMercaderia}>
            <Tooltip title="borrar resaltador" className=" hover:text-blue-400">
              <IconButton size="small">
                <RiSubtractLine />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
