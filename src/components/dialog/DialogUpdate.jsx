import {
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";

export default function DialogUpdate({
  title = "Actualizar",
  handleUpdate,
  children,
  show,
  close
}) {

  return (
    <Dialog
      open={show}
      onClose={close}
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
        <Button onClick={close} variant="text">
          Cancelar
        </Button>
        <Button onClick={handleUpdate} autoFocus variant="outlined">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
