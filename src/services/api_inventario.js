import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

const token = window.localStorage.getItem("token");

export const get = async () => {
  const response = await fetch(
    `${BASE_URL}/inventario`
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

//Get one inventario
export const getOneInventario = async (idInventario) => {
  const result = await fetch(
    `${BASE_URL}/inventario/${idInventario}`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);

  return await result.json();
};


//Get Inventario Nombres
export const getNombresInventario = async () => {
  const result = await fetch(
    `${BASE_URL}/inventario/nombres`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

export const post = async (json,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.post(`${BASE_URL}/inventario`,json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

export const update = async (id, json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.put(`${BASE_URL}/inventario/${id}`,json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

export const eliminar = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.delete(`${BASE_URL}/inventario/${id}`, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};