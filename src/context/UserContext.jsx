import { useState, createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { db_supabase } from "../supabase/config";

import { getToken } from "../services/api_user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const navegate = useNavigate();

  const [token, setToken] = useLocalStorage("token", "");
  const [userTk, setUserTk] = useLocalStorage("userTk", {});

  const [userSupabase, setUserSupabase] = useState(null);

  const [isDone, setIsDone] = useState(false);

  const [loading, setLoading] = useState(false);

  // permission
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMercaderia, setIsMercaderia] = useState(false);
  const [isOficina, setIsOficina] = useState(false);
  const [isProduccion, setIsProduccion] = useState(false);
  const [isMatriceria, setIsMatriceria] = useState(false);

  useEffect(() => {
    db_supabase.auth.onAuthStateChange(async (event, session) => {
      if (session != null) {
        const user = await getUserSupabase();

        if (user != null) {
          await addBBDD(user.email);

          if (token) {
            try {
              const result = await getToken(user.email);

              const {
                is_admin,
                is_mercaderia,
                is_oficina,
                is_produccion,
                is_matriceria,
              } = result;
              setIsAdmin(is_admin);
              setIsMercaderia(is_mercaderia);
              setIsOficina(is_oficina);
              setIsProduccion(is_produccion);
              setIsMatriceria(is_matriceria);

              setUserSupabase(result);
              setToken(result.token);
              console.log("NAVEGATE");
              navegate("/");
            } catch (error) {
              navegate("/notVerificed");
            }
          }
        }
      } else navegate("/login");
    });
  }, []);

  const addBBDD = async (gmail) => {
    //Verificamos GMAIL
    try {
      const { data, error } = await db_supabase
        .from("users")
        .select()
        .eq("gmail", gmail);

      if (error) throw new Error("Error al momento de verificar Gmail");

      if (data.length === 0) {
        const { nombre, apellido } = userTk;
        try {
          const { error } = await db_supabase
            .from("users")
            .insert({ nombre, apellido, gmail });
          if (error) {
            console.log(error);
            throw new Error("Ocurrio un error al agregar a la base de datos");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {}
  };

  const signOut = async () => {
    try {
      const { error } = await db_supabase.auth.signOut();
      if (error) throw new Error("Error al momento de cerrar sesion");
      setToken("");
    } catch (error) {
      console.error(error);
    }
  };

  const getDataGmail = async (gmail) => {
    try {
      const { data, error } = await db_supabase
        .from("users")
        .select()
        .eq("gmail", gmail);

      if (error) throw new Error("Error al momento de verificar Gmail");

      return data;
    } catch (error) {}
  };

  const getUserSupabase = async () => {
    const {
      data: { user },
    } = await db_supabase.auth.getUser();
    return user;
  };

  const logIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await db_supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error != null) {
      if (error.message === "Invalid login credentials")
        toast.error("El Gmail o Contraseña son incorrectos");
      if (error.message === "Email not confirmed")
        toast.error("El Email no esta confirmado");
      setLoading(false);
      return error;
    }

    try {
      const result = await getToken(email);

      setUserSupabase(result);
      setToken(result.token);
      navegate("/");
    } catch (error) {
      navegate("/notVerificed");
    }
    setLoading(false);
  };

  const signUp = async (nombre, apellido, email, password) => {
    setIsDone(true);
    if (password.length >= 6) {
      const { data, error } = await db_supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        toast.error("Ocurrio un error al momento de registrarse");
        setIsDone(false);
        throw new Error("Error al momento de registrarse");
      }
      setUserTk({ nombre, apellido });

      toast.success("Se creo correctamente");
      navegate("/sendGmail");
    } else toast.error("La contraseña es corta");

    setIsDone(false);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await db_supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error("A ocurrido un error");
      throw new Error("A ocurrido un error durante la autenticacion");
    }

    const user = await getUserSupabase();

    try {
      const result = await getToken(user.email);
      setUserSupabase(result);
      setToken(result.token);
      navegate("/");
    } catch (error) {
      navegate("/notVerificed");
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        signInWithGoogle,
        signOut,
        logIn,
        signUp,
        getDataGmail,
        getUserSupabase,
        userSupabase,
        isDone,
        loading,
        isAdmin,
        isMercaderia,
        isOficina,
        isProduccion,
        isMatriceria,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
