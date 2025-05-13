import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Check,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { changePassword } from "../../../../api/service/axiosService";

const notificationAnimationStyle = `
@keyframes slideIn {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

.animate-slide-out {
  animation: slideOut 0.3s ease-in forwards;
}
`;

const ResetPasswordComponent = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notification, setNotification] = useState(null);
  const [isNotificationExiting, setIsNotificationExiting] = useState(false);

  const passwordRequirements = [
    {
      id: "length",
      label: "At least 8 characters",
      test: (pass) => pass.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      test: (pass) => /[A-Z]/.test(pass),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      test: (pass) => /[a-z]/.test(pass),
    },
    {
      id: "number",
      label: "At least one number",
      test: (pass) => /[0-9]/.test(pass),
    },
    {
      id: "special",
      label: "At least one special character",
      test: (pass) => /[^A-Za-z0-9]/.test(pass),
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification(null);

    setTimeout(() => {
      setNotification({ message, type });
    }, 100);

    setTimeout(() => {
      dismissNotification();
    }, 5000);
  };

  const dismissNotification = () => {
    setIsNotificationExiting(true);
    setTimeout(() => {
      setNotification(null);
      setIsNotificationExiting(false);
    }, 300);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const failedRequirements = passwordRequirements.filter(
        (req) => !req.test(formData.newPassword)
      );

      if (failedRequirements.length > 0) {
        newErrors.newPassword = "Password doesn't meet requirements";
      }
    }

    if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await changePassword(formData);
      console.log("response",response);  
      if (response.status === 200) {
        showNotification(
          "Your password has been reset successfully!",
          "success"
        );
      } else {
        showNotification(response?.response?.data?.message, "error");
      }

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showNotification(
        error.message || "Failed to reset password. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return 0;

    const metRequirements = passwordRequirements.filter((req) =>
      req.test(password)
    ).length;
    return (metRequirements / passwordRequirements.length) * 100;
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const getStrengthColor = (strength) => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (strength) => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Good";
    return "Strong";
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <style>{notificationAnimationStyle}</style>

      {notification && (
        <div className="fixed top-5 right-5 left-5 md:left-auto md:w-96 z-50">
          <div
            className={`shadow-lg rounded-lg border-l-4 ${
              isNotificationExiting ? "animate-slide-out" : "animate-slide-in"
            } ${
              notification.type === "success"
                ? "bg-white border-green-500"
                : "bg-white border-red-500"
            }`}
          >
            <div className="flex p-4">
              <div
                className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {notification.type === "success" ? (
                  <Check size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <div className="ml-3 flex-1">
                <h3
                  className={`text-sm leading-5 font-medium ${
                    notification.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {notification.type === "success" ? "Success" : "Error"}
                </h3>
                <p
                  className={`mt-1 text-sm leading-5 ${
                    notification.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {notification.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={dismissNotification}
                  className={`inline-flex text-gray-400 hover:${
                    notification.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  } focus:outline-none`}
                >
                  <EyeOff size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-red-900 mb-6">Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-red-600 mb-1"
          >
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-red-400" />
            </div>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border ${
                errors.currentPassword ? "border-red-500" : "border-red-200"
              } rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500`}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600"
              onClick={() => togglePasswordVisibility("current")}
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-red-600 mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-red-400" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border ${
                errors.newPassword ? "border-red-500" : "border-red-200"
              } rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500`}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}

          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">
                  Password Strength:
                </span>
                <span
                  className={`text-xs ${
                    passwordStrength < 40
                      ? "text-red-500"
                      : passwordStrength < 70
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {getStrengthLabel(passwordStrength)}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStrengthColor(
                    passwordStrength
                  )} transition-all duration-300 ease-in-out`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="mt-3 space-y-2">
            <p className="text-xs text-gray-500">Your password must include:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {passwordRequirements.map((req) => (
                <li key={req.id} className="flex items-center text-xs">
                  {formData.newPassword && req.test(formData.newPassword) ? (
                    <Check
                      size={14}
                      className="text-green-500 mr-1 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 mr-1.5 flex-shrink-0" />
                  )}
                  <span
                    className={
                      formData.newPassword && req.test(formData.newPassword)
                        ? "text-green-700"
                        : "text-gray-600"
                    }
                  >
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-red-600 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-red-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-red-200"
              } rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500`}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
          {formData.confirmPassword &&
            formData.newPassword === formData.confirmPassword &&
            !errors.newPassword && (
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <Check size={14} className="mr-1" /> Passwords match
              </p>
            )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-2.5 px-4 rounded-md text-white font-medium ${
            isSubmitting
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          } transition-colors duration-200`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordComponent;
