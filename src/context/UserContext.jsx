import { useState, createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { db_supabase } from "../supabase/config";

import { getToken } from "../services/api_user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const BASE_URL =
    "https://deposito-digrutt-express-production.up.railway.app/api";

  const navegate = useNavigate();
  const [userSupabase, setUserSupabase] = useLocalStorage("user", null);

  const [isDone, setIsDone] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /*db_supabase.auth.onAuthStateChange(async (event, session) => {
      if (session != null) {
        //Si se inicio sesion con google
        if (session.user.app_metadata.provider === "google") {
          //GMAIL ESTA CONFIRMADO
          await addBBDD(session.user.email);

          try {
            const result = await getToken(session.user.email);
            setUserSupabase(result);
            navegate("/");
          } catch (error) {
            navegate("/notVerificed");
          }
        } else {
          const user = await getUserSupabase();

          if (user != null) {
            if (userSupabase != null) navegate("/");
            else navegate("/notVerificed");
          } else navegate("/login");
        }
      } else navegate("/login");
    });*/
  }, []);

  /*const addBBDD = async (gmail) => {
    //Verificamos GMAIL
    try {
      const { data, error } = await db_supabase
        .from("users")
        .select()
        .eq("gmail", gmail);

      if (error) throw new Error("Error al momento de verificar Gmail");

      if (data.length === 0) {
        try {
          const { error } = await db_supabase.from("users").insert({ gmail });
          if (error) {
            console.log("ADD BBDD", error);
            throw new Error("Ocurrio un error al agregar a la base de datos");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };*/

  const signOut = async () => {
    try {
      const { error } = await db_supabase.auth.signOut();
      if (error) throw new Error("Error al momento de cerrar sesion");
      setUserSupabase(null);
    } catch (error) {
      console.error(error);
    }
  };

  /*const getUserSupabase = async () => {
    const {
      data: { user },
    } = await db_supabase.auth.getUser();
    return user;
  };*/

  const logIn = async (email, password) => {
    setLoading(true);

    axios
      .get(`${BASE_URL}/login?email=${email}&password=${password}`)
      .then((result) => {
        setUserSupabase(result.data);
        navegate('/');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something Wrong");
      });
  };

  const signUp = async (nombre, apellido, email, password) => {
    /*setIsDone(true);
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

      toast.success("Se creo correctamente");
      navegate("/sendGmail");
    } else toast.error("La contraseña es corta");
    setIsDone(false);*/
    toast.error('No esta habilitado')
  };

  const signInWithGoogle = async () => {
    const { data, error } = await db_supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(error);
      toast.error("A ocurrido un error");
      throw new Error("A ocurrido un error durante la autenticacion");
    }
  };

  return (
    <UserContext.Provider
      value={{
        signInWithGoogle,
        signOut,
        logIn,
        signUp,
        userSupabase,
        isDone,
        loading,
        BASE_URL,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
