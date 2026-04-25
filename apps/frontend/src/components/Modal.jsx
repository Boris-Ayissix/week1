import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { trackEvent, EVENTS } from "../utils/analytics";
import { Rocket, Target, Coffee, X, Phone, Users, Globe } from "lucide-react";
import PlanCard from "./PlanCard";
import { useCallback } from "react";

export const Modal = ({ type, onClose }) => {

  /**
   * =========================
   * STATE MANAGEMENT
   * =========================
   */
  const [view, setView] = useState("selection"); // selection | plans
  const [selectedType, setSelectedType] = useState(null);

 


  /**
 * DETECT ABANDONMENT
 * If user closes modal WITHOUT selecting a plan → abandoned
 */
const handleClose = useCallback((method = "unknown") => {

  // Detect abandonment
  if (view === "plans" && selectedType) {
    trackEvent(EVENTS.JOURNEY_ABANDONED, {
      type: selectedType,
      step: "plans",
      method,
    });
  }

  if (view === "selection") {
    trackEvent(EVENTS.JOURNEY_ABANDONED, {
      type: "unknown",
      step: "selection",
      method,
    });
  }

  // Always track close
  trackEvent(EVENTS.MODAL_CLOSE, {
    modal: type,
    method,
    view,
  });

  setView("selection");
  setSelectedType(null);

  onClose();

}, [type, view, selectedType, onClose]);


  /**
   * =========================
   * ESC KEY SUPPORT
   * =========================
   */
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape"){
        handleClose("escape_key"); // TRACK SOURCE
      }
      };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);


    

    /**
      *TRACK WHEN USER REACHES PRICING
      *(VERY IMPORTANT FOR CONVERSION)
    */
    const hasTrackedPlanView = useRef(false);

    useEffect(() => {
      if (view === "plans" && selectedType && !hasTrackedPlanView.current ) {
        trackEvent(EVENTS.PLAN_VIEWED, {
          type: selectedType,
        });
        hasTrackedPlanView.current = true;
      }
      // reset flag if user goes back to selection
      if (view === "selection") {
        hasTrackedPlanView.current = false;
      }
    }, [view, selectedType]);


    
  
  /**
   * =========================
   * HANDLE SELECTION
   * =========================
   */
  const handleSelection = (cta) => {
  trackEvent(EVENTS.OPTION_SELECTED, {
    option: cta,
  });

  /**
   * 🔥 FREE HELP FLOW (NO PLANS)
   */
  if (type === "FREE_HELP") {

    // Route based on selection
    if (cta === "SITE_AUDIT") {
      window.open("/audit-form", "_blank");
      handleClose("site_audit_redirect");
      return;
    }

    if (cta === "CHAT_15MIN") {
      window.open("https://calendly.com/your-link", "_blank");
      handleClose("chat_15min_redirect");
      return;
    }

    if (cta === "TECH_CATCHUP") {
      window.open("/community", "_blank");
      handleClose("tech_catchup_redirect");
      return;
    }

    // Close modal after action
    handleClose("free_help_selected");
    return;
  }

  /**
   *  NORMAL FLOW (WORK / MENTOR / COFFEE)
   */
  setSelectedType(cta);
  setView("plans");
};


  


  /**
   * =========================
   * PROFESSIONAL PLAN STRUCTURE
   * - Includes features (critical for conversion)
   * =========================
 */
