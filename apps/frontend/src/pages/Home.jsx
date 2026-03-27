import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import { Modal } from "../components/Modal";
import { trackEvent } from "../utils/analytics";
import Footer from "../components/Footer";


const Home = () => {
  const [activeModal, setActiveModal] = useState(null);

 /**
   * Track page view (runs once when page loads)
  */ 
useEffect(() => {
  trackEvent({
    type: "PAGE_VIEW",
    name: "HOME_PAGE",
  });
}, []);

  /**
   * Open modal + track analytics
   */
  const openModal = (type) => {
  setActiveModal(type);

  trackEvent({
    type: "MODAL_OPEN",
    name: type,
  });
};

  /**
   * Close modal + track analytics
   */
  const closeModal = () => {
    setActiveModal(null);
  };

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /**
   * Close modal
   */
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
  }, [activeModal]);

  return (
    <div>
      <Navbar />
      <HeroSection onOpenModal={openModal} />

      {activeModal && (
        <Modal type={activeModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;