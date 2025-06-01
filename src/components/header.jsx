export default function Header() {
  return (
    <header className="w-full bg-blue-900 h-[60px] text-white shadow-md flex items-center justify-between px-6">
      <h1 className="text-xl font-bold tracking-wide">My Store</h1>

      <nav className="space-x-4 hidden sm:flex">
        <a href="#" className="hover:text-blue-300 transition duration-200">Home</a>
        <a href="#" className="hover:text-blue-300 transition duration-200">Products</a>
        <a href="#" className="hover:text-blue-300 transition duration-200">Contact</a>
      </nav>
    </header>
  );
}
