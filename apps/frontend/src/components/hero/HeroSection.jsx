import React, { useState } from "react";
import PropTypes from "prop-types";

import HeroText from "./HeroText";
import profileImage from "../../assets/Boris-profile.png";
import { trackEvent } from "../../utils/analytics";

const HeroSection = ({ onOpenModal = () => {} }) => {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-indigo-100 via-pink-50 to-orange-100">
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE */}
         <div className="space-y-6 max-w-xl">

            <HeroText />

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">

              <button 
               onClick={() => {
                setActiveButton("work");
                onOpenModal("work");

                trackEvent({
                  type: "CTA_CLICK",
                  name: "WORK_WITH_ME",
                });
              }}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  activeButton === "work"
                    ? "bg-indigo-800 scale-105"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Work with Me
              </button>

              <button 
                onClick={() => {
                    setActiveButton("mentor");
                    onOpenModal("mentor");

                    trackEvent({
                      type: "CTA_CLICK",
                      name: "MENTOR_ME",
                    });
                  }}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  activeButton === "mentor"
                    ? "bg-pink-800 scale-105"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                Mentor Me
              </button>

              <button 
                onClick={() => {
                  setActiveButton("coffee");
                  onOpenModal("coffee");
                  
                  trackEvent({
                    type: "CTA_CLICK",
                    name: "BUY_ME_COFFEE",
                  });
                  }}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  activeButton === "coffee"
                    ? "bg-yellow-800 scale-105"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                Buy Me Coffee
              </button>

              <button 
                onClick={() => alert("Free help coming soon!")}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
              >
                Help Me Free
              </button>

            </div>
         </div>
    

        {/* RIGHT SIDE */}
        <div className="flex justify-center items-center">
          <div className="w-72 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 text-center space-y-3">
            
            <img 
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />

            <h3 className="text-lg font-semibold">
              Boris Ayissi
            </h3>

            <p className="text-gray-600">
              Fullstack Developer
            </p>

            <p className="text-sm text-gray-500">
              💡 I build Scalable Fullstack Applications <br/>
              🚀 and startups turn ideas into production-ready products.
            </p>
            <p className="text-sm text-gray-500">
                Trusted by 10+ clients | 5+ projects delivered
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

HeroSection.propTypes = {
  onOpenModal: PropTypes.func,
};

export default HeroSection;