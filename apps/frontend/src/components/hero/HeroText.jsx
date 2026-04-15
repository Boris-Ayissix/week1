// HeroText.jsx
// Purpose: Content block (heading, subheading, paragraph)

import React from "react";

const HeroText = () => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-5xl font-bold leading-tight mb-">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Build Fast, Simple Websites
        </span>
        <br />
        That Grow Your Business.
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 mb-4 max-w-lg">
        Get a clean website that brings more customers, saves time, and helps your business make more money.
      </p>

      {/* Paragraph */}
      <p className="text-sm text-gray-500 mb-8 max-w-md">
       Simple tools that work fast and look great.
       <br />
       Turn visitors into paying clients without stress or confusion.
      </p>

    </div>
    
  );
};

export default HeroText;