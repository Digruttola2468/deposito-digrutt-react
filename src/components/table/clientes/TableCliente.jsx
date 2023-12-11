import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { Button, Divider, Pagination } from "@mui/material";
import useSWR from "swr";
import DialogNewCliente from "../../dialog/DialogNewCliente";

export default function TableCliente() {
  const { BASE_URL } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  const { data, isLoading, error } = useSWR(`${BASE_URL}/clientes`, (url) =>
    axios.get(url)
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [openDialogNewCliente, setOpenDialogCliente] = useState(false);

  useEffect(() => setStart(end - 10), [end]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Divider>
        <h1 className="text-center text-2xl font-bold my-5">TABLE CLIENTES</h1>
      </Divider>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:max-w-[1100px] py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden ">
              <Button onClick={() => setOpenDialogCliente(true)}>
                New Cliente
              </Button>
              <table className="min-w-full text-left text-sm font-light ">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Codigo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Domicilio
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Localidad
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Gmail
                    </th>
                    <th scope="col" className="px-6 py-4">
                      CUIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.slice(start, end).map((elem) => {
                    return (
                      <tr
                        className={`border-b dark:border-neutral-500 hover:border-info-200 hover:bg-cyan-200 hover:text-neutral-800`}
                        key={elem.id}
                        onClick={() => setIndex(elem.id)}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {elem.codigo}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {elem.cliente}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {elem.domicilio}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {elem.ciudad}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {elem.mail}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {elem.cuit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-row justify-center ">
            <Pagination
              count={Math.ceil(data.data.length / 10)}
              onChange={(evt, value) => {
                setEnd(10 * parseInt(value));
              }}
            />
          </div>
        </div>
        {/*<ItemCliente index={index} />*/}
      </div>
      <DialogNewCliente
        open={openDialogNewCliente}
        close={setOpenDialogCliente}
      />
    </>
  );
}
