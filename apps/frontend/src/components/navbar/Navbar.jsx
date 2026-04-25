/**
 * ADMIN ACCESS (DISCREET)
 * Only for you, not user-facing CTA
 */
import { Link } from "react-router-dom";

const Navbar = () => {
  <Link
    to="/dashboard"
    className="text-xs text-gray-400 hover:text-black transition"
  >
    Admin
  </Link>
  
  return (
    <nav className="w-full py-4 px-6 border-b bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

         {/* ✅ Logo → navigates to Home (Slice 1 requirement) */}
         <Link to="/"><h1 className="text-xl font-semibold cursor-pointer">Boris Dev</h1></Link>
        

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