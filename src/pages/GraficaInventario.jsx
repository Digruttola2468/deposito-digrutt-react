import { useContext, useState } from "react";

import "./graficainventario.css";

import { Input } from "@mui/material";
import { InventarioContext } from "../context/InventarioContext";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import BarsComponent from "../components/grafic/BarChart";
import { useLocalStorage } from "usehooks-ts";

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

const getArrayYear = (mercaderiaApi, idinventario) => {
  const enviar = new Set();
  if (idinventario != null) {
    const filtrado = mercaderiaApi.filter(
      (elem) => elem.idinventario == idinventario
    );

    for (let i = 0; i < filtrado.length; i++) {
      const element = filtrado[i];
      const dateFecha = new Date(element.fecha);
      enviar.add(dateFecha.getFullYear());
    }
  }
  return enviar;
};

const getArrayMercaderia = (mercaderiaApi, idinventario, categoria, year) => {
  const filtradoDato = mercaderiaApi.filter(
    (elem) => elem.idinventario == idinventario
  );
  const filtrado = filtradoDato.filter((elem) => elem.categoria == categoria);

  const enviar = [];

  let enero = 0;
  let febrero = 0;
  let marzo = 0;
  let abril = 0;
  let mayo = 0;
  let junio = 0;
  let julio = 0;
  let agosto = 0;
  let septiembre = 0;
  let octubre = 0;
  let noviembre = 0;
  let diciembre = 0;

  for (let i = 0; i < filtrado.length; i++) {
    const element = filtrado[i];
    const dateFecha = new Date(element.fecha);

    if (dateFecha.getFullYear() == year) {
      if (dateFecha.getMonth() == 0) enero += element.stock;

      if (dateFecha.getMonth() == 1) febrero += element.stock;

      if (dateFecha.getMonth() == 2) marzo += element.stock;

      if (dateFecha.getMonth() == 3) abril += element.stock;

      if (dateFecha.getMonth() == 4) mayo += element.stock;

      if (dateFecha.getMonth() == 5) junio += element.stock;

      if (dateFecha.getMonth() == 6) julio += element.stock;

      if (dateFecha.getMonth() == 7) agosto += element.stock;

      if (dateFecha.getMonth() == 8) septiembre += element.stock;

      if (dateFecha.getMonth() == 9) octubre += element.stock;

      if (dateFecha.getMonth() == 10) noviembre += element.stock;

      if (dateFecha.getMonth() == 11) diciembre += element.stock;
    }
  }
  enviar.push(enero);
  enviar.push(febrero);
  enviar.push(marzo);
  enviar.push(abril);
  enviar.push(mayo);
  enviar.push(junio);
  enviar.push(julio);
  enviar.push(agosto);
  enviar.push(septiembre);
  enviar.push(octubre);
  enviar.push(noviembre);
  enviar.push(diciembre);

  return enviar;
};

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
    <section style={{ marginTop: "40px", marginBottom: "40px" }}>
      <h2
        style={{ textAlign: "center", fontFamily: "'Bruno Ace SC', cursive" }}
      >
        Grafica
      </h2>
      <div className="graficaContainer">
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ marginLeft: "20px" }}>
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
          <div style={{ marginLeft: "20px" }}>
            <b>Color Salida: </b>
            <Input
              type="color"
              sx={{ width: "30px" }}
              onChange={(evt) => {
                setColorSalida(evt.target.value);
              }}
              value={colorSalida}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <BarsComponent data={midata} />
      </div>
    </section>
  );
}
