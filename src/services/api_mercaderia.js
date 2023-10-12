import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

export const getAllMercaderia = async () => {
  const result = await fetch(`${BASE_URL}/mercaderia`);
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//New mercaderia
export const post = async (json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.post(`${BASE_URL}/mercaderia`, json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

//Update mercaderia
export const update = async (id, json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.put(`${BASE_URL}/mercaderia/${id}`, json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

//Delete Mercaderia
export const eliminar = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.delete(`${BASE_URL}/mercaderia/${id}`, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

export const getGrafica = async (idInventario) => {
  const result = await fetch(`${BASE_URL}/grafica/mercaderia/${idInventario}`, {
    method: "GET",
  });
  return await result.json();
};
