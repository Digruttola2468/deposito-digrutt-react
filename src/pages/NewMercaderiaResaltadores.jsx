import { useContext, useEffect, useState } from "react";
import { InventarioContext } from "../context/InventarioContext";
import NavMenu from "../components/Menu";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FiTrash } from "react-icons/fi";
import { IoIosRefresh } from "react-icons/io";
import { MercaderiaContext } from "../context/MercaderiaContext";

export default function NewMercaderiaResaltadores() {
  const { listToMercaderia, getClienteName } = useContext(InventarioContext);
  const { addListMercaderia } = useContext(MercaderiaContext);

  const [fecha, setFecha] = useState(null);
  const [inputFecha, setInputFecha] = useState(null);
  const [listMercaderia, setListMercaderia] = useState(listToMercaderia);
  const [loading, setLoading] = useState(false);

  const handleClickDateNow = () => {
    const date = new Date();
    const year = date.getFullYear();
    const mounth = date.getMonth() + 1;
    const day = date.getDate();

    setInputFecha(dayjs(`${year}-${mounth}-${day}`));
    setFecha(`${year}-${mounth}-${day}`);
  };

  const handleClickNewMercaderia = () => {
    const list = {};
    list.fecha = fecha;
    list.data = [];
    for (let i = 0; i < listMercaderia.length; i++) {
      const element = listMercaderia[i];

      const stock = document.querySelector(
        `#resaltadoresMercaderia-${element.id}`
      ).value;

      if (stock != "") {
        list.data.push({
          stock,
          idinventario: element.id,
        });
      }
    }
    console.log(list);
    //enviar la lista

    empty();
    addListMercaderia(list);
  };

  const handleClickRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      setListMercaderia(listToMercaderia);
      setLoading(false);
    }, 1000);
  };

  const empty = () => {
    setFecha(null);
    setInputFecha(null);
    setListMercaderia([]);
    setLoading(false);
  }


  if (listMercaderia.length != 0) {
    return (
      <>
        <header className="bg-celeste-oscuro">
          <NavMenu />
        </header>
        <main>
          <h1 className="font-bold text-2xl text-center my-2">
            Nueva Mercaderia{" "}
            <span onClick={handleClickRefresh}>
              <Tooltip title="refresh " className=" hover:text-blue-400">
                <IconButton size="small">
                  <IoIosRefresh
                    className={`${loading ? "animate-spin" : ""}`}
                  />
                </IconButton>
              </Tooltip>
            </span>
          </h1>
          <section className="flex flex-col  justify-center items-center">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {listMercaderia.map((elem) => (
                <div
                  key={elem.id}
                  className="relative flex flex-col border p-2 rounded-md max-w-[300px]"
                >
                  <div>
                    <h2 className="font-bold uppercase ">
                      {elem.nombre}{" "}
                      <span className="font-medium text-xs">
                        {getClienteName(elem.idCliente)}
                      </span>
                    </h2>
                    <p className="font-semibold text-sm text-gray-400">
                      {elem.descripcion}
                    </p>
                  </div>

                  <div className="">
                    <TextField
                      type="number"
                      label="Cantidad"
                      variant="standard"
                      id={`resaltadoresMercaderia-${elem.id}`}
                    />
                  </div>
                  <div className="absolute right-2">
                    <Tooltip
                      title="borrar"
                      className=" hover:text-red-400"
                      onClick={() => {
                        const filter = listMercaderia.filter(
                          (el) => el.id != elem.id
                        );
                        setListMercaderia(filter);
                      }}
                    >
                      <IconButton size="small">
                        <FiTrash />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center my-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha"
                  value={inputFecha}
                  onChange={(evt, value) => {
                    if (evt != null) {
                      setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
                      setInputFecha(dayjs(`${evt.$y}-${evt.$M}-${evt.$D}`));
                    } else setFecha(null);
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <Button onClick={handleClickDateNow}>Hoy</Button>
              <Button variant="contained" onClick={handleClickNewMercaderia}>
                Agregar
              </Button>
            </div>
          </section>
        </main>
      </>
    );
  } else
    return (
      <>
        <header className="bg-celeste-oscuro">
          <NavMenu />
        </header>
        <main>
          <h1>Lista de resaltadores Vacia</h1>
        </main>
      </>
    );
}
