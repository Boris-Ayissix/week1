
const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 border-b bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Boris Dev</h1>

        <div className="flex gap-4">
          <button className="text-sm text-gray-600 hover:text-black">
            About
          </button>
          <button className="text-sm text-gray-600 hover:text-black">
            Work
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;