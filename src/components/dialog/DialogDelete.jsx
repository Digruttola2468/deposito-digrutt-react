import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Button, DialogContentText } from "@mui/material";

export default function DialogDelete({
  title = "Eliminar",
  handleDelete,
  show,
  close
}) {

  return (
    <Dialog
      open={show}
      onClose={close}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estas seguro que queres eliminar ??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={handleDelete} autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
