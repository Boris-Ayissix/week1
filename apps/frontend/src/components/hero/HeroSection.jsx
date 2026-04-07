import React from "react";

import HeroText from "./HeroText";
import { trackEvent } from "../../utils/analytics";
import  ProfileCard  from "./ProfileCard";


const HeroSection = ({ onOpenModal = () => {} }) => {

  const handleclick = (type) => {
    onOpenModal(type);
    console.log("CTA CLICKED:", type);
    trackEvent("cta_click", { 
      cta_id: type,
     });
  };
  

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

    {/* Glow Effects */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20" />
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20" />
      
        {/* CONTENT */}
       <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center">


        {/* LEFT */}
        <div className="space-y-6">
          <HeroText />

          <div className="flex flex-wrap gap-4">
      <button
        onClick={() => handleclick("WORK")}
        className="bg-black text-white px-6 py-3 rounded-lg font-medium transition hover:scale-105"
      >
        Work With Me
      </button>

      <button
        onClick={() => handleclick("CONNECT")}
        className="border border-gray-300 px-6 py-3 rounded-lg text-gray-700 transition hover:bg-gray-100"
      >
        Connect With Me
      </button>
    </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">
          <ProfileCard />
        </div>

      </div>
    </section>

  );
};

export default HeroSection;