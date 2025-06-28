import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './floatingButton.css'; // We'll create this CSS file

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Replace these with your actual contact details
  const contactInfo = {
    phone: '+919876543210', // Replace with your phone number
    whatsapp: '+919876543210', // Replace with your WhatsApp number
    email: 'info@yourcompany.com' // Replace with your email
  };

  const handleCall = () => {
    window.open(`tel:${contactInfo.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = 'Hello! I would like to know more about your services.';
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleContactUs = () => {
    navigate('/home/contact-us');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-contact-container">
      {/* Main toggle button */}
      <button 
        className={`floating-main-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Contact options"
      >
        <i className={`icofont-${isOpen ? 'close' : 'phone'}`}></i>
      </button>

      {/* Contact options */}
      <div className={`floating-options ${isOpen ? 'show' : ''}`}>
        <button 
          className="floating-btn whatsapp-btn"
          onClick={handleWhatsApp}
          title="WhatsApp"
        >
          <i className="icofont-brand-whatsapp"></i>
        </button>

        <button 
          className="floating-btn call-btn"
          onClick={handleCall}
          title="Call Us"
        >
          <i className="icofont-phone"></i>
        </button>

        <button 
          className="floating-btn contact-btn"
          onClick={handleContactUs}
          title="Contact Us"
        >
          <i className="icofont-envelope"></i>
        </button>
      </div>
    </div>
  );
};

export default FloatingContactButtons;