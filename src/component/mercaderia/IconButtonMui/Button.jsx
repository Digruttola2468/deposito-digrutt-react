import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function IconButtonMui({ title, callback,children,classf }) {
  return (
    <Tooltip title={title} onClick={callback} className={classf}>
      <IconButton>
        {children}
      </IconButton>
    </Tooltip>
  );
}
