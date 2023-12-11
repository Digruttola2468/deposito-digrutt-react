import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { MdExpandMore } from "react-icons/md";
import { InventarioContext } from "../../../context/InventarioContext";

export default function PesoUnidad() {
  const { tableList,index } = useContext(InventarioContext);

  const [pesoUnidad, setPesoUnidad] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    tableList
      .filter((elem) => elem.id == index)
      .map((elem) => setPesoUnidad(elem.pesoUnidad));
  }, [index]);

  return (
    <Accordion className="my-2">
      <AccordionSummary expandIcon={<MdExpandMore />}>
        Peso Unidad
      </AccordionSummary>
      <AccordionDetails className="flex flex-row items-center">
        <TextField
          value={pesoUnidad}
          variant="outlined"
          label="Peso"
          type="number"
          onChange={(evt) => setPesoUnidad(evt.target.value)}
          sx={{ minWidth: "100px" }}
        />
        <span className="mx-1">x</span>
        <TextField
          value={cantidad}
          variant="outlined"
          type="number"
          label="Cantidad"
          onChange={(evt) => setCantidad(evt.target.value)}
        />
        <span className="mx-1">=</span>
        <p>
          {cantidad != null && pesoUnidad != null
            ? (pesoUnidad * cantidad).toFixed(3)
            : ""}
          kg
        </p>
      </AccordionDetails>
    </Accordion>
  );
}
