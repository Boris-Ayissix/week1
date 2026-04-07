import { useEffect, useState } from "react";
import { fetchAnalytics } from "../api/analyticsApi";
import { StatCard } from "../components/dashboard/StatCard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAnalytics().then(setEvents);
  }, []);

  const count = (name) =>
    events.filter(
      (e) => e.type === "CTA_CLICK" && e.name === name
    ).length;

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Deliver" value={count("DELIVER_PROJECT")} />
        <StatCard title="Mentor" value={count("MENTOR_ME")} />
        <StatCard title="Coffee" value={count("COFFEE_CHAT")} />
        <StatCard title="Free" value={count("FREE_HELP")} />
      </div>
    </div>
  );
};;

export default Dashboard;