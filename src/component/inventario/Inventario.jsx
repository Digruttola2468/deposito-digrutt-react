import "./styleDeposito.css";
import * as React from "react";

import InventarioTable from "./table/Table";
import PostInventario from "./NewInventario/PostInventario";

function Inventario() {
    return <>
        <InventarioTable />
        <PostInventario />
    </>
}

export default Inventario;
