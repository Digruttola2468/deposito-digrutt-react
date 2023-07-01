import { useState } from "react";
import Principal from "./Principal";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [input, setInput] = useState();
  const [validar, setValidar] = useLocalStorage("login",true);

  const handleText = (evt) => {
    setInput(evt.target.value);
  };
  const handleClick = () => {
    if (input === "digrutt2468") setValidar(false);
  };

  return (
    <>
      {validar ? (
        <>
          <input type="password" onChange={handleText} />
          <button onClick={handleClick}>Enviar</button>
        </>
      ) : (
        <>
          <Principal />
        </>
      )}
    </>
  );
}

export default App;
