// HeroText.jsx
// Purpose: Content block (heading, subheading, paragraph)

import React from "react";

const HeroText = () => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Build Fast, Simple Websites
        </span>
        <br />
        That Get Results.
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 mb-4 max-w-lg">
        Clean apps that bring customers, save time, and grow your business.
      </p>

      {/* Paragraph */}
      <p className="text-sm text-gray-500 mb-8 max-w-md">
        Simple. Fast. Reliable. Built to convert visitors into clients.
      </p>

    </div>
    
  );
};

export default HeroText;