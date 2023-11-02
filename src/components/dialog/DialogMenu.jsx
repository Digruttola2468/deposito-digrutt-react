import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { sendFile } from "../../services/sendFile";

import Button from "@mui/material/Button";
import { useReadLocalStorage } from "usehooks-ts";

export default function DialogMenu ({show,close}) {
    
  const token = useReadLocalStorage('token');

    const handleExportMercaderia = () =>
      sendFile(
        token,
        `/excel/mercaderia`,
        "mercaderia.xlsx"
      );
  
    const handleExportInventario = () =>
      sendFile(
        token,
        `/excel/inventario`,
        "inventario.xlsx"
      );
  
    const handleClose = () => close(false);
  
    return (
      <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Exportar tabla en Excel</DialogTitle>
        <DialogContent>
          <Button onClick={handleExportMercaderia} autoFocus>
            Export Mercaderia
          </Button>
          <Button onClick={handleExportInventario} >
            Export Inventario
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };