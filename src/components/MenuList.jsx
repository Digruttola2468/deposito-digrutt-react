import { useState } from "react";
import DialogMenu from "./dialog/DialogMenu";
import { FaTable } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MenuList() {
  const navegate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <ul className="flex flex-row items-center">
      <li onClick={() => navegate("/")} className="ml-2">
        <a className="text-white flex flex-row items-center cursor-pointer ">
          <FaTable />
          Mercaderia
        </a>
      </li>
      <li onClick={() => navegate("/inventario")} className="ml-2">
        <a
          style={{ cursor: "pointer" }}
          className="text-white flex flex-row items-center cursor-pointer"
        >
          <FaTable />
          Inventario
        </a>
      </li>
      <li className="ml-2">
        <button
          className="uppercase text-white"
          onClick={() => setOpen(true)}
        >
          Export
        </button>
      </li>
      <DialogMenu show={open} close={setOpen} />
    </ul>
  );
}
