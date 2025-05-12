import { useState } from "react";
import {
  Facebook,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Phone,
} from "lucide-react";

export default function AdminSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile) => {
    // Validate mobile number (adjust regex as needed for your region)
    const re = /^[0-9]{10}$/; // Assumes 10-digit phone number
    return re.test(String(mobile));
  };

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear previous error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let formErrors = {
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    };
    let hasErrors = false;

    // Email validation
    if (!validateEmail(formData.email)) {
      formErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    // Mobile validation
    if (!validateMobile(formData.mobile)) {
      formErrors.mobile = "Please enter a valid 10-digit mobile number";
      hasErrors = true;
    }

    // Password validation
    if (!validatePassword(formData.password)) {
      formErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and number";
      hasErrors = true;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      hasErrors = true;
    }

    // If there are errors, update state and prevent submission
    if (hasErrors) {
      setErrors(formErrors);
      return;
    }

    // If all validations pass
    console.log("Sign Up successful:", formData);
    // Here you would typically make an API call to submit the form
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-600 py-4 px-4 relative overflow-hidden">
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
        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <User className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transition-all duration-300">
          <form onSubmit={handleSignUp} className="px-6 py-6">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
              Create Account
            </h2>

            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
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
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                      <AlertCircle size={20} />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Mobile Input */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    required
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      errors.mobile ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                  {errors.mobile && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                      <AlertCircle size={20} />
                    </div>
                  )}
                </div>
                {errors.mobile && (
                  <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
                )}
              </div>

              {/* Password Input */}
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="termsAccepted"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-500 underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          {/* Login Link */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-center">
            <p className="text-xs text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
