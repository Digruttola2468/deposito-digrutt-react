import { useContext, useEffect, useState } from "react";
import { Document, Page, Text } from "@react-pdf/renderer";
import { OficinaContext } from "../../context/OficinaContext";

export default function DocRemitoPdf({
  fecha,
  cliente,
  domicilio,
  CUIT,
  nroOrden,
  products = [],
  listAllProducts = [],
}) {
  const getDataInventario = (id) => {
    const objetcInventario = listAllProducts.find((elem) => elem.id == id);
    if (objetcInventario) return objetcInventario;
    else return "";
  };

  return (
    <>
      <Document>
        <Page size={"A4"}>
          <div style={{ margin: "20px" }}>
            <Text style={{ padding: 20, color: "green" }}>{fecha}</Text>
          </div>
          <div>
            <Text>Señor/es: {cliente}</Text>
            <Text>Domicilio: {domicilio}</Text>
            <Text>I.V.A: Responsable Inscripto</Text>
          </div>
          <div>
            <Text>C.U.I.T N: {CUIT}</Text>
            <Text>Condicion de cobro: 30 DIAS FECHA FACTURA</Text>
            <Text>Nro. Orden: {nroOrden}</Text>
          </div>
          <div>
            {products.length > 0 ? (
              products.map((elem) => (
                <div key={elem.idProduct} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>{elem.stock}</Text>
                  <Text>{getDataInventario(elem.idProduct).descripcion}</Text>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </Page>
      </Document>
    </>
  );
}
