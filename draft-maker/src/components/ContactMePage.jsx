import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { sendMessage } from "../api/service/axiosService";

const ContactMePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showErrorMessage = (msg) => {
    setErrorMessage(msg);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setErrorMessage("");
    }, 5000);
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !message.trim()
    ) {
      showErrorMessage("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showErrorMessage("Please enter a valid email address.");
      return;
    }

    // Basic phone validation
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      showErrorMessage("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendMessage(
        formData.name,
        formData.email,
        formData.phone,
        message,
      );

      if (response.status === 201) {
        showSuccessMessage();
        // Reset form
        setFormData({ name: "", email: "", phone: "" });
        setMessage("");
      } else {
        showErrorMessage("Failed to submit message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      showErrorMessage(
        "An error occurred while sending your message. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="text-white py-16" style={{ background: "#770000" }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <nav className="text-sm">
            <span className="opacity-80">Home</span>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16" style={{ background: "white" }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Information */}
            <div className="text-red">
              {/* Header */}
              <div className="flex items-center mb-6">
                <Phone className="w-6 h-6 mr-3" style={{ color: "#770000" }} />
                <h2 className="text-3xl font-bold" style={{ color: "#770000" }}>
                  Get in Touch
                </h2>
              </div>

              {/* Main Heading */}
              <h1
                className="text-4xl lg:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#770000" }}
              >
                CONTACT US NOW!
              </h1>

              {/* Description */}
              <p className="text-black mb-8 leading-relaxed">
                Draft Maker is your trusted partner for all your drafting and
                design needs. We provide professional services with excellent
                quality. Get in touch with us for all your requirements — we're
                here to help you with precision and creativity.
              </p>

              {/* Contact Details */}
              <div className="space-y-8 mb-8">
                {/* Office Location */}
                <div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#ffa500" }}
                  >
                    Draft Maker Office
                  </h3>
                  <p className="text-black leading-relaxed">
                    No 5, 1st floor, Site no 200, Muniraju Complex, Panathur
                    Main Road, Kadubisanahalli, Bengaluru, Karnataka-560103
                  </p>
                  <div className="flex items-center mt-2 text-black">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>10.30 AM - 6 PM, Monday - Saturday</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ background: "#770000" }}
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p style={{ color: "red" }}>Email</p>
                      <p style={{ color: "red" }}>info@draftmaker.in</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ background: "#770000" }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p style={{ color: "red" }}>Phone</p>
                      <p style={{ color: "red" }}>
                        <a href="tel:+91 9008774711" style={{ color: "red" }}>
                          (+91) 9008774711
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
                    style={{ background: "#770000" }}
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Draft Maker
                  </h3>
                  <p className="text-gray-600">Send us your requirements</p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <div
                    className="border text-white px-4 py-3 rounded mb-6"
                    style={{ background: "#770000", borderColor: "#550000" }}
                  >
                    <p className="font-semibold">Success!</p>
                    <p>
                      Your message has been sent successfully. We'll get back to
                      you soon!
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {showError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p className="font-semibold">Error!</p>
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name*"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{ "--tw-ring-color": "#770000" }}
                      disabled={isLoading}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Mail Address*"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{ "--tw-ring-color": "#770000" }}
                      disabled={isLoading}
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone*"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{ "--tw-ring-color": "#770000" }}
                    disabled={isLoading}
                  />

                  <textarea
                    placeholder="Your Requirements*"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none resize-vertical"
                    style={{ "--tw-ring-color": "#770000" }}
                    disabled={isLoading}
                  ></textarea>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:bg-gray-400"
                    style={{ background: isLoading ? "#999999" : "#770000" }}
                    onMouseOver={(e) =>
                      !isLoading && (e.target.style.background = "#550000")
                    }
                    onMouseOut={(e) =>
                      !isLoading && (e.target.style.background = "#770000")
                    }
                  >
                    {isLoading ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMePage;
