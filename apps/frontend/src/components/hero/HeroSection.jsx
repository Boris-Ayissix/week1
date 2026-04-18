import React from "react";
import HeroText from "./HeroText";
import { trackEvent, EVENTS } from "../../utils/analytics";
import  ProfileCard  from "./ProfileCard";

/**
 * Hero Section
 * Handles CTA clicks + tracking + modal opening
 */
const HeroSection = ({ onOpenModal = () => {} }) => {

  /**
   * Handles CTA click
   * - Tracks event
   * - Tracks modal opening (REQUIRED Slice 14)
   * - Opens modal
   */
  const handleClick = (cta) => {

      /**
       * STEP 1: CTA CLICK
       */
      trackEvent(EVENTS.CTA_CLICK, { cta_id: cta });
        
      /**
       * STEP 2: MODAL OPEN (FUNNEL STEP)
       * This is crucial for Slice 14 - we need to track not just the click, but the fact that it led to a modal opening. This allows us to analyze drop-off between clicking and engaging with the modal content.
       */

      trackEvent(EVENTS.MODAL_OPEN, { modal: cta });

      // Track CTA click (already implemented)
      trackEvent(EVENTS.CTA_CLICK, { cta_id: cta });

      // Open modal
      onOpenModal(cta);
      };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

        {/* Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <HeroText />

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4">

              {/* PRIMARY CTA */}
          <button
            onClick={() => handleClick("WORK")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
          >
            Work With Me
          </button>

          {/* SECONDARY CTA */}
          <button
            onClick={() => handleClick("FREE_HELP")}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Get Free Help
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