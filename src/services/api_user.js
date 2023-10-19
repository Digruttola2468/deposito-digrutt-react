import axios from "axios";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";


export const iniciarSesion = async (gmail, password) => {

  const request = await axios.post(`${BASE_URL}/login`, {gmail,password});
  
  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);
  
  return await request.data;
};



export const registrarse = async (nombre, apellido, gmail, password) => {
  const jsonData = {
    nombre,apellido,gmail,password
  }
  
  const request = await axios.post(`${BASE_URL}/signUp`,jsonData);
  
  if (request.status >= 400) throw Error(`HTTP status error ${request.status}`);
  
  return await request.data;
}

export const iniciar_Google = async () => {
  
}