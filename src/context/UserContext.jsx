import { useState, createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { iniciarSesion,registrarse } from "../services/api_user";

export const UserContext = createContext();

import { supabase } from "../supabase/config";

export const UserProvider = (props) => {

  const [token, setToken] = useLocalStorage('token', '')
  
  const [user, setUser] = useState({});
  
  useEffect(() => {console.log("USER CONTEXT",user);})

  return (
    <UserContext.Provider value={{user,setUser,setToken,token}}>
      {props.children}
    </UserContext.Provider>
  );
};
