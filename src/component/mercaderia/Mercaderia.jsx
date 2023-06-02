import "./styleMercaderia.css";
import * as React from "react";

import Table from "./table/Table";
import InputMui from "./inputMui/InputMui";
import IconButtonMui from "./IconButtonMui/Button";
import Pagination from "@mui/material/Pagination";

import {
  FaTrash,
  FaPen,
  FaFileExcel,
  FaFilePdf,
  FaTable,
} from "react-icons/fa";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { responsiveFontSizes, styled } from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  getMercaderiaInput,
  getMercaderiaOutput,
} from "../../data/mercaderiaInput.js";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

function Mercaderia() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [codigo, setCodigo] = React.useState("");
  const [fecha, setFecha] = React.useState("");

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleClickExcel = (evt) => handleOpen();
  const handleClickPdf = (evt) => handleOpen();

  const handleChange = (event) => {
    setCodigo(event.target.value);
  };

  React.useEffect(() => {});

  return (
    <section className="sectionContainer">
      <section className="sectionMercaderia-container">
        <div className="inputSearchTableMercaderia">
          <div className="searchCodProducto">
            <InputMui title="Buscar Cod Producto" />
            <StyledButton variant="text">Buscar</StyledButton>
          </div>
          <div className="searchCodProducto">
            <IconButtonMui
              title={"export excel"}
              callback={handleClickExcel}
              classf="excel"
            >
              <FaFileExcel />
            </IconButtonMui>
            <IconButtonMui
              title={"export pdf"}
              callback={handleClickPdf}
              classf="pdf"
            >
              <FaFilePdf />
            </IconButtonMui>
          </div>
        </div>
        <div className="divTable">
          <Table>
            {getMercaderiaOutput.map((elem) => {
              return (
                <tr
                  key={elem.id}
                  onClick={() => {
                    setIndex(elem.id);
                  }}
                >
                  <td>{elem.proveedor}</td>
                  <td>{elem.fecha}</td>
                  <td>{elem.stock}</td>
                  <td>{elem.nombre}</td>
                  <td>{elem.descripcion}</td>
                </tr>
              );
            })}
          </Table>
          <Pagination count={10} />
        </div>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </section>
      <section className="infoItemTable">
        <div>
          {getMercaderiaOutput
            .filter((elem) => elem.id == index)
            .map((elem) => {
              return (
                <Card sx={{ marginLeft: 1 }}>
                  <CardContent>
                    <div key={elem.id}>
                      <h2>{elem.nombre}</h2>
                      <p>
                        <b>N° Factura: </b>
                        {elem.proveedor}
                      </p>
                      <p>
                        <b>Fecha: </b>
                        {elem.fecha}
                      </p>
                      <p>
                        <b>Cantidad: </b>
                        {elem.stock}
                      </p>
                      <p>
                        <b>Descripcion: </b>
                        {elem.descripcion}
                      </p>
                    </div>
                  </CardContent>
                  <CardActions>
                    <IconButtonMui
                      title={"eliminar"}
                      callback={handleClickPdf}
                      classf={"pdf"}
                      size="small"
                    >
                      <FaTrash />
                    </IconButtonMui>
                    <IconButtonMui
                      title={"actualizar"}
                      callback={handleClickPdf}
                      classf={"update"}
                      size="small"
                    >
                      <FaPen />
                    </IconButtonMui>
                  </CardActions>
                </Card>
              );
            })}
        </div>
        <div>
          <Card sx={{ marginLeft: 1, marginTop: 1 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <h2>Nueva Mercaderia</h2>
              <TextField
                id="outlined-basic"
                label="N° Factura"
                variant="outlined"
                sx={{ margin: 1, width: 300 }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker sx={{ margin: 1, width: 300 }}
                  label="Fecha"
                  value={fecha}
                  onChange={(newDate) => setFecha(newDate)}
                />
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                sx={{ margin: 1, width: 300 }}
              />
              <FormControl sx={{ width: 300, margin: 1 }}>
                <InputLabel id="demo-simple-select-label">
                  Cod Producto
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={codigo}
                  label="Cod. producto"
                  onChange={handleChange}
                >
                  <MenuItem value={"alcohol236"}>alcohol236</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button variant="outlined">Agregar</Button>
              <Button variant="text">Clear</Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </section>
  );
}

export default Mercaderia;
