const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app";

export const iniciarSesion = async (username, password) => {
    const result = await fetch(
        `${BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username,password}),
        }
      );
      if (!result.ok) throw Error(`HTTP status error ${result.status}`);
    
      return await result.json();
};