import { useState } from "react";
import { Facebook, Lock, Mail, User } from "lucide-react";
import { verifyLogin } from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Login attempt:", { username, password });
      const response = await verifyLogin(username, password);
      console.log("response", response);

      if (response.status === 200) {
        // Properly store admin data in localStorage with key
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));

        // Set success message
        setMessage("Login successful! Redirecting to dashboard...");
        setMessageType("success");

        // Navigate to dashboard after a slight delay to show the success message
        setTimeout(() => {
          navigate("/admin/dashboard");
          window.location.reload(); // Force reload to trigger authentication check
        }, 1500);
      }
    } catch (err) {
      console.log("Error in verify admin", err);

      // Set error message
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-600 py-12 px-4 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-black opacity-20 z-0"
        aria-hidden="true"
      ></div>

      <div
        className="absolute bottom-0 left-0 right-0 flex justify-between z-10"
        aria-hidden="true"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-6 bg-black opacity-30 h-16 mx-1 rounded-t-md"
          ></div>
        ))}
      </div>

      <div
        className="absolute bottom-0 right-0 flex items-end z-10"
        aria-hidden="true"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-black opacity-40 rounded-t-md mx-1"
            style={{
              height: `${Math.floor(40 + Math.random() * 80)}px`,
              width: `${Math.floor(15 + Math.random() * 30)}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 z-0" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.floor(2 + Math.random() * 6)}px`,
              height: `${Math.floor(2 + Math.random() * 6)}px`,
              top: `${Math.floor(Math.random() * 100)}%`,
              left: `${Math.floor(Math.random() * 100)}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-md relative z-20">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transition-all duration-300">
          {message && (
            <div
              className={`p-4 text-center ${
                messageType === "success"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <div className="px-6 py-8">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Admin Login
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username or email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setMessage("");
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage("");
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="/admin/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
