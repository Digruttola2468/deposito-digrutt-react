import "./styleMercaderia.css";
import * as React from "react";

import Table from "./table/Table";
import InputMui from "./inputMui/InputMui";
import IconButtonMui from "./IconButtonMui/Button";
import Pagination from '@mui/material/Pagination';

import { FaTrash, FaFileExcel, FaFilePdf } from "react-icons/fa";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const StyledButton = styled(Button)({
  background: "#fff",
  color: "#00c9d2",
  border: "1px solid #00c9d2"
})

function Mercaderia() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleClickExcel = (evt) => handleOpen();
  const handleClickPdf = (evt) => handleOpen();

  return (
    <section className="sectionContainer">
      <section className="sectionMercaderia-container">
        <div className="inputSearchTableMercaderia">
          <div className="searchCodProducto">
            <InputMui title="Buscar Cod Producto" />
            <StyledButton variant="text" >Buscar</StyledButton>
          </div>
          <div className="searchCodProducto">
            <IconButtonMui title={"export excel"} callback={handleClickExcel} classf="excel">
              <FaFileExcel />
            </IconButtonMui>
            <IconButtonMui title={"export pdf"} callback={handleClickPdf} classf="pdf">
              <FaFilePdf />
            </IconButtonMui>
          </div>
        </div>
        <div className="divTable">
          <Table />
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

        </div>
      </section>
    </section>
  );
}

export default Mercaderia;
