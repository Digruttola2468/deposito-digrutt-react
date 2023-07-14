import { useContext, useState } from "react";

import { InventarioContext } from "../context/InventarioContext";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Input
} from "@mui/material";
import BarsComponent from "../components/grafic/BarChart";
import { useLocalStorage } from "usehooks-ts";

import {getArrayMercaderia,getArrayYear,meses} from '../services/date'

export default function GraficaInventario() {
  const { mercaderiaApi, api } = useContext(InventarioContext);

  const [year, setYear] = useState("");
  const [listYear, setListYear] = useState([]);

  const [codProducto, setcodProducto] = useState();

  const [apiEntrada, setApiEntrada] = useState([]);
  const [apiSalida, setApiSalida] = useState([]);

  const [colorEntrada, setColorEntrada] = useLocalStorage(
    "colorGraficaEntrada",
    "#de3f3f"
  );
  const [colorSalida, setColorSalida] = useLocalStorage(
    "colorGraficaSalida",
    "#44ee8e"
  );

  const handleChange = (event) => {
    if (codProducto != null) {
      setYear(event.target.value);
      setApiEntrada(
        getArrayMercaderia(
          mercaderiaApi,
          codProducto.id,
          "Entrada",
          event.target.value
        )
      );
      setApiSalida(
        getArrayMercaderia(
          mercaderiaApi,
          codProducto.id,
          "Salida",
          event.target.value
        )
      );
    }
  };

  const midata = {
    labels: meses,
    datasets: [
      {
        label: "Entrada",
        data: apiEntrada,
        backgroundColor: colorEntrada,
      },
      {
        label: "Salida",
        data: apiSalida,
        backgroundColor: colorSalida,
      },
    ],
  };
  return (
    <section className="my-10">
      <h2 className="text-center title text-2xl">Grafica</h2>
      <div className="flex flex-col justify-center items-center flex-wrap mb-5 sm:flex-row sm:mb-0 ">
        <Autocomplete
          disablePortal
          options={api}
          getOptionLabel={(elem) => elem.nombre}
          isOptionEqualToValue={(option, value) =>
            option.idinventario === value.idinventario
          }
          //Al seleccionar
          value={codProducto || null}
          onChange={(evt, newValue) => {
            setcodProducto(newValue);
            if (newValue != null) {
              let enviar = [];
              for (const item of getArrayYear(
                mercaderiaApi,
                newValue.id
              ).values()) {
                enviar.push(item);
              }
              setListYear(enviar);
            } else {
              setListYear([]);
              setYear("");
            }
          }}
          sx={{ width: 200, marginLeft: 1 }}
          renderInput={(params) => (
            <TextField {...params} value={codProducto} label="Cod Producto" />
          )}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} label="Year" onChange={handleChange}>
            {listYear.map((elem) => (
              <MenuItem key={elem} value={elem}>
                {elem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="flex flex-row items-center">
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
      </div>
      <div className="m-auto max-w-[900px]">
        <BarsComponent data={midata} />
      </div>
    </section>
  );
}
