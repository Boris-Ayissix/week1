import PropTypes from "prop-types";
import { Check } from "lucide-react";

/**
 * PROFESSIONAL SAAS PLAN CARD
 * - Handles pricing, features, CTA, highlighting
 */
const PlanCard = ({ plan, isPopular, onSelect }) => {

    return (
        <div
         className={`relative p-6 rounded-2xl border bg-white
        transition-all duration-300 cursor-pointer
        hover:shadow-2xl hover:-translate-y-2
        ${isPopular ? "border-purple-500 scale-105 shadow-xl" : ""}
        `}
        onClick={onSelect} >
        
        {/* ========================= */}
      {/* MOST POPULAR BADGE */}
      {/* ========================= */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 
          bg-gradient-to-r from-purple-600 to-pink-500 
          text-white text-xs px-3 py-1 rounded-full shadow-md">
          Most Popular
        </div>
        )}
        
        {/* ========================= */}
      {/* PLAN NAME */}
      {/* ========================= */}
      <h3 className="text-lg font-semibold mb-2">
        {plan.name}
      </h3>

      {/* ========================= */}
      {/* PRICE */}
      {/* ========================= */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">
          {plan.price}
        </span>
        <span className="text-sm text-gray-500 ml-1">
          /one-time
        </span>
      </div>

      {/* ========================= */}
      {/* DESCRIPTION */}
      {/* ========================= */}
      <p className="text-sm text-gray-600 mb-4">
        {plan.desc}
      </p>

      {/* ========================= */}
      {/* FEATURES LIST */}
      {/* ========================= */}
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>

      {/* ========================= */}
      {/* CTA BUTTON */}
      {/* ========================= */}
      <button
        className={`
          w-full py-2 rounded-lg font-medium transition
          ${isPopular 
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
            : "border hover:bg-gray-100"
          }
        `}
      >
        Get Started
      </button>

    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  isPopular: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default PlanCard;