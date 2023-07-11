import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { sendFile } from "../../services/sendFile";

import Button from "@mui/material/Button";

export default function DialogMenu ({show,close}) {
    
    const handleExportMercaderia = () =>
      sendFile(
        "https://deposito-digrutt.up.railway.app/excel/mercaderia",
        "mercaderia.xlsx"
      );
  
    const handleExportInventario = () =>
      sendFile(
        "https://deposito-digrutt.up.railway.app/excel/inventario",
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