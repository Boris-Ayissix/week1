import React from "react";
import { trackEvent } from "../../utils/analytics";

/**
 * KeySolutions Section
 * Displays 3 main services with clear value + tracking
 */
const KeySolutions = () => {

  /**
   * HANDLE CLICK
   * Tracks which solution user is interested in
   */
  const handleClick = (cta) => {
    trackEvent("cta_click", { cta_id: cta });
    console.log("Clicked:", cta);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white via-gray-50 to-purple-50">

      <div className="max-w-6xl mx-auto text-center">

        {/* SECTION HEADER */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Real Results. Real Growth.
        </h2>

        <p className="text-gray-600 mb-12">
          Simple steps. Clear wins. Numbers that matter.
        </p>

        {/* CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* 🚀 DELIVER PROJECT */}
          <div
            onClick={() => handleClick("DELIVER_PROJECT")}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl hover:border-purple-300 cursor-pointer transition hover:scale-[1.03]"
          >
            <div className="text-3xl mb-3">🚀</div>

            <h3 className="text-lg font-semibold mb-2">
              Deliver My Project
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              From idea to live — done right, done fast.
            </p>

            <ul className="text-sm font-medium space-y-1">
              <li>3x Faster Delivery</li>
              <li>40% Fewer Delays</li>
              <li>25% Better Quality</li>
            </ul>
          </div>

          {/* 🎯 MENTOR */}
          <div
            onClick={() => handleClick("MENTOR_ME")}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl hover:border-pink-300 cursor-pointer transition hover:scale-[1.03]"
          >
            <div className="text-3xl mb-3">🎯</div>

            <h3 className="text-lg font-semibold mb-2">
              Mentor Me
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Learn fast. Grow strong. Win big.
            </p>

            <ul className="text-sm font-medium space-y-1">
              <li>2x Faster Growth</li>
              <li>80% Confidence</li>
              <li>Real Experience</li>
            </ul>
          </div>

          {/* ☕ COFFEE */}
          <div
            onClick={() => handleClick("COFFEE_CHAT")}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl hover:border-yellow-300 cursor-pointer transition hover:scale-[1.03]"
          >
            <div className="text-3xl mb-3">☕</div>

            <h3 className="text-lg font-semibold mb-2">
              Coffee Chat
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Get clear. Move fast. Take action.
            </p>

            <ul className="text-sm font-medium space-y-1">
              <li>2x Faster Decisions</li>
              <li>60% Clarity</li>
              <li>Less Confusion</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KeySolutions;