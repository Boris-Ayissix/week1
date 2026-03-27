import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow">
      
      <h1 className="font-bold text-lg">
        Boris Dev
      </h1>

      <div className="flex gap-6">
        <Link 
          to="/" 
          className="text-gray-700 hover:text-indigo-600"
        >
          Home
        </Link>

        <Link 
          to="/dashboard" 
          className="text-gray-700 hover:text-indigo-600"
        >
          Dashboard
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;