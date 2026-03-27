const BASE_URL = "http://localhost:5000/api";

export const trackEvent = async (event) => {
  try {
    await fetch(`${BASE_URL}/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    console.log("Tracked:", event);
  } catch (err) {
    console.error("Tracking failed:", err);
  }
};