//Get entrada mercaderia
export const getEntrada = async () => {
  const result = await fetch(
    "https://deposito-digrutt.up.railway.app/mercaderia/entrada"
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//Get Salida mercaderia
export const getSalida = async () => {
  const result = await fetch(
    "https://deposito-digrutt.up.railway.app/mercaderia/salida"
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//New mercaderia
export const post = async (json) => {
  const result = await fetch(
    "https://deposito-digrutt.up.railway.app/mercaderia",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    }
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);

  return await result.json();
};

//Update mercaderia
export const update = async (id, json) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  const result = await fetch(
    `https://deposito-digrutt.up.railway.app/mercaderia/${id}`,
    requestOptions
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//Delete Mercaderia
export const eliminar = async (id) => {
  const result = await fetch(
    `https://deposito-digrutt.up.railway.app/mercaderia/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//Search one entrada
export const searchEntrada = async (search) => {
  const result = await fetch(
    `https://deposito-digrutt.up.railway.app/mercaderia/entrada/${search}`,
    { method: "GET" }
  );
  return await result.json();
};

//Search one salida
export const searchSalida = async (search) => {
  const result = await fetch(
    `https://deposito-digrutt.up.railway.app/mercaderia/salida/${search}`,
    { method: "GET" }
  );
  return await result.json();
};
