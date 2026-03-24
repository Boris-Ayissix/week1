// Navbar.jsx
// Purpose: Top navigation with clickable logo (routes to home)

import React from "react";

const Navbar = () => {
  const handleLogoClick = () => {
    globalThis.location.href = "/";
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm">
      
      {/* Logo */}
      <button
        onClick={handleLogoClick}
        className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
      >
        Ayissi Boris
      </button>

      {/* Future nav items */}
      <div></div>

    </nav>
  );
};

export default Navbar;