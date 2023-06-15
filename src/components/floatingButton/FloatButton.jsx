import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

export default function FloatButton({ select, actions = [] }) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => select(action.name)}
        />
      ))}
    </SpeedDial>
  );
}
