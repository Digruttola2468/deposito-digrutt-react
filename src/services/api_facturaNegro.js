import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app/api";

export const postFacturaNegro = async (json, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.post(`${BASE_URL}/facturaNegro`, json, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
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

export const getOneFacturaNegro = async (token,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await axios.get(`${BASE_URL}/facturaNegro/${id}`, config);

  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);

  return await request.data;
}
