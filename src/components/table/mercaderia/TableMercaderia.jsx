import InfoItem from "./ItemTable";
import Table from "./Table";
import TopTable from "./TopTable";

export default function TableMercaderia() {
  return (
    <div className="flex flex-col lg:flex-row justify-center ">
      <div className="p-3 shadow-xl">
        <TopTable />
        <Table />
      </div>
      <InfoItem />
    </div>
  );
}