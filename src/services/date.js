export const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const getArrayYear = (mercaderiaApi, idinventario) => {
  const enviar = new Set();
  if (idinventario != null) {
    const filtrado = mercaderiaApi.filter(
      (elem) => elem.idinventario == idinventario
    );

    for (let i = 0; i < filtrado.length; i++) {
      const element = filtrado[i];
      const newFecha = element.fecha.split("-").reverse().join("-");
      const dateFecha = new Date(newFecha);
      enviar.add(dateFecha.getFullYear());
    }
  }
  return enviar;
};

export const getArrayMercaderia = (mercaderiaApi, idinventario, categoria, year) => {
  const filtradoDato = mercaderiaApi.filter(
    (elem) => elem.idinventario == idinventario
  );
  const filtrado = filtradoDato.filter((elem) => elem.categoria == categoria);

  const enviar = [];

  let enero = 0;
  let febrero = 0;
  let marzo = 0;
  let abril = 0;
  let mayo = 0;
  let junio = 0;
  let julio = 0;
  let agosto = 0;
  let septiembre = 0;
  let octubre = 0;
  let noviembre = 0;
  let diciembre = 0;

  for (let i = 0; i < filtrado.length; i++) {
    const element = filtrado[i];
    const dateFecha = new Date(element.fecha);

    if (dateFecha.getFullYear() == year) {
      if (dateFecha.getMonth() == 0) enero += element.stock;

      if (dateFecha.getMonth() == 1) febrero += element.stock;

      if (dateFecha.getMonth() == 2) marzo += element.stock;

      if (dateFecha.getMonth() == 3) abril += element.stock;

      if (dateFecha.getMonth() == 4) mayo += element.stock;

      if (dateFecha.getMonth() == 5) junio += element.stock;

      if (dateFecha.getMonth() == 6) julio += element.stock;

      if (dateFecha.getMonth() == 7) agosto += element.stock;

      if (dateFecha.getMonth() == 8) septiembre += element.stock;

      if (dateFecha.getMonth() == 9) octubre += element.stock;

      if (dateFecha.getMonth() == 10) noviembre += element.stock;

      if (dateFecha.getMonth() == 11) diciembre += element.stock;
    }
  }
  enviar.push(enero);
  enviar.push(febrero);
  enviar.push(marzo);
  enviar.push(abril);
  enviar.push(mayo);
  enviar.push(junio);
  enviar.push(julio);
  enviar.push(agosto);
  enviar.push(septiembre);
  enviar.push(octubre);
  enviar.push(noviembre);
  enviar.push(diciembre);

  return enviar;
};
