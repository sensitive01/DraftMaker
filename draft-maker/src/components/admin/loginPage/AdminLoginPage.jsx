import { useState } from "react";
import { Facebook, Lock, Mail, User, Loader } from "lucide-react";
import { verifyLogin } from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

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
      } else {
        setMessage(response?.response?.data?.message);
        setMessageType("error");
      }
    } catch (err) {
      console.log("Error in verify admin", err);

      // Set error message
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsLoading(false);
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
          {/* Status message box - now fixed height so it doesn't jump */}
          <div className="h-16 flex items-center justify-center">
            {message && (
              <div
                className={`w-full p-4 text-center flex items-center justify-center space-x-2 transition-all duration-300 ${
                  messageType === "success"
                    ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                    : messageType === "error"
                    ? "bg-red-100 text-red-800 border-l-4 border-red-500"
                    : "bg-transparent"
                }`}
              >
                {messageType === "success" && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {message}
                  </div>
                )}
                {messageType === "error" && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {message}
                  </div>
                )}
              </div>
            )}
          </div>

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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
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
