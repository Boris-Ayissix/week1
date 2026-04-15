import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminGate from "./components/admin/AdminGate";
import { trackPageView } from "./utils/analytics";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {

   /**
   * GET CURRENT ROUTE
   * This updates whenever user navigates
   */
  const location = useLocation();

  /**
   * TRACK PAGE VIEWS (CORE ANALYTICS LOGIC)
   */
  useEffect(() => {
    /**
     * location.pathname gives:
     * "/" → Home
     * "/dashboard" → Dashboard
     */
    trackPageView(location.pathname);

    // DEBUG (remove later in production)
    console.log("Page viewed:", location.pathname);

  }, [location]); // ✅ CRITICAL: runs on route change

  


  


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
  path="/dashboard" 
  element={<AdminGate>
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
    </AdminGate>} />

    </Routes>  
  )
 
}

export default App;