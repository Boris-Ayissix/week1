const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * GENERIC EVENT TRACKER (UPGRADED)
 * - Saves locally (fast UI)
 * - Sends to backend (persistent storage)
 */
export const trackEvent = async (event_name, data = {}) => {

  const newEvent = {
    event_name,
    ...data,
    timestamp: new Date().toISOString(),
  };



 /**
   * =========================
   * LOCAL STORAGE (FAST UI)
   * =========================
   */
  const existing = JSON.parse(localStorage.getItem("events")) || [];
  localStorage.setItem("events", JSON.stringify([...existing, newEvent]));

/**
   * =========================
   * BACKEND SYNC (IMPORTANT)
   * =========================
   */
  try {
    await fetch(`${BASE_URL}/api/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
  } catch (err) {
    console.error("Analytics API failed:", err);
  }
};


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
  PAGE_VIEW: "page_view",
  CTA_CLICK: "cta_click",
  MODAL_OPEN: "modal_open",
  MODAL_CLOSE: "modal_close",
  OPTION_SELECTED: "option_selected",
  PLAN_VIEWED: "plan_viewed",
  PLAN_SELECTED: "plan_selected",
};

