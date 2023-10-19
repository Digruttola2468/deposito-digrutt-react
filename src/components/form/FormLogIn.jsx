import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { iniciarSesion } from "../../services/api_user";
import { useLocalStorage } from "usehooks-ts";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/app.js";

export default function FormLogIn() {
  const navegate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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

  const handleClick_signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        if(result._tokenResponse.emailVerified) {

          console.log(result._tokenResponse.firstName);
          console.log(result._tokenResponse.lastName);
          console.log(result._tokenResponse.email);
          
        }else console.log("Gmail no verificado");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick_registrarse = () => navegate("/signUp");

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 ">
      <h1 className="text-4xl font-semibold text-center">DIGRUTT S.R.L</h1>
      <div className="mt-8">
        <div className="w-full my-4">
          <TextField
            label="Gmail"
            value={email}
            type="email"
            onChange={(evt) => setEmail(evt.target.value)}
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </div>
        <div className="w-full mt-4 relative">
          <TextField
            label="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(evt) => setPassword(evt.target.value)}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <span
            className="top-[18px] right-3 absolute hover:cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BsEye size={"20px"} />
            ) : (
              <BsEyeSlash size={"20px"} />
            )}
          </span>
        </div>

        <div className=" flex justify-end">
          <button
            className="font-medium text-base text-violet-500 hover:text-violet-400"
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
            className="flex py-3 rounded-lg border-2 border-gray-200 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            onClick={handleClick_signInWithGoogle}
          >
            <FcGoogle />
            Sign In With Google
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">No tenes una cuenta?</p>
          <button
            className="text-violet-500 text-base font-medium ml-2 hover:text-violet-400"
            onClick={handleClick_registrarse}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
