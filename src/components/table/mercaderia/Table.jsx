import { useState, useContext, useEffect } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

import { Pagination } from "@mui/material";

import BodyTable from "./BodyTable";
import HeadTable from "./HeadTable";

export default function Table() {
  const {
    api,
    idCategoria,
    getEntradaApi,
    getSalidaApi,
    pagina,
    setPagina,
    end,
    setEnd,
    limit
  } = useContext(MercaderiaContext);

  useEffect(() => {
    if (idCategoria == 2) getEntradaApi();
    else getSalidaApi();
  }, [idCategoria]);

  return (
    <>
      <table className="table">
        <HeadTable />
        <BodyTable />
      </table>
      <Pagination
        count={Math.ceil(api.length / limit)}
        onChange={(evt, value) => {
          setEnd(limit * parseInt(value));
          setPagina(value);
        }}
        page={pagina}
      />
    </>
  );
}
