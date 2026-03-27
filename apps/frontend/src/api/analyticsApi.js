// Purpose: Fetch analytics data from backend

export const fetchAnalytics = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/analytics");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return [];
  }
};