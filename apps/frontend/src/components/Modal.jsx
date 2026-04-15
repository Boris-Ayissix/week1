import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { trackEvent, EVENTS } from "../utils/analytics";
import { Rocket, Target, Coffee, X } from "lucide-react";
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
   * =========================
   * CENTRALIZED CLOSE FUNCTION (UPGRADED)
   * Tracks HOW user closes modal (CRITICAL ANALYTICS)
   * - close_icon (X button)
   * - backdrop
   * - ESC
   * - plan selection (conversion point, important to track)
   * - unknown (fallback for any untracked close method)
   * Also resets modal state for next open (important for UX)
   *- Tracks if user left from selection or plans (important for funnel analysis)
   * - view state tells us where user is in modal (selection vs plans) when they close, which is critical for understanding drop-off points in the funnel 
   * - method state tells us how user closed the modal, which is important for understanding drop-off points in the funnel
   * - Wrapping in useCallback to prevent unnecessary re-renders and ensure stable function reference for event listeners
   * =========================
   */
  const handleClose = useCallback((method = "unknown") => {
    trackEvent(EVENTS.MODAL_CLOSE, {
      modal: type,
      method, //  key insight (X, backdrop, ESC)
      view,   //  tells if user left from selection or plans
    });

    // Reset state
    setView("selection");
    setSelectedType(null);

    onClose();
  }, [type, view, onClose]);


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
  }, []);


    /**
      *TRACK WHEN USER REACHES PRICING
      *(VERY IMPORTANT FOR CONVERSION)
    */
    useEffect(() => {
      if (view === "plans" && selectedType) {
        trackEvent(EVENTS.PLAN_VIEWED, {
          type: selectedType,
        });
      }
    }, [view, selectedType]);


  
  /**
   * =========================
   * HANDLE SELECTION
   * =========================
   */
  const handleSelection = (cta) => {
    /**
      *STEP 3: OPTION SELECTED (FUNNEL)
      */
    trackEvent(EVENTS.OPTION_SELECTED, {
      option: cta,
    });

    setSelectedType(cta);
    setView("plans"); // move to plans
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
        onClick={() => handleClose("backdrop_click")} //Track
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
              onClick={() => handleClose("close_icon")} // Track close source
              className="
                absolute top-4 right-4 text-gray-400 hover:text-black text-xl
              "
            >
              X
            </button>

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