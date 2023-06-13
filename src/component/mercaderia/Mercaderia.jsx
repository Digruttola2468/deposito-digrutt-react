import "./styleMercaderia.css";
import { useContext, useEffect, useState } from "react";

import { FaFileExcel, FaTable } from "react-icons/fa";

import IconButtonMui from "./IconButtonMui/Button";
import { MercaderiaContext } from "../../context/MercaderiaContext";
import { TableMercaderia } from "./table/Table";
import PutMercaderia from "./AgregarMercaderia/PUT";

import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import { useWindowSize } from "usehooks-ts";

import axios from "axios";
import fileDownload from "js-file-download";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

const actions = [
  { icon: <FaTable />, name: "Entrada" },
  { icon: <FaTable />, name: "Salida" },
  { icon: <FaFileExcel />, name: "Export" },
];

export default function Mercaderia() {
  const {
    searchEntradaApi,
    inventarioNombres,
    getEntradaApi,
    getSalidaApi,
    setEntrada,
    searchSalidaApi,
  } = useContext(MercaderiaContext);

  const { width, height } = useWindowSize();

  const [option, setOption] = useState();

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

  useEffect(() => {
    if (codProducto == undefined) {
      if (condicional) {
        if (checked) getEntradaApi();
        else getSalidaApi();

        setCondicional(false);
      }
      if (option == "Entrada") {
        getEntradaApi();
        setOption("");
      } else if (option == "Salida") {
        getSalidaApi();
        setOption("");
      } else if (option == "Export") {
        axios({
          url: "https://deposito-digrutt.up.railway.app/excel/mercaderia",
          method: "GET",
          responseType: "blob",
        }).then((res) => {
          console.log(res);
          fileDownload(res.data, "mercaderia.xlsx");
        });
        setOption("");
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
        </div>

        {width > 500 ? (
          <Stack direction="row" alignItems="center">
            <Typography className="parrafoSalidaSwitch">Salida</Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography className="parrafoEntradaSwitch">Entrada</Typography>
          </Stack>
        ) : (
          <></>
        )}
      </div>
      <TableMercaderia />
      <section className="infoItemTable">
        <PutMercaderia isTableEntrada={checked} />
      </section>
      {width <= 500 ? (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => setOption(action.name)}
            />
          ))}
        </SpeedDial>
      ) : (
        <></>
      )}
    </section>
  );
}
