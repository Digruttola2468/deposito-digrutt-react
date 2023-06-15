import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Button, DialogContentText } from "@mui/material";

export default function DialogDelete({
  title = "Eliminar",
  eliminar,
  show,
  close,
}) {
  const handleClose = () => close();

  const handleDelete = () => eliminar();

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estas seguro que queres eliminar ??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleDelete} autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