const plans = {
  DELIVER_PROJECT: [
    {
      name: "Starter",
      price: "$200",
      desc: "Best for simple MVPs",
      features: [
        "Basic project delivery",
        "1 revision included",
        "Delivery in 5–7 days",
      ],
    },
    {
      name: "Pro",
      price: "$500",
      desc: "For serious business needs",
      features: [
        "Advanced features",
        "Priority support",
        "3 revisions included",
        "Delivery in 3–5 days",
      ],
    },
    {
      name: "Accelerator",
      price: "$1000",
      desc: "Full business solution",
      features: [
        "Full-stack solution",
        "Unlimited revisions",
        "Performance optimization",
        "Fast-track delivery",
      ],
    },
  ],

  MENTOR_ME: [
    {
      name: "Starter",
      price: "$50",
      desc: "Quick guidance",
      features: [
        "1 session (45 mins)",
        "Career advice",
        "Action plan",
      ],
    },
    {
      name: "Pro",
      price: "$150",
      desc: "Structured growth",
      features: [
        "Weekly sessions",
        "Code reviews",
        "Project guidance",
      ],
    },
    {
      name: "Accelerator",
      price: "$300",
      desc: "Full mentorship program",
      features: [
        "Full coaching",
        "Real project experience",
        "Job-ready preparation",
      ],
    },
  ],

  COFFEE_CHAT: [
    {
      name: "Quick",
      price: "$10",
      desc: "Fast clarity",
      features: [
        "15 min call",
        "Quick answers",
      ],
    },
    {
      name: "Deep",
      price: "$25",
      desc: "Strategy session",
      features: [
        "45 min deep dive",
        "Problem solving",
      ],
    },
    {
      name: "VIP",
      price: "$50",
      desc: "Premium session",
      features: [
        "1 hour call",
        "Full strategy breakdown",
      ],
    },
  ],

  FREE_HELP: [
  {
    name: "Site Audit",
    price: "$0",
    desc: "Full website analysis",
    features: ["UX review", "Performance audit", "Action plan"],
  },
  {
    name: "15 Min Chat",
    price: "$0",
    desc: "Quick consultation",
    features: ["Live advice", "Problem solving"],
  },
  {
    name: "Tech CatchUp",
    price: "$0",
    desc: "Group session",
    features: ["Community learning", "Q&A"],
  },
],
};

  /**
   * SAFETY
   */
  if (!type) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => handleClose("backdrop_click")}
      />

      {/* MODAL */}
      <div
        className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100
        rounded-2xl p-10 w-full max-w-5xl shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ========================= */}
        {/* TITLE */}
        {/* ========================= */}
        <h2 className="text-2xl font-bold mb-6">
          {view === "selection" ? "Choose How You Want to Work" : "Choose a Plan"}
        </h2>

        {/* ========================= */}
        {/* SELECTION VIEW */}
        {/* ========================= */}
        {view === "selection" && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* ========================= */}
            {/* CLOSE BUTTON (TOP RIGHT) */}
            {/* ========================= */}
            <button
              onClick={() => handleClose("close_icon")}
              className="
                absolute top-4 right-4 text-gray-400 hover:text-black text-xl
              "
            >
              X
            </button>

           {type === "WORK" && (
         <>
            {/* DELIVER */}
            <div
              onClick={() => handleSelection("DELIVER_PROJECT")}
              className="p-6 bg-white rounded-2xl border hover:shadow-2xl hover:-translate-y-2 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-3 mb-3 w-fit rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Rocket />
                </div>
                <h3 className="font-semibold">Deliver My Project</h3>
              </div>

              {/* DESCRIPTION */} 
              <p className="text-sm text-gray-600 mb-3"> From idea to live — done fast and right. </p>

              {/* METRICS */} 
              <ul className="text-xs text-gray-500 space-y-1"> 
                <li>3x faster delivery</li> 
                <li>40% fewer delays</li> 
                <li>25% better quality</li> 
              </ul> 
            </div>

            {/* MENTOR */}
            <div
              onClick={() => handleSelection("MENTOR_ME")}
              className="p-6 bg-white rounded-2xl border hover:shadow-2xl hover:-translate-y-2 transition cursor-pointer"
            >
              
            <div className="flex items-center gap-2 mb-3">
                  <div className="p-3 mb-3 w-fit rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <Target />
                  </div>
                  <h3 className="font-semibold">Mentor Me</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3"> Learn fast. Grow strong. Get real results. </p>
               <ul className="text-xs text-gray-500 space-y-1"> 
                <li>2x faster growth</li> 
                <li>80% job-ready confidence</li> 
                <li>Real project experience</li> 
              </ul>

            </div>

            {/* COFFEE */}
            <div
              onClick={() => handleSelection("COFFEE_CHAT")}
              className="p-6 bg-white rounded-2xl border hover:shadow-2xl hover:-translate-y-2 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-3 mb-3 w-fit rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                  <Coffee />
                </div>

                <h3 className="font-semibold">Coffee Chat</h3>
              </div>
              <p className="text-sm text-gray-600">Quick clarity</p>
              <p className="text-sm text-gray-600 mb-3"> Get clear. Move fast. Take action. </p>
              <ul className="text-xs text-gray-500 space-y-1"> 
                <li>2x faster decisions</li> 
                <li>60% clearer direction</li> 
                <li>Less confusion</li> 
              </ul>
            </div>
          </>
           )}

           {type === "FREE_HELP" && (
            <>
         {/* SITE AUDIT */}
            <div
              onClick={() => handleSelection("SITE_AUDIT")}
              className="p-6 bg-white rounded-2xl border hover:shadow-2xl hover:-translate-y-2 transition cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-3 mb-3 w-fit rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Globe />
                </div>
                <h3 className="font-semibold">Site Audit</h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mb-3">
                Discover what’s holding your website back.
              </p>

              {/* METRICS */}
              <ul className="text-xs text-gray-500 space-y-1">
                <li>2x better UX clarity</li>
                <li>Faster load performance</li>
                <li>Higher conversion potential</li>
              </ul>
            </div>


            {/* 15 MIN CHAT */}
            <div
              onClick={() => handleSelection("CHAT_15MIN")}
              className="p-6 bg-white rounded-2xl border hover:shadow-2xl hover:-translate-y-2 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-3 mb-3 w-fit rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <Phone />
                </div>
                <h3 className="font-semibold">15 Min Chat</h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mb-3">
                Get instant clarity on your biggest blocker.
              </p>

              {/* METRICS */}
              <ul className="text-xs text-gray-500 space-y-1">
                <li>Immediate expert feedback</li>
                <li>Clear next steps</li>
                <li>Faster decision making</li>
              </ul>
            </div>


            {/* TECH CATCHUP */}
            <div
              onClick={() => handleSelection("TECH_CATCHUP")}
              className="p-6 bg-white rounded-2xl border hover:shadow-2xl hover:-translate-y-2 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-3 mb-3 w-fit rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                  <Users />
                </div>
                <h3 className="font-semibold">Tech CatchUp</h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mb-3">
                Learn, share, and grow with other builders.
              </p>

              {/* METRICS */}
              <ul className="text-xs text-gray-500 space-y-1">
                <li>Real-world problem solving</li>
                <li>Live Q&A sessions</li>
                <li>Stay sharp & up-to-date</li>
              </ul>
            </div>
          </>
          )}
          
          </div>
        )}

        


        {/* ========================= */}
        {/* PLANS VIEW */}
        {/* ========================= */}

        {view === "plans" && selectedType && (
          <>
            {/* BACK */}
            <button
              onClick={() => setView("selection")}
              className="mb-4 text-sm text-gray-500 hover:text-black"
            >
              ← Back
            </button>

            {/* <h3 className="text-lg font-semibold mb-6">
              Choose a Plan
            </h3> */}

            <div className="grid md:grid-cols-3 gap-6">
               {plans[selectedType].map((plan, index) => (
              /**
                * USE REUSABLE PLAN CARD COMPONENT
                * - Clean architecture
                * - Reusable UI
                * - Professional SaaS standard
                */
                <PlanCard
                  key={index}

                  /**
                   * Highlight middle plan (Pro)
                   * This is a proven SaaS conversion technique
                   */
                  isPopular={index === 1}

                  plan={plan}

                  /**
                   * STEP 5: PLAN SELECTION LOGIC
                   * - Handles plan selection
                   * - Tracks analytics
                   * - Prepares for payment integration
                   */
                  onSelect={() => {
                    trackEvent(EVENTS.PLAN_SELECTED, {
                      type: selectedType,
                      plan: plan.name,
                    });

                    // STEP 4: JOURNEY COMPLETED
                      trackEvent(EVENTS.JOURNEY_COMPLETED, {
                      type: selectedType,
                      });

                    //OPTIONAL: Add more detailed tracking here (e.g. which features were most attractive)
                      trackEvent("conversion_step", {
                        step: "plan_selected",
                        source: selectedType,});
                    /**
                     * FUTURE:
                     * Replace this with payment flow
                     */
                    console.log("Selected plan:", plan);

                    handleClose("plan_selected");
                  }}
                />

              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

Modal.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;