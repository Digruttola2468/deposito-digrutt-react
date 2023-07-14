import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";

export default function VerifyEmployes() {
  const [key, setKey] = useLocalStorage("key", "");
  const navegate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (key === "digrutt2468") navegate("/");
    else toast.error("Clave incorrecto");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={key}
        onChange={(evt) => setKey(evt.target.value)}
        placeholder="Clave Ingreso"
      />
      <button>Send</button>
    </form>
  );
}
