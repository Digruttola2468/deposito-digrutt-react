const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

export const getClientes = async () => {
    const result = await fetch(
        `${BASE_URL}/clientes`
      );
      if (!result.ok) throw Error(`HTTP status error ${result.status}`);
      return await result.json();
}

export const getColores = async () => {
    const result = await fetch(
        `${BASE_URL}/colores`
      );
      if (!result.ok) throw Error(`HTTP status error ${result.status}`);
      return await result.json();
}

export const getMaquinaParada = async () => {
    const result = await fetch(
        `${BASE_URL}/maquinaParada`
      );
      if (!result.ok) throw Error(`HTTP status error ${result.status}`);
      return await result.json();
}

export const getMateriaPrima = async () => {
  const result = await fetch(
    `${BASE_URL}/materiaPrima`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
}

export const getProductosMatriz = async () => {
  const result = await fetch(
    `${BASE_URL}/productos`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
}

export const getTipoProductoInventario = async () => {
  const result = await fetch(
    `${BASE_URL}/tiposproductos`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
}

export const getUnidadDeMedida = async () => {
  const result = await fetch(
    `${BASE_URL}/unidadMedida`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
}
