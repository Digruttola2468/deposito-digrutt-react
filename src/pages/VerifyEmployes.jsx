import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";

import logo from "../assets/digrutt_logo.png";

import { iniciarSesion } from "../services/api_user";

export default function VerifyEmployes() {
  const navegate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useLocalStorage('token','')

  const handleSubmit = (evt) => {
    evt.preventDefault();

    iniciarSesion(userName, password)
      .then((result) => {
        console.log(result);
        setToken(result.token);
      })
      .catch((e) => console.error(e));
  };

  const handleClickNewUser = (evt) => {};

  return (
    <div className="w-full h-[100vh] grid place-content-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-[200px] item-center justify-center "
      >
        <img src={logo} alt="logo" className="mb-3" />
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(evt) => setUserName(evt.target.value)}
          className="mb-3 p-1"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="mb-3 p-1"
        />
        <button>Send</button>
      </form>
      <button onClick={handleClickNewUser}>Create User</button>
    </div>
  );
}
