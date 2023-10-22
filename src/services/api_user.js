import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

export const getToken = async (gmail) => {
  const request = await axios.get(`${BASE_URL}/login?email=${gmail}`);
  
  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);
  
  return await request.data;
};