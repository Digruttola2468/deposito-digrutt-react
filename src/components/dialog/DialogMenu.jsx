import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { sendFile } from "../../services/sendFile";

import Button from "@mui/material/Button";

export default function DialogMenu () {
    const [open, setOpen] = useState(false);
  
    const handleExportMercaderia = () =>
      sendFile(
        "https://deposito-digrutt.up.railway.app/excel/mercaderia",
        "mercaderia.xlsx"
      );
  
    const handleExportInventario = () =>
      sendFile(
        "https://deposito-digrutt.up.railway.app/excel/mercaderia",
        "inventario.xlsx"
      );
  
    const handleClose = () => setOpen(false);
  
    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Exportar tabla en Excel</DialogTitle>
        <DialogContent>
          <Button onClick={handleExportMercaderia} autoFocus>
            Export Mercaderia
          </Button>
          <Button onClick={handleExportInventario} autoFocus>
            Export Inventario
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };