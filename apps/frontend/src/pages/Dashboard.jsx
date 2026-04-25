import { useState, useEffect } from "react";
import { StatCard } from "../components/dashboard/StatCard";
import { Briefcase, Users, BarChart3,Eye, X, DollarSign} from "lucide-react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";


const Dashboard = () => {

   /**
   * =========================
   * STATE
   * =========================
   */
  const [events, setEvents] = useState([]);     // RAW EVENTS (array)
  const [summary, setSummary] = useState({});   // AGGREGATED DATA

   const BASE_URL = import.meta.env.VITE_API_URL;

   const password = sessionStorage.getItem("admin_password");
   if (!password) {
  window.location.reload(); // or redirect to login
  return;
}

   /**
   * =========================
   * FETCH EVENTS (FOR FUNNEL)
   * API URL (from .env)
   * This is the base URL for all API calls, defined in .env as VITE_API_URL
   * =========================
   */

  //   useEffect(() => {
  //   fetch(`${BASE_URL}/api/analytics`, {
  //     headers: {
  //       "x-admin-password": import.meta.env.VITE_ADMIN_PASSWORD,
  //     },
  //   })
  //     .then(res => {
  //       if (!res.ok) throw new Error("Events API failed");
  //       return res.json();
  //     })
  //     .then(data => {
  //       /**
  //        *  ALWAYS ENSURE ARRAY
  //        */
  //       if (Array.isArray(data)) {
  //         setEvents(data);
  //       } else {
  //         console.error("Events is not array:", data);
  //         setEvents([]);
  //       }
  //     })
  //     .catch(err => {
  //       console.error("Events fetch error:", err);
  //       setEvents([]);
  //     });
  // }, []);
      

    /**
   * =========================
   * FETCH SUMMARY (FOR KPIs)
   * =========================
   */
     useEffect(() => {
   /**
   * FUNCTION TO FETCH BOTH EVENTS + SUMMARY
   */
  const fetchData = async () => {
  try {
    const password = sessionStorage.getItem("admin_password");

    // 🚀 Fetch EVENTS
    const eventsRes = await fetch(`${BASE_URL}/api/analytics`, {
      headers: {
        "x-admin-password": password,
      },
    });

    if (!eventsRes.ok) throw new Error("Events fetch failed");

    const eventsData = await eventsRes.json();
    setEvents(Array.isArray(eventsData) ? eventsData : []);

    // 🚀 Fetch SUMMARY
    const summaryRes = await fetch(`${BASE_URL}/api/analytics/summary`, {
      headers: {
        "x-admin-password": password,
      },
    });

    if (!summaryRes.ok) throw new Error("Summary fetch failed");

    const summaryData = await summaryRes.json();
    setSummary(summaryData);

  } catch (err) {
  console.error("Dashboard refresh error:", err);
  setSummary({});
  setEvents([]);
}
};
      /**
       * INITIAL LOAD
       */
      fetchData();

      /**
       *  AUTO REFRESH EVERY 5 SECONDS
       */
      const interval = setInterval(fetchData, 5000);

      /**
       * CLEANUP (VERY IMPORTANT)
       */
      return () => clearInterval(interval);

    }, []);




  // const count = (cta) =>
  //   events.filter(
  //     (e) => e.event_name === "cta_click" && e.cta_id === cta
  //   ).length;

    // const totalClicks = events.filter(
    //   (e) => e.event_name === "cta_click"
    // ).length

    

    /**
 * COUNT MODAL OPENS (Slice 16)
 */
    // const countModalOpen = (modal) =>
    //   events.filter(
    //     (e) => e.event_name === "modal_open" && e.modal === modal
    //   ).length;

    

  


/**
 * COUNT PAGE VIEWS (Slice 15)
    */
  // const pageViews = events.filter(
  //   (e) => e.event_name === "page_view"
  // ).length;


     /**
   * =========================
   * SAFE FILTER WRAPPER
   * =========================
   */
  const safeEvents = Array.isArray(events) ? events : [];

  /**
   * =========================
   * FUNNEL METRICS
   * =========================
   */
    const ctaClicks = safeEvents.filter(e =>
      e.event_name === "cta_click" && e.data?.cta_id === "WORK"
    ).length;

    const modalOpens = safeEvents.filter(e =>
      e.event_name === "modal_open" && e.data?.modal === "WORK"
    ).length;

    const optionSelected = safeEvents.filter(e =>
      e.event_name === "option_selected"
    ).length;

    const planViewed = safeEvents.filter(e =>
      e.event_name === "plan_viewed"
    ).length;

    const planSelected = safeEvents.filter(e =>
      e.event_name === "plan_selected"
    ).length;

    const closeByX = safeEvents.filter(e => 
      e.event_name === "modal_close" && e.data?.method === "close_icon"
    ).length;

    const conversion = (from, to) =>
      from === 0 ? 0 : ((to / from) * 100).toFixed(1);


    /**
   * =========================
   * CHART DATA (FROM SUMMARY)
   * =========================
   */
        const chartData = [
        { name: "Deliver", value: summary.DELIVER_PROJECT || 0 },
        { name: "Mentor", value: summary.MENTOR_ME || 0 },
        { name: "Coffee", value: summary.COFFEE_CHAT || 0 },
        { name: "Site Audit", value: summary.SITE_AUDIT || 0 },
        { name: "15min Chat", value: summary.CHAT_15MIN || 0 },
        { name: "Tech Catchup", value: summary.TECH_CATCHUP || 0 },
      ]

      const formatPlan = (plan) => {
      if (!plan || plan === "No data yet") return "—";

          const [type, tier] = plan.split("_");

          const labels = {
            DELIVER_PROJECT: "Deliver",
            MENTOR_ME: "Mentor",
            COFFEE_CHAT: "Coffee",
          };

          return `${labels[type]} - ${tier}`;
        };


        /**
         * Logout function
         */
        const logout = () => {
          sessionStorage.removeItem("admin_password");
          window.location.reload();
        };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-10">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Deliver Projects"
          value={summary.DELIVER_PROJECT || 0}
          icon={Briefcase}
          />
        <StatCard 
          title="Mentorship"
          value={summary.MENTOR_ME || 0}
          icon={Users}
        />
        <StatCard 
          title="Coffee Chats"
          value={summary.COFFEE_CHAT || 0}
          icon={Users}
        />
        <StatCard 
          title="Total Clicks" 
          value={summary.total_clicks || 0} 
          icon={BarChart3}
        />

        <StatCard 
        title="Page Views"
        value={summary.page_views || 0}
        icon={Eye}
      />

        <StatCard 
          title="Work Modal Opens"
          value={summary.WORK_MODAL_OPENS || 0}
          icon={Briefcase}
        />

        <StatCard 
          title="Free Help Modal Opens"
          value={summary.FREE_HELP_MODAL_OPENS || 0}
          icon={Users}
        />

        <StatCard 
          title="Close via X"
          value={closeByX|| 0}
          icon={X}
        />

        <StatCard 
          title="Estimated Revenue"
          value={`$${summary.revenue || 0}`}
          icon={DollarSign}
        />


        <StatCard
          title="Top Plan"
          value={formatPlan(summary.top_plan)}
          icon={BarChart3}
        />

        <StatCard title="Site Audit" value={summary.SITE_AUDIT || 0} icon={BarChart3} />
        <StatCard title="15min Chat" value={summary.CHAT_15MIN || 0} icon={Users} />
        <StatCard title="Tech Catchup" value={summary.TECH_CATCHUP || 0} icon={Users} />
        <StatCard title="Completed" value={summary.completed || 0} icon={Briefcase} />
        <StatCard title="Abandoned" value={summary.abandoned || 0} icon={X} />

      </div>

      

      {/* ========================= */}
      {/* CHART */}
      {/* ========================= */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 mt-8 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">CTA Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />   {/* purple */}
                <stop offset="100%" stopColor="#ec4899" /> {/* pink */}
              </linearGradient>
            </defs>
            <XAxis dataKey="name"  />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="url(#colorGradient)" radius={[6, 6, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>

        {/* ========================= */}
        {/* FUNNEL */}
        {/* ========================= */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Conversion Funnel</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>CTA → Modal</span>
            <span>{conversion(ctaClicks, modalOpens)}%</span>
          </div>

          <div className="flex justify-between">
            <span>Modal → Option</span>
            <span>{conversion(modalOpens, optionSelected)}%</span>
          </div>

          <div className="flex justify-between">
            <span>Option → Plan View</span>
            <span>{conversion(optionSelected, planViewed)}%</span>
          </div>

          <div className="flex justify-between">
            <span>Plan View → Selection</span>
            <span>{conversion(planViewed, planSelected)}%</span>
          </div>
        </div>

        <button onClick={logout} className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition">
          Logout
        </button>
      </div>
      </div>
    </div>

    
  );
};;

export default Dashboard;