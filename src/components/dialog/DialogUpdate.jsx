import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Button } from "@mui/material";

export default function DialogUpdate({
  title = "Actualizar",
  update,
  children,
  show,
  close,
}) {
  const handleClose = () => close();

  const handleUpdate = () => update();

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", padding: 3 }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancelar
        </Button>
        <Button onClick={handleUpdate} autoFocus variant="outlined">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
