import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../api/analyticsApi";
import { StatCard } from "../components/dashboard/StatCard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAnalytics();
      setEvents(data);
    };
    loadData();
  }, []);

  const pageViews = events.filter(e => e.type === "PAGE_VIEW").length;
  const ctaClicks = events.filter(e => e.type === "CTA_CLICK").length;
  const modalOpens = events.filter(e => e.type === "MODAL_OPEN").length;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Page Views" value={pageViews} />
        <StatCard title="CTA Clicks" value={ctaClicks} />
        <StatCard title="Modal Opens" value={modalOpens} />
      </div>
    </div>
  );
};

export default Dashboard;