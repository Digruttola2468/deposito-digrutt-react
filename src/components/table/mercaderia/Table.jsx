import { useState, useContext, useEffect } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

import { Pagination } from "@mui/material";

import BodyTable from "./BodyTable";
import HeadTable from "./HeadTable";

export default function Table() {
  const { api,idCategoria,getEntradaApi,getSalidaApi } = useContext(MercaderiaContext);

  useEffect(() => {
    if(idCategoria == 2) getEntradaApi();
    else getSalidaApi();
  }, [idCategoria])

  const LIMIT = 10;
  const [end, setEnd] = useState(LIMIT);

  return (
    <>
      <table className="table">
        <HeadTable />
        <BodyTable end={end} count={LIMIT} />
      </table>
      <Pagination
        count={Math.ceil(api.length / LIMIT)}
        onChange={(evt, value) => setEnd(LIMIT * parseInt(value))}
      />
    </>
  );
}
