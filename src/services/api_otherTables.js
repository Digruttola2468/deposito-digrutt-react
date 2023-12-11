import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app/api";

export const getClientes = async () => {
    const result = await fetch(
        `${BASE_URL}/clientes`
      );
      if (!result.ok) throw Error(`HTTP status error ${result.status}`);
      return await result.json();
}

export const getLocalidad = async () => {
  const result = await fetch(
      `${BASE_URL}/localidad`
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

export const getFacturaNegro = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };  

  const result = await fetch(`${BASE_URL}/facturaNegro`, config);
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);

  return await result.json();
}

export const getSendEnvio = async () => {
  const result = await fetch(
    `${BASE_URL}/facturaNegro/newNroEnvio`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
}

//            POST
export const postCliente = async (json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.post(`${BASE_URL}/cliente`, json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return request;
}

