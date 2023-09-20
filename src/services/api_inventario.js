const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

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

export const post = async (json) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  const response = await fetch(
    `${BASE_URL}/inventario`,
    requestOptions
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return await response.json();
};

export const update = async (id, json) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  const resultado = await fetch(
    `${BASE_URL}/inventario/${id}`,
    requestOptions
  );
  if(!resultado.ok) throw new Error(`HTTP error! status: ${resultado.status}`);

  return await resultado.json();
};

export const eliminar = async (id) => {
  const resultado = await fetch(`${BASE_URL}/inventario/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if(!resultado.ok) throw new Error(`HTTP error! status: ${response.status}`); 
  return await resultado.json();
};