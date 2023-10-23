import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function WaitValidation() {
  const { signOut } = useContext(UserContext);
  const navegate = useNavigate();

  return (
    <div>
      <h1>
        No estas verificado , enviale un mensaje al dueño de la pagina que te
        verifique
      </h1>
      <button
        className="p-2 bg-slate-300"
        onClick={() => {
          navegate("/logIn");
          signOut();
        }}
      >
        Volver a la pagina anterior
      </button>
    </div>
  );
}
