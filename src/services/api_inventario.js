export const get = async () => {
  const response = await fetch(
    "https://deposito-digrutt.up.railway.app/inventario/sumstock"
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
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
    "https://deposito-digrutt.up.railway.app/inventario",
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
    `https://deposito-digrutt.up.railway.app/inventario/${id}`,
    requestOptions
  );
  if(!resultado.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return await resultado.json();
};

export const eliminar = async (id) => {
  const resultado = await fetch(`https://deposito-digrutt.up.railway.app/inventario/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if(!resultado.ok) throw new Error(`HTTP error! status: ${response.status}`); 
  return await resultado.json();
};