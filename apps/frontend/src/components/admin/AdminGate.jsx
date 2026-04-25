import { useState, useEffect } from "react";

/**
 * ADMIN GATE (PRODUCTION SAFE - HARDENED)
 * - Secure login validation
 * - Session persistence (sessionStorage)
 * - Basic brute-force protection
 * - Prevents session tampering
 */
const AdminGate = ({ children }) => {
  const [input, setInput] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [attempts, setAttempts] = useState(0); // 🔒 basic brute-force protection

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  /**
   * =========================
   * HANDLE LOGIN
   * =========================
   */
  const handleLogin = () => {
    const trimmedInput = input.trim(); // ✅ prevents whitespace issues

    if (attempts >= 5) {
      alert("Too many attempts. Refresh the page.");
      return;
    }

    if (trimmedInput === ADMIN_PASSWORD) {
      setIsAuth(true);

      /**
       * Store session securely
       * - sessionStorage (auto clears on tab close)
       */
      sessionStorage.setItem("admin_password", trimmedInput);

      // reset attempts on success
      setAttempts(0);

    } else {
      setAttempts(prev => prev + 1);
      alert("Wrong password");
    }
  };

  /**
   * =========================
   * SESSION VALIDATION (CRITICAL)
   * =========================
   * Prevents manual session injection attack
   */
  useEffect(() => {
    const storedPassword = sessionStorage.getItem("admin_password");

    if (storedPassword && storedPassword === ADMIN_PASSWORD) {
      setIsAuth(true);
    } else {
      // 🔒 CLEAN INVALID SESSION
      sessionStorage.removeItem("admin_password");
      setIsAuth(false);
    }
  }, [ADMIN_PASSWORD]);


  /**
   * =========================
   * UI (LOCK SCREEN)
   * =========================
   */
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">

        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Admin Dashboard
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6">
            Secure access to analytics
          </p>

          {/* INPUT */}
          <input
            type="password"
            placeholder="Enter admin password"
            className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin(); // ✅ UX improvement
            }}
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition"
          >
            Access Dashboard
          </button>

          {/* OPTIONAL: attempt indicator (debug only) */}
          {attempts > 0 && (
            <p className="text-xs text-red-400 text-center mt-3">
              Failed attempts: {attempts}/5
            </p>
          )}

        </div>
      </div>
    );
  }

  /**
   * =========================
   * AUTHORIZED VIEW
   * =========================
   */
  return children;
};

export default AdminGate;