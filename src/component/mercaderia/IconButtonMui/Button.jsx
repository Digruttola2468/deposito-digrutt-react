import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function IconButtonMui({ title, callback,children,classf,size }) {
  return (
    <Tooltip title={title} onClick={callback} className={classf} >
      <IconButton size={size}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
