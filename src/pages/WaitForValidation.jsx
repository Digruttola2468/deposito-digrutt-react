import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function WaitValidation() {
  const { signOut } = useContext(UserContext);
  const navegate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <div className="w-[260px] p-2 ">
        <h1>
          <b>No tenes permisos</b> , enviale un mensaje al dueño de la pagina para que te permita acceder a la pagina
        </h1>
        <button
          className="w-full mt-4 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
          onClick={() => {
            navegate("/logIn");
            signOut();
          }}
        >
          Volver a la pagina anterior
        </button>
      </div>
    </div>
  );
}
