const API_URL = import.meta.env.VITE_API_URL;

export const fetchAnalytics = async () => {
  try {
    const res = await fetch(`${API_URL}/api/analytics`);
    const data = await res.json();
    console.log("FETCHED EVENTS:", data); // debug
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};