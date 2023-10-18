import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { iniciarSesion } from "../../services/api_user";
import { useLocalStorage } from "usehooks-ts";

export default function FormLogIn() {
  const navegate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick_forgotPassword = () => {};

  const handleClick_signIn = () => {
    //verificamos los campos vacios
    if (email != "" && password != "") {
      //Verificamos el email
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      if (email.match(pattern)) {
        //Obtenemos los datos
        iniciarSesion(email, password)
          .then((result) => {
            setToken(result.token);
            navegate("/");
          })
          .catch((e) => console.error(e));
      }
    } else toast.error("Completar los campos");
  };

  const handleClick_signInWithGoogle = () => {};

  const handleClick_registrarse = () => {
    navegate("/signUp");
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 ">
      <h1 className="text-4xl font-semibold text-center">DIGRUTT S.R.L</h1>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
        </div>

        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            type="password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="********"
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <button
            className="font-medium text-base text-violet-500"
            onClick={handleClick_forgotPassword}
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
            onClick={handleClick_signIn}
          >
            Sign In
          </button>
          <button
            className="flex py-3  border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            onClick={handleClick_signInWithGoogle}
          >
            <FcGoogle />
            Sign In With Google
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">No tenes una cuenta?</p>
          <button
            className="text-violet-500 text-base font-medium ml-2"
            onClick={handleClick_registrarse}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
