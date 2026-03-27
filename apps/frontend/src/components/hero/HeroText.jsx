// HeroText.jsx
// Purpose: Content block (heading, subheading, paragraph)

import React from "react";

const HeroText = () => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Heading */}
      <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
        Build Something Amazing with Class and style
      </h1>

      {/* Subheading */}
      <h2 className="text-xl text-gray-600">
        Fullstack Developer | Mentor | Problem Solver
      </h2>

      {/* Paragraph */}
      <p className="text-gray-500 leading-relaxed">
        I help individuals and businesses design, build, and scale modern web applications.
        Whether you need a developer, mentor, or collaborator. I’m here to help.
      </p>

    </div>
  );
};

export default HeroText;