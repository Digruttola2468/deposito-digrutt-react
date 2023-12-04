import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app/api";

export const postRemito = async (token, jsonData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.post(`${BASE_URL}/remito`, jsonData, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

export const getRemitos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.get(`${BASE_URL}/remito`, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
}

export const getOneRemito = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.get(`${BASE_URL}/remito/${id}`, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
}