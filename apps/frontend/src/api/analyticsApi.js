const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchAnalytics = async () => {
  const res = await fetch(`${BASE_URL}/analytics`);
  return res.json();
};