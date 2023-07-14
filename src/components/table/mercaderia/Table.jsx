import { useState, useContext } from "react";

import { MercaderiaContext } from "../../../context/MercaderiaContext";

import BodyTable from "./BodyTable";
import HeadTable from "./HeadTable";

import { Pagination } from "@mui/material";
export default function Table() {
  const { api } = useContext(MercaderiaContext);
  const LIMIT = 10;
  const [end, setEnd] = useState(LIMIT);

  return (
    <>
      <table className="table">
        <HeadTable />
        <BodyTable data={api} end={end} count={LIMIT} />
      </table>
      <Pagination
        count={Math.ceil(api.length / LIMIT)}
        onChange={(evt, value) => setEnd(LIMIT * parseInt(value))}
      />
    </>
  );
}
