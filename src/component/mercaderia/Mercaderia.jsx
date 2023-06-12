import "./styleMercaderia.css";
import { useContext, useEffect, useState } from "react";

import { FaFileExcel } from "react-icons/fa";

import IconButtonMui from "./IconButtonMui/Button";
import { MercaderiaContext } from "../../context/MercaderiaContext";
import { TableMercaderia } from "./table/Table";
import PutMercaderia from "./AgregarMercaderia/PUT";

import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//Download
import axios from "axios";
import fileDownload from "js-file-download";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

export default function Mercaderia() {
  const {
    searchEntradaApi,
    inventarioNombres,
    getEntradaApi,
    getSalidaApi,
    setEntrada,
    searchSalidaApi,
  } = useContext(MercaderiaContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");

  const [condicional, setCondicional] = useState(false);

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    let result = event.target.checked;
    setChecked(result);

    if (result) getEntradaApi();
    else getSalidaApi();
  };

  const handleClickSeach = () => {
    if (checked) searchEntradaApi(codProducto.nombre);
    else searchSalidaApi(codProducto.nombre);
  };

  const handleClickExcel = () => {
    if (checked) {
      //Entrada
      axios({
        url: "https://deposito-digrutt.up.railway.app/excel/mercaderia/entrada",
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        console.log(res);
        fileDownload(res.data, "mercaderiaEntrada.xlsx");
      });
    } else {
      //Salida
      axios({
        url: "https://deposito-digrutt.up.railway.app/excel/mercaderia/salida",
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        console.log(res);
        fileDownload(res.data, "mercaderiaSalida.xlsx");
      });
    }
  };

  useEffect(() => {
    if (codProducto == undefined) {
      if (condicional) {
        if (checked) getEntradaApi();
        else getSalidaApi();

        setCondicional(false);
      }
    }
  });

  return (
    <section className="sectionContainer">
      <div className="inputSearchTableMercaderia">
        <div className="searchCodProducto">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={inventarioNombres}
            getOptionLabel={(elem) => elem.nombre}
            sx={{ width: 200, marginLeft: 1 }}
            value={codProducto || null}
            onChange={(evt, newValue) => {
              setCondicional(true);
              setcodProducto(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} value={"Hola"} label="Cod Producto" />
            )}
          />
          <StyledButton variant="text" onClick={handleClickSeach}>
            Buscar
          </StyledButton>
          <StyledButton variant="text" onClick={handleClickExcel}>
            <FaFileExcel /> Excel
          </StyledButton>
        </div>

        <Stack direction="row" alignItems="center">
          <Typography className="parrafoSalidaSwitch">Salida</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography className="parrafoEntradaSwitch">Entrada</Typography>
        </Stack>
      </div>
      <TableMercaderia />
      <section className="infoItemTable">
        <PutMercaderia isTableEntrada={checked} />
      </section>
    </section>
  );
}
