import "./styleDeposito.css";
import { useContext } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import InventarioTable from "./table/Table";
import PostInventario from "./NewInventario/PostInventario";

import { InventarioContext } from "../../context/InventarioContext";

function Inventario() {
  const { isdone } = useContext(InventarioContext);

  return (
    <>
      {isdone ? (
        <>
          <InventarioTable />
          <PostInventario />
        </>
      ) : (
        <></>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isdone}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Inventario;
