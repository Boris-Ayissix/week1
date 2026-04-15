
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
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="mb-4 font-semibold">Admin Access</h2>
          <input
            type="password"
            placeholder="Enter password"
            className="border p-2 w-full mb-3"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 w-full rounded"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminGate;