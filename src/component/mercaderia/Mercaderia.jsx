import "./styleMercaderia.css";
import { useContext, useEffect, useState } from "react";

import { FaFileExcel, FaFilePdf } from "react-icons/fa";

import IconButtonMui from "./IconButtonMui/Button";
import { MercaderiaContext } from "../../context/MercaderiaContext";
import { TableMercaderia } from "./table/Table";
import PutMercaderia from "./AgregarMercaderia/PUT";

import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

export default function Mercaderia() {
  const { searchByCodProductoApi, inventarioNombres,getEntradaApi } =
    useContext(MercaderiaContext);

  const [codProducto, setcodProducto] = useState();
  const [inputValue, setInputValue] = useState("");

  const [condicional,setCondicional] = useState(false)

  const handleClickSeach = () => {
    searchByCodProductoApi(codProducto.nombre);
  };

  useEffect(() => {
    if(codProducto == undefined){
      if(condicional){
        getEntradaApi();
        setCondicional(false);
      }
      
    }
  })

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
        <div className="searchCodProducto">
          <IconButtonMui
            title={"export excel"}
            callback={() => {}}
            classf="excel"
          >
            <FaFileExcel />
          </IconButtonMui>
          <IconButtonMui title={"export pdf"} callback={() => {}} classf="pdf">
            <FaFilePdf />
          </IconButtonMui>
        </div>
      </div>
      <TableMercaderia />
      <section className="infoItemTable">
        <PutMercaderia />
      </section>
    </section>
  );
}
