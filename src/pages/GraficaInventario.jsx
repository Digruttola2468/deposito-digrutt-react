import { useContext, useEffect, useState } from "react";

import { MercaderiaContext } from "../context/MercaderiaContext";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Input,
} from "@mui/material";

import BarsComponent from "../components/grafic/BarChart";

import { useLocalStorage } from "usehooks-ts";
import { InventarioContext } from "../context/InventarioContext";

const meses = [
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

export default function GraficaInventario() {
  const { grafica, getGraficaMercaderia } = useContext(MercaderiaContext);
  const { inventarioNombres } = useContext(InventarioContext);

  //to select what year do you want to show in the grafic
  const [listYear, setListYear] = useState([]);

  //the year selected
  const [year, setYear] = useState("");
  //the codproducto selected
  const [codProducto, setcodProducto] = useState();

  //info Entrada Y Salida
  const [infoEntrada, setInfoEntrada] = useState([]);
  const [infoSalida, setInfoSalida] = useState([]);

  //Color grafic
  const [colorEntrada, setColorEntrada] = useLocalStorage(
    "colorGraficaEntrada",
    "#44ee8e"
  );
  const [colorSalida, setColorSalida] = useLocalStorage(
    "colorGraficaSalida",
    "#de3f3f"
  );

  useEffect(() => {
    setListYear(grafica.map((elem) => elem.fecha));
  }, [grafica]);

  //show Grafica
  const data = {
    labels: meses,
    datasets: [
      {
        label: "Entrada",
        data: infoEntrada,
        backgroundColor: colorEntrada,
      },
      {
        label: "Salida",
        data: infoSalida,
        backgroundColor: colorSalida,
      },
    ],
  };

  const empty = () => {
    setYear("");
    setListYear([]);
    setInfoEntrada([]);
    setInfoSalida([]);
    setcodProducto("");
  };

  return (
    <section className="my-10">
      <h2 className="text-center title text-2xl">Grafica</h2>
      <div className="flex flex-col justify-center items-center flex-wrap mb-5 sm:flex-row sm:mb-0 ">
        <Autocomplete
          freeSolo
          options={inventarioNombres}
          getOptionLabel={(elem) => elem.nombre}
          isOptionEqualToValue={(option, value) =>
            option.idinventario === value.idinventario
          }
          //Al seleccionar
          value={codProducto || null}
          onChange={(evt, newValue) => {
            if (newValue != null) {
              setcodProducto(newValue);
              getGraficaMercaderia(newValue.id);
            } else empty();
          }}
          sx={{ width: 200, marginLeft: 1 }}
          renderInput={(params) => (
            <TextField {...params} value={codProducto} label="Cod Producto" />
          )}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={(evt) => {
              setYear(evt.target.value);
              const filter = grafica.filter(
                (elem) => elem.fecha == evt.target.value
              );
              setInfoEntrada([
                filter[0].entrada.enero,
                filter[0].entrada.febrero,
                filter[0].entrada.marzo,
                filter[0].entrada.abril,
                filter[0].entrada.mayo,
                filter[0].entrada.junio,
                filter[0].entrada.julio,
                filter[0].entrada.agosto,
                filter[0].entrada.septiembre,
                filter[0].entrada.octubre,
                filter[0].entrada.noviembre,
                filter[0].entrada.diciembre,
              ]);
              setInfoSalida([
                filter[0].salida.enero,
                filter[0].salida.febrero,
                filter[0].salida.marzo,
                filter[0].salida.abril,
                filter[0].salida.mayo,
                filter[0].salida.junio,
                filter[0].salida.julio,
                filter[0].salida.agosto,
                filter[0].salida.septiembre,
                filter[0].salida.octubre,
                filter[0].salida.noviembre,
                filter[0].salida.diciembre,
              ]);
            }}
          >
            {listYear.map((elem) => (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {codProducto != undefined ? (
          <div className=" flex flex-row items-center">
            <p className="text-gray-500">{codProducto.descripcion}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="m-auto max-w-[900px]">
        <BarsComponent data={data} />
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="ml-5">
          <b>Color Entrada: </b>
          <Input
            type="color"
            sx={{ width: "30px" }}
            onChange={(evt) => {
              setColorEntrada(evt.target.value);
            }}
            value={colorEntrada}
          />
        </div>
        <div className="ml-5">
          <b>Color Salida: </b>
          <Input
            type="color"
            sx={{ width: "30px" }}
            onChange={(evt) => setColorSalida(evt.target.value)}
            value={colorSalida}
          />
        </div>
      </div>
    </section>
  );
}
