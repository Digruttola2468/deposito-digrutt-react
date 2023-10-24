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
  const [userTk, setUser] = useLocalStorage("user", {});

  const [userSupabase, setUserSupabase] = useState(null);

  const [isDone, setIsDone] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db_supabase.auth.onAuthStateChange(async (event, session) => {
      if (session != null) {
        const user = await getUserSupabase();

        if (!(await exitsGmail(user.email))) {
          const insertData = { ...userTk, gmail: user.email };

          const { error } = await db_supabase.from("users").insert(insertData);

          if (error)
            throw new Error("Ocurrio un error al agregar a la base de datos");
        }

        if (token === "") {
          try {
            const result = await getToken(user.email);
            setUserSupabase(result);
            setToken(result.token);
          } catch (error) {
            if (error.response.status === 404) {
              navegate("/notVerificed");
            }
          }
        }
      }
    });
  }, []);

  const signOut = async () => {
    try {
      const { error } = await db_supabase.auth.signOut();
      if (error) throw new Error("Error al momento de cerrar sesion");
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

  const exitsGmail = async (gmail) => {
    try {
      const { data, error } = await db_supabase
        .from("users")
        .select()
        .eq("gmail", gmail);

      if (error) throw new Error("Error al momento de verificar Gmail");

      if (data.length > 0) return true;
      else return false;
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
    try {
      const { data, error } = await db_supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error != null) {
        if (error.message === "Invalid login credentials")
          toast.error("El Gmail o Contraseña son incorrectos");
        if (error.message === "Email not confirmed")
          toast.error("El Email no esta confirmado");
        return error;
      }

      const result = await getToken(email);
      setLoading(false);
      setUserSupabase(result);
      setToken(result.token);
    } catch (error) {
      navegate("/notVerificed");
      setLoading(false);
    }
  };

  const signUp = async (nombre, apellido, email, password) => {
    setIsDone(true);
    if (password.length >= 6) {
      try {
        const { data, error } = await db_supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) throw new Error("Error al momento de registrarse");
        
        setIsDone(false);
        toast.success("Se creo correctamente");
        setUser({ nombre, apellido });
        navegate("/sendGmail");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await db_supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("A ocurrido un error durante la autenticacion");

      const user = await getUserSupabase();

      try {
        const result = await getToken(user.email);
        setUserSupabase(result);
        setToken(result.token);
      } catch (error) {
        if (error.response.status === 404) {
          navegate("/notVerificed");
        }
      }
    } catch (error) {
      console.error(error);
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
