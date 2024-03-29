import { useContext, useEffect, useState } from "react";
import DialogMenu from "./dialog/DialogMenu";
import { FaTable } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import menu from "../assets/menu.svg";
import { UserContext } from "../context/UserContext";

export default function MenuList() {
  const { userSupabase } = useContext(UserContext);
  const navegate = useNavigate();
  const [open, setOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <ul
        className={`absolute flex flex-col items-center p-1 w-full bg-celeste-oscuro z-30 m-0 left-0 ${
          showMenu ? "translate-y-[124px]" : "-translate-y-40"
        }  transition-all duration-500 sm:relative sm:flex-row sm:translate-y-0 sm:justify-end `}
      >
        <li onClick={() => navegate("/")} className="p-2 sm:ml-2">
          <a className="text-white flex flex-row items-center cursor-pointer ">
            <FaTable />
            Mercaderia
          </a>
        </li>
        <li onClick={() => navegate("/inventario")} className="p-2 sm:ml-2">
          <a
            style={{ cursor: "pointer" }}
            className="text-white flex flex-row items-center cursor-pointer"
          >
            <FaTable />
            Inventario
          </a>
        </li>
        <li onClick={() => navegate("/oficina")} className="p-2 sm:ml-2">
          <a
            style={{ cursor: "pointer" }}
            className="text-white flex flex-row items-center cursor-pointer"
          >
            <FaTable />
            Oficina
          </a>
        </li>
        <li onClick={() => navegate("/facturaNegro")} className="p-2 sm:ml-2">
          <a
            style={{ cursor: "pointer" }}
            className="text-white flex flex-row items-center cursor-pointer"
          >
            <FaTable />
            Nota Envio
          </a>
        </li>
        <li className="p-2 sm:ml-2">
          <button
            className="uppercase text-white"
            onClick={() => setOpen(true)}
          >
            Export  
          </button>
        </li>
        <DialogMenu show={open} close={setOpen} />
      </ul>
      <img
        src={menu}
        className="text-white w-6 sm:hidden"
        onClick={() => setShowMenu(!showMenu)}
      />
    </>
  );
}
