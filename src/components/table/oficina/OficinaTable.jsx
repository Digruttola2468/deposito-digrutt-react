
import { Pagination } from "@mui/material";
import ItemTableOficina from "./ItemTable";
import TableRemito from "./TablaRemito";

export default function OficinaTable() {

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:max-w-[800px] py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden ">
            <TableRemito />
            <div className="flex flex-row justify-center ">
              <Pagination
              />
            </div>
          </div>
        </div>
      </div>
      <ItemTableOficina />
    </div>
  );
}
