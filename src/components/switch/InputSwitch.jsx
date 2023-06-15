import { Stack, Switch, Typography } from "@mui/material";

export default function SwitchComponent({leftP,rightP,isChecked,handleChange}) {
  return (
    <Stack direction="row" alignItems="center">
      <Typography>{leftP}</Typography>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>{rightP}</Typography>
    </Stack>
  );
}
