import "./styleMercaderia.css";
import {useContext,useState} from "react";

import { TableMercaderia } from "./table/Table";
import PutMercaderia from "./AgregarMercaderia/PUT";

import Button from "@mui/material/Button";
import { TextField, styled } from "@mui/material";

import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import IconButtonMui from "./IconButtonMui/Button";

import { MercaderiaContext } from "../../context/MercaderiaContext";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2",
});

export default function Mercaderia() {

  const { inventarioNombres, searchByCodProductoApi } = useContext(MercaderiaContext);
  const [codProducto, setcodProducto] = useState("");

  const handleClickSeach = () => {
    searchByCodProductoApi(codProducto);
  }

  return (
    <section className="sectionContainer">
      <div className="inputSearchTableMercaderia">
        <div className="searchCodProducto">
          <label className="labelListProductos">
            <input
              type="text"
              list="codigoProductos"
              className="inputListCodProductos"
              value={codProducto}
              onChange={(evt) => setcodProducto(evt.target.value)}
              placeholder="Cod Producto"
            />
          </label>

          <datalist id="codigoProductos">
            {inventarioNombres.map((elem) => {
              return <option value={elem.nombre} key={elem.id}></option>;
            })}
          </datalist>
          <StyledButton variant="text" onClick={handleClickSeach}>Buscar</StyledButton>
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
