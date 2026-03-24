// Home.jsx
// Purpose: Page composition (Navbar + Hero)

import React from "react";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;