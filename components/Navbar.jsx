export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between">
      <div className="font-bold">FixDepot</div>
      <div className="space-x-4">
        <a href="/catalog" className="hover:underline">Catálogo</a>
        <a href="/cart" className="hover:underline">Carrito</a>
        <a href="/login" className="hover:underline">Login</a>
      </div>
    </nav>
  );
}
