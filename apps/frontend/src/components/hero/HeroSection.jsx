// HeroSection.jsx
// Purpose: Layout container (grid system)

import React from "react";
import HeroText from "./HeroText";
import profileImage from "../../assets/Boris profile.png";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-br from-indigo-100 via-pink-50 to-orange-100">
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE */}
        <HeroText />

        {/* RIGHT SIDE */}
        <div className="flex justify-center items-center">
          <div className="w-64 h-64 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <img src={profileImage} 
            alt="Profile"
            className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;