const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

export const getAllMercaderia = async () => {
  const result = await fetch(
    `${BASE_URL}/mercaderia`
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
}

//New mercaderia
export const post = async (json) => {
  const result = await fetch(
    `${BASE_URL}/mercaderia`,
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
    `${BASE_URL}/mercaderia/${id}`,
    requestOptions
  );
  if (!result.ok) throw Error(`HTTP status error ${result.status}`);
  return await result.json();
};

//Delete Mercaderia
export const eliminar = async (id) => {
  const result = await fetch(
    `${BASE_URL}/mercaderia/${id}`,
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

export const getGrafica = async (idInventario) => {
  const result = await fetch(
    `${BASE_URL}/grafica/mercaderia/${idInventario}`,
    { method: "GET" }
  );
  return await result.json();
}