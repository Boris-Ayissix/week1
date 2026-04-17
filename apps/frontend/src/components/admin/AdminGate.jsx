
import { useState } from "react";

const AdminGate = ({ children }) => {
  const [input, setInput] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  /**
   * Handle login form submission
   * Check if input matches the admin password
   * If it does, set isAuth to true
   * If not, alert the user with an error message
   */
  const handleLogin = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (input === adminPassword) {
      // If input matches admin password, set isAuth to true
      setIsAuth(true);
    } else {
      // If not, alert the user with an error message
      alert("Wrong password");
    }
  };

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
        className="
          border p-3 w-full mb-4 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500
        "
        onChange={(e) => setInput(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={handleLogin}
        className="
          w-full py-3 rounded-lg text-white font-medium
          bg-gradient-to-r from-purple-600 to-pink-500
          hover:scale-105 transition
        "
      >
        Access Dashboard
      </button>

        </div>
      </div>
    );
  }

  return children;
};

export default AdminGate;