import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

export const get = async (token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const result = await fetch(`${BASE_URL}/inventario`, requestOptions);
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);

  return await result.json();
};

//Get one inventario
export const getOneInventario = async (idInventario, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const result = await fetch(
    `${BASE_URL}/inventario/${idInventario}`,
    requestOptions
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);

  return await result.json();
};

//Get Inventario Nombres
export const getNombresInventario = async (token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const result = await fetch(`${BASE_URL}/inventario/nombres`, requestOptions);
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//Get Sum Inventario
export const getSumInventario = async (id,token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const result = await fetch(`${BASE_URL}/inventario/sumInventario/${id}`, requestOptions);
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

export const post = async (json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.post(`${BASE_URL}/inventario`, json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

export const update = async (id, json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.put(`${BASE_URL}/inventario/${id}`, json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};

export const eliminar = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.delete(`${BASE_URL}/inventario/${id}`, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
};
