import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import Modal from "../components/Modal";

const Home = () => {
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
  };

 

  return (
    <div>
      <Navbar />
      <HeroSection onOpenModal={handleOpenModal} />
      <Modal 
      type={modalType} 
      onClose= { () => {
        console.log("MODAL TYPE:", modalType);
        setModalType(null)}} />
    </div>
  );
};

export default Home;