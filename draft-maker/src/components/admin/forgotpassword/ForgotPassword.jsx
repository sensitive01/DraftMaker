import { useState } from "react";
import { ArrowLeft, Lock, Mail, Phone, User, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [contactMethod, setContactMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSendOtp = () => {
    if (contactMethod === "email" && !email) {
      alert("Please enter your email address");
      return;
    }
    if (contactMethod === "phone" && !phone) {
      alert("Please enter your phone number");
      return;
    }

    console.log("Sending OTP to:", contactMethod === "email" ? email : phone);

    setIsOtpSent(true);
    setCurrentStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp.some((digit) => digit === "")) {
      alert("Please enter the complete OTP");
      return;
    }

    console.log("Verifying OTP:", otp.join(""));

    setCurrentStep(3);
  };

  const handleResetPassword = () => {
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    console.log("Resetting password");

    setCurrentStep(4);
  };

  const handleBackToLogin = () => {
    setCurrentStep(1);
    setIsOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
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

        <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <button
              onClick={() =>
                currentStep > 1
                  ? setCurrentStep(currentStep - 1)
                  : handleBackToLogin()
              }
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
              {currentStep === 1 && "Forgot Password"}
              {currentStep === 2 && "Verify OTP"}
              {currentStep === 3 && "Reset Password"}
              {currentStep === 4 && "Success"}
            </h2>

            <p className="text-center text-sm text-gray-500 mb-6">
              {currentStep === 1 &&
                "Enter your email or phone number to receive a verification code"}
              {currentStep === 2 &&
                `We sent a 6-digit code to ${
                  contactMethod === "email" ? email : phone
                }`}
              {currentStep === 3 && "Create a new password for your account"}
              {currentStep === 4 && "Your password has been reset successfully"}
            </p>
          </div>

          <div className="px-6 mb-6">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                      step < currentStep
                        ? "bg-green-500 text-white"
                        : step === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <div className="text-xs mt-1 text-gray-500">
                    {step === 1 && "Request"}
                    {step === 2 && "Verify"}
                    {step === 3 && "Reset"}
                    {step === 4 && "Done"}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative flex items-center mt-2">
              <div className="flex-grow h-0.5 bg-gray-200">
                <div
                  className="h-0.5 bg-blue-600 transition-all"
                  style={{ width: `${(currentStep - 1) * 33.3}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex rounded-md shadow-sm w-full mb-4">
                  <button
                    type="button"
                    onClick={() => setContactMethod("email")}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none ${
                      contactMethod === "email"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod("phone")}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none ${
                      contactMethod === "phone"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Phone
                  </button>
                </div>

                {contactMethod === "email" && (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {contactMethod === "phone" && (
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Verification Code
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                    Enter the 6-digit verification code
                  </label>
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        className="w-10 h-12 text-center text-lg font-bold border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setIsOtpSent(false);
                      setTimeout(() => setIsOtpSent(true), 500);
                    }}
                  >
                    Didn't receive the code? Resend
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Verify Code
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                  </div>
                </div>

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
                      type="password"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="text-sm text-red-600">{passwordError}</div>
                )}

                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset Password
                </button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-6">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Your password has been reset successfully. You can now login
                  with your new password.
                </p>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
