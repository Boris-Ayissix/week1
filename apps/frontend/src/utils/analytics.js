const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * GENERIC EVENT TRACKER (UPGRADED)
 * - Saves locally (fast UI)
 * - Sends to backend (persistent storage)
 */

// 🔹 Generic event tracker
   const DEBUG = import.meta.env.VITE_DEBUG_ANALYTICS === "true";

export const trackEvent = async (event_name, data = {}) => {
  if (DEBUG) {
    console.log(`Tracking event: ${event_name}`, data);
  }


  try {
    await fetch(`${BASE_URL}/api/analytics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_name,
      ...data,
      timestamp: new Date().toISOString(),
    }),
  });
  } catch (err) {
    console.error("Analytics failed:", err);
  }
};

/**
 * SPECIFIC TRACKERS
 * For better code readability and consistency
 */
export const trackHeroViewed = () => trackEvent(EVENTS.HERO_VIEWED);
export const trackWorkWithMeClicked = () => trackEvent(EVENTS.WORK_WITH_ME_CLICKED);
export const trackFreeHelpClicked = () => trackEvent(EVENTS.FREE_HELP_CLICKED);

/**
 * PAGE VIEW TRACKER (NEW)
 * Automatically logs page visits
 */
export const trackPageView = (page) => {
  trackEvent("page_view", { page });
};

/**
 * CENTRALIZED EVENT CONSTANTS
 * Prevents inconsistency across app
 */
export const EVENTS = {
  // Page Views
  HERO_VIEWED: "hero_section_viewed",
  
  // Primary Clicks
  WORK_WITH_ME_CLICKED: "work_with_me_clicked",
  FREE_HELP_CLICKED: "free_help_clicked",

  // Secondary Clicks
  CTA_CLICK: "cta_click", //ADD THIS
  MODAL_OPEN: "modal_open",
  MODAL_CLOSE: "modal_close",
  PLAN_SELECTED: "plan_selected",
  PLAN_VIEWED: "plan_viewed",// { type: "MENTOR_ME" } 


  // Specific Options Selected (Slice 17)
  OPTION_SELECTED: "option_selected", // data: { option: 'DELIVER_PROJECT' }

  // Funnel Status   
  JOURNEY_COMPLETED: "journey_completed", // data: { type: 'MENTOR_ME' }
  JOURNEY_ABANDONED: "journey_abandoned", // data: { type: 'COFFEE_CHAT', step: 'pricing' }
};





