import "./styleMercaderia.css";
import * as React from "react";

import { TableMercaderia } from "./table/Table";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

function Mercaderia() {
  const [api, setApi] = React.useState([]);

  const [apiPost, setApiPost] = React.useState();

  const [categoria, setCategoria] = React.useState(2);

  //2 - Entrada - Categoria
  //1 - Salida - Categoria

  const [factura, setFactura] = React.useState("");
  const [codProducto, setcodProducto] = React.useState("");
  const [cantidad, setcatidad] = React.useState("");
  const [fecha, setFecha] = React.useState();

  const empty = () => {
    setFactura("");
    setFecha();
    setcatidad("");
    setcodProducto("");
  };

  React.useEffect(() => {
    fetch("https://deposito-digrutt.up.railway.app/inventario/nombres")
      .then((result) => result.json())
      .then((result) => setApi(result))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    console.log(codProducto);
  });

  return (
    <section className="sectionContainer">
      <TableMercaderia
        apiUrl={"https://deposito-digrutt.up.railway.app/mercaderia/entrada"}
      />
      <section className="infoItemTable">
        <div>
          <Card sx={{ marginLeft: 1, marginTop: 1 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <h2>Nueva Mercaderia</h2>
              <TextField
                id="outlined-basic"
                label="N° Factura"
                value={factura}
                onChange={(evt) => setFactura(evt.target.value)}
                variant="outlined"
                sx={{ margin: 1, width: 300 }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Fecha"
                    value={fecha}
                    onChange={(evt) => {
                      setFecha(`${evt.$y}-${evt.$M + 1}-${evt.$D}`);
                    }}
                    slotProps={{
                      textField: {
                        helperText: "Required",
                      },
                    }}
                    format="DD/MM/YYYY"
                    sx={{ margin: 1, width: 300 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                helperText="Required"
                id="outlined-basic"
                label="Cantidad"
                value={cantidad}
                onChange={(evt) => setcatidad(evt.target.value)}
                variant="outlined"
                sx={{ margin: 1, width: 300 }}
              />
              <label className="labelListProductos">
                <input
                  type="text"
                  list="codigoProductos"
                  className="inputListCodProductos"
                  value={codProducto}
                  onChange={(evt) => setcodProducto(evt.target.value)}
                  placeholder="Cod Producto"
                />
                <p className="css-1wc848c-MuiFormHelperText-root">Required</p>
              </label>

              <datalist id="codigoProductos">
                {api.map((elem) => {
                  return <option value={elem.nombre} key={elem.id}></option>;
                })}
              </datalist>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={() => {
                  const filter = api.filter(
                    (elem) => elem.nombre == codProducto
                  );

                  fetch("https://deposito-digrutt.up.railway.app/mercaderia", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      fecha,
                      factura,
                      stock: cantidad,
                      idinventario: filter[0].id,
                      idcategoria: categoria,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      toast.success("Se envio correctamente");
                      console.log(data);
                    })
                    .catch((error) => console.error("Error:", error));
                }}
              >
                Agregar
              </Button>
              <Button variant="text" onClick={() => {empty()}}>
                Clear
              </Button>
            </CardActions>
          </Card>
        </div>
      </section>
      <ToastContainer />
    </section>
  );
}

export default Mercaderia;
