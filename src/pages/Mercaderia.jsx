import { useContext, useEffect, useState } from "react";
import "./styleMercaderia.css";

import TableMercaderia from "../components/table/mercaderia/TableMercaderia";
import PutMercaderia from "../components/table/mercaderia/PostMercaderia";
import FloatButton from "../components/floatingButton/FloatButton";
import SearchMercaderia from "../components/search/SearchMercaderia";
import SwitchComponent from "../components/switch/InputSwitch";

import { sendFile } from "../services/sendFile";
import { MercaderiaContext } from "../context/MercaderiaContext";

import { useWindowSize } from "usehooks-ts";
import { FaFileExcel, FaTable } from "react-icons/fa";

export default function Mercaderia() {
  const { getEntradaApi, getSalidaApi } = useContext(MercaderiaContext);

  const { width } = useWindowSize();
  const [option, setOption] = useState();
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    let result = event.target.checked;
    setChecked(result);

    if (result) getEntradaApi();
    else getSalidaApi();
  };

  useEffect(() => {
    if (option == "Entrada") getEntradaApi();
    else if (option == "Salida") getSalidaApi();
    else if (option == "Export")
      sendFile(
        "https://deposito-digrutt.up.railway.app/excel/mercaderia",
        "mercaderia.xlsx"
      );

    setOption("");
  });

  return (
    <section className="sectionContainer">
      <div className="inputSearchTableMercaderia">
        <SearchMercaderia />
        {width > 500 ? (
          <SwitchComponent
            leftP={"Salida"}
            rightP={"Entrada"}
            isChecked={checked}
            handleChange={handleChange}
          ></SwitchComponent>
        ) : (
          <></>
        )}
      </div>

      <TableMercaderia />
      <PutMercaderia />

      {width <= 500 ? (
        <FloatButton
          select={setOption}
          actions={[
            { icon: <FaTable />, name: "Entrada" },
            { icon: <FaTable />, name: "Salida" },
            { icon: <FaFileExcel />, name: "Export" },
          ]}
        />
      ) : (
        <></>
      )}
    </section>
  );
}
