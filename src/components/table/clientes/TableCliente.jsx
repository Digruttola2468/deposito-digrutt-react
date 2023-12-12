import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Pagination,
  Tooltip,
} from "@mui/material";
import useSWR from "swr";
import DialogNewCliente from "../../dialog/DialogNewCliente";
import SearchCliente from "../../search/SearchCliente";
import { FaPen, FaTrash } from "react-icons/fa";
import DialogUpdateCliente from "../../dialog/DialogUpdateCliente";
import { toast } from "react-toastify";

export default function TableCliente() {
  const { BASE_URL, userSupabase } = useContext(UserContext);

  const [apiOne, setApiOne] = useState(null);

  const [clienteOriginal, setClienteOriginal] = useState([]);
  const [listCliente, setListCliente] = useState([]);

  const [dialogUpdate, setDialogUpdate] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const { isLoading, mutate } = useSWR(
    `${BASE_URL}/clientes`,
    (url) => axios.get(url),
    {
      onSuccess: (data) => {
        setListCliente(data.data);
        setClienteOriginal(data.data);
      },
    }
  );
    
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [openDialogNewCliente, setOpenDialogCliente] = useState(false);

  useEffect(() => setStart(end - 10), [end]);

  if (isLoading) {
    return <></>;
  }

  const handleDeleteCliente = () => {
    const id = apiOne.id;

    axios
      .delete(`${BASE_URL}/cliente/${id}`, {
        headers: {
          Authorization: `Bearer ${userSupabase.token}`,
        },
      })
      .then((result) => {
        const deleteListClienteById = clienteOriginal.filter(
          (elem) => elem.id != id
        );

        setClienteOriginal(deleteListClienteById);
        setListCliente(deleteListClienteById);

        toast.success(result.data.message);
        setDialogDelete(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const paginaInicial = () => {
    setStart(0);
    setEnd(10);
  }

  return (
    <>
      <Divider>
        <h1 className="text-center text-2xl font-bold my-5">TABLE CLIENTES</h1>
      </Divider>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="flex flex-row items-center">
            <SearchCliente setData={setListCliente} data={clienteOriginal} paginaInit={paginaInicial} />
            <Button onClick={() => setOpenDialogCliente(true)}>
              New Cliente
            </Button>
          </div>
          <div className="inline-block min-w-full sm:max-w-[1200px] py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden ">
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
                    <th scope="col" className="px-6 py-4">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listCliente.slice(start, end).map((elem) => {
                    return (
                      <tr
                        className={`border-b dark:border-neutral-500 hover:border-info-200 hover:bg-cyan-200 hover:text-neutral-800`}
                        key={elem.id}
                        onClick={() => {
                          setApiOne(elem);
                        }}
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
                        <td className="whitespace-nowrap py-4 font-medium flex flex-row justify-around">
                          <Tooltip
                            title="Eliminar"
                            className="hover:text-red-500"
                            onClick={() => setDialogDelete(true)}
                          >
                            <IconButton size="small">
                              <FaTrash />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Actualizar"
                            className=" hover:text-blue-400"
                            onClick={() => {
                              setDialogUpdate(true);
                              setApiOne(elem);
                            }}
                          >
                            <IconButton size="small">
                              <FaPen />
                            </IconButton>
                          </Tooltip>
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
              count={Math.ceil(listCliente.length / 10)}
              onChange={(evt, value) => {
                setEnd(10 * parseInt(value));
              }}
            />
          </div>
        </div>
        {/*<ItemCliente index={apiOne.id} />*/}
      </div>
      <DialogNewCliente
        open={openDialogNewCliente}
        close={setOpenDialogCliente}
      />
      <DialogUpdateCliente
        open={dialogUpdate}
        close={setDialogUpdate}
        apiOne={apiOne}
        refresh={mutate}
      />
      <Dialog open={dialogDelete} onClose={() => setDialogDelete(false)}>
        <DialogTitle>Eliminar Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estas seguro que queres eliminar ??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogDelete(false)}>Cancelar</Button>
          <Button onClick={handleDeleteCliente} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
