import {
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";

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
        className="flex flex-col"
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
