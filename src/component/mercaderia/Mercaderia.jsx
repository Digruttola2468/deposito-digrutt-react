import "./styleMercaderia.css";
import * as React from "react";

import { FaSearch } from 'react-icons/fa';

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Mercaderia() {
  const [filter, setFilter] = React.useState("");
  const [modo, setModo] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeModo = (event) => {
    setModo(event.target.value);
  };

  const handleClickExcel = (evt) => {
    console.log("Creando archivo Excel");
    handleOpen();
  };

  const handleClickPdf = (evt) => {
    console.log("Creando archivo PDF");
    handleOpen();
  };

  return (
    <section className="sectionMercaderia-container">
      <div className="filterTableMercaderia">
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleChangeFilter}
            >
              <MenuItem value={"Fecha"}>fecha</MenuItem>
              <MenuItem value={"Category"}>category</MenuItem>
              <MenuItem value={"Cod Producto"}>codigo producto</MenuItem>
              <MenuItem value={"id"}>id</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">modo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={modo}
              label="Modo"
              onChange={handleChangeModo}
            >
              <MenuItem value={"ASC"}>ASC</MenuItem>
              <MenuItem value={"DEC"}>DEC</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="inputSearchTableMercaderia">
        <label htmlFor="">Buscar: </label>
        <input type="search" placeholder="ej: asiento001"/>
        <button><FaSearch /></button>
      </div>
      <div>
        <table className="tableMercaderia">
          <thead>
            <tr>
              <th>n° Factura</th>
              <th>Fecha</th>
              <th>Stock</th>
              <th>Cod. Producto</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody className="bodyTableMercaderia">
            <tr>
              <td>1587468</td>
              <td>06/10</td>
              <td>50</td>
              <td>asiento001</td>
              <td>Entrada</td>
            </tr>
            <tr>
              <td>1587468</td>
              <td>06/10</td>
              <td>50</td>
              <td>asiento001</td>
              <td>Entrada</td>
            </tr>
            <tr>
              <td>1587468</td>
              <td>06/10</td>
              <td>50</td>
              <td>asiento001</td>
              <td>Entrada</td>
            </tr>
            <tr>
              <td>1587468</td>
              <td>06/10</td>
              <td>50</td>
              <td>asiento001</td>
              <td>Entrada</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divExportTable">
        <button onClick={handleClickExcel}>Export Excel</button>
        <button onClick={handleClickPdf}>Export PDF</button>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
}

export default Mercaderia;
