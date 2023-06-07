import "./styleMercaderia.css";
import { useContext, useState } from "react";

import { TableMercaderia } from "./table/Table";
import PutMercaderia from "./AgregarMercaderia/PUT";

import Button from "@mui/material/Button";
import { styled } from "@mui/material";

import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import IconButtonMui from "./IconButtonMui/Button";

import { MercaderiaContext } from "../../context/MercaderiaContext";

import AutoCompleteField from "./AutoComplete/AutoCompl";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

export default function Mercaderia() {
  const { searchByCodProductoApi } =
    useContext(MercaderiaContext);
  const [codProducto, setcodProducto] = useState();

  const handleClickSeach = () => {
    searchByCodProductoApi(codProducto);
  };

  return (
    <section className="sectionContainer">
      <div className="inputSearchTableMercaderia">
        <div className="searchCodProducto">
          <AutoCompleteField value={codProducto} setValue={setcodProducto}/>
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
