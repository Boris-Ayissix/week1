import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";


const Home = () => {
  const [modalType, setModalType] = useState(null);


  
 
 

  return (
    /**
     * PAGE LAYOUT WRAPPER
     * Ensures full height and vertical stacking
   */
    <div className="min-h-screen flex flex-col">


      <Navbar />
      <HeroSection onOpenModal={setModalType} />
      <Modal 
      type={modalType} 
      onClose= { () => {
        console.log("MODAL TYPE:", modalType);
        setModalType(null)}} />
      <Footer />
    </div>
    
  );
};

export default Home;