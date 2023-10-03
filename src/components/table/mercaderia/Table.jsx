import {  useContext } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

import { Pagination } from "@mui/material";

import BodyTable from "./BodyTable";
import HeadTable from "./HeadTable";

export default function Table() {
  const {
    tableList,
    pagina,
    setPagina,
    setEnd,
    limit
  } = useContext(MercaderiaContext);

  return (
    <>
      <table className="table">
        <HeadTable />
        <BodyTable />
      </table>
      <Pagination
        count={Math.ceil(tableList.length / limit)}
        onChange={(evt, value) => {
          setEnd(limit * parseInt(value));
          setPagina(value);
        }}
        page={pagina}
      />
    </>
  );
}
