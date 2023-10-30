import { useNavigate } from "react-router-dom";

export default function NotHavePermission() {
  const navegate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <div className="p-7 border border-gray-500 rounded-lg">
        <h1 className="font-bold text-2xl">NO ESTAS HABILITADO</h1>
        <button
          className="w-full mt-4 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
          onClick={() => navegate("/logIn")}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
