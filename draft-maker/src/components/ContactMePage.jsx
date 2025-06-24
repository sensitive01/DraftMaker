import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
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
        message
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
        "An error occurred while sending your message. Please try again later."
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Contact Section Header */}
        <div className="text-center mb-12">
          <p
            className="font-semibold text-sm uppercase tracking-wide mb-2"
            style={{ color: "#770000" }}
          >
            CONTACT
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            Get In <span style={{ color: "#770000" }}>Touch</span>
          </h2>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#770000" }}
            >
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Draft Maker</h3>
            <p className="text-gray-600">Kadubeesanahalli</p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#770000" }}
            >
              <Mail className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">info@draftmaker.in</p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#770000" }}
            >
              <Phone className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">+91 9008774711</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Send us a Message
            </h3>

            {/* Success Message */}
            {showSuccess && (
              <div
                className="border text-white px-4 py-3 rounded mb-6"
                style={{ background: "#770000", borderColor: "#550000" }}
              >
                <p className="font-semibold">Success!</p>
                <p>
                  Your message has been sent successfully. We'll get back to you
                  soon!
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
                placeholder="Your Message*"
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
                className="w-full text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
                style={{ background: isLoading ? "#999999" : "#770000" }}
                onMouseOver={(e) =>
                  !isLoading && (e.target.style.background = "#550000")
                }
                onMouseOut={(e) =>
                  !isLoading && (e.target.style.background = "#770000")
                }
              >
                {isLoading ? "Submitting..." : "Submit Message"}
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.3174687726!2d77.69890269999999!3d12.9383209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13287dc4a509%3A0x3487ef268a483d31!2sRental%20Agreement%20E%20stamp%20Notary%20Pan%20Card%20Passport%20Jeevan%20Pramaan%20Aadhaar%20Pan%20Linking!5e0!3m2!1sen!2sin!4v1719155200000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Draft Maker Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMePage;
