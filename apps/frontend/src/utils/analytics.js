const BASE_URL = import.meta.env.VITE_API_URL;

export const trackEvent = async (event_name, data = {}) => {
  try {
    await fetch(`${BASE_URL}/analytics`, {
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
    console.error("Analytics error:", err);
  }
};