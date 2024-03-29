import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import useSWR from "swr";
import axios from "axios";
import { InventarioContext } from "../../../context/InventarioContext";
import { OficinaContext } from "../../../context/OficinaContext";
import { Box, LinearProgress, Pagination, Skeleton } from "@mui/material";

const fetcher = ([url, token]) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function TableRemito() {
  const { userSupabase, BASE_URL } = useContext(UserContext);
  const { getClienteName } = useContext(InventarioContext);
  const { setIndex, getOneRemitoBBDD } = useContext(OficinaContext);

  const { data, isLoading, error } = useSWR(
    [`${BASE_URL}/remito`, userSupabase.token],
    fetcher
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  useEffect(() => setStart(end - 10), [end]);


  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <table className="min-w-full text-left text-sm font-light ">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Remito
            </th>
            <th scope="col" className="px-6 py-4">
              Fecha
            </th>
            <th scope="col" className="px-6 py-4">
              Cliente
            </th>
            <th scope="col" className="px-6 py-4">
              Orden
            </th>
            <th scope="col" className="px-6 py-4">
              Valor Total Declarado
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.slice(start, end).map((elem) => {
            return (
              <tr
                className={`border-b dark:border-neutral-500 hover:border-info-200 hover:bg-cyan-200 hover:text-neutral-800`}
                key={elem.id}
                onClick={() => {
                  setIndex(elem.id);
                  getOneRemitoBBDD(elem.id);
                }}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {elem.num_remito}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{elem.fecha}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {getClienteName(elem.idCliente)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {elem.num_orden}
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {elem.total == 0 ? "" : `$${elem.total}ARG`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row justify-center ">
        <Pagination
          count={Math.ceil(data.data.length / 10)}
          onChange={(evt, value) => {
            setEnd(10 * parseInt(value));
          }}
        />
      </div>
    </>
  );
}
