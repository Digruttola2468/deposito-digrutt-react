import MenuList from "./MenuList";

export default function NavMenu() {
  
  return (
    <nav className="container m-auto relative flex flex-row justify-between items-center py-0 px-2">
      <h1 className="text-white text-4xl title">Digrutt</h1>
      <MenuList />
    </nav>
  );
}
