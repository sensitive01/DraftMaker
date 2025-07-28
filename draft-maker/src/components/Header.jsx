import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import draftMakerLogo from "../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close all dropdowns when main menu is toggled
    setActiveDropdown(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="header-wrapper">
      <header className="main-header" style={{ background: "white" }}>
        {/* Running Message Banner */}
        <div className="running-message-banner">
          <div className="running-message">
            <i className="icofont-info-circle notification-icon"></i>
            <span className="message-text">
              Services only available in Karnataka
            </span>
            <i className="icofont-info-circle notification-icon"></i>
            <span className="message-text">
              Services only available in Karnataka
            </span>
            <i className="icofont-info-circle notification-icon"></i>
            <span className="message-text">
              Services only available in Karnataka
            </span>
          </div>
        </div>
        <div className="ml-7 mr-3">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/" onClick={closeMenu}>
              <img src={draftMakerLogo} alt="Draft Maker" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarSupportedContent"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <div className="toggle-wrap">
                  <span className="toggle-bar"></span>
                </div>
              </span>
            </button>

            <div
              className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/" onClick={closeMenu}>
                    <i className="icofont-home"></i>
                  </Link>
                </li>

                {/* Document Drafting Dropdown */}
                <li className="nav-item has_dropdown">
                  <a
                    className="nav-link dropdown-toggle-custom"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("documents");
                    }}
                  >
                    Document Drafting
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("documents")}
                  >
                    <i
                      className={`icofont-rounded-down ${
                        activeDropdown === "documents" ? "rotate-180" : ""
                      }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu scrollable-submenu ${
                      activeDropdown === "documents" ? "show-dropdown" : ""
                    }`}
                  >
                    <div className="submenu-scroll-container">
                      <ul>
                        <li>
                          <Link
                            to="/documents/rental/residential-lease"
                            onClick={closeMenu}
                          >
                            Residential Rental/Lease Agreement
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/commercial/commercial-lease"
                            onClick={closeMenu}
                          >
                            Commercial Rental/Lease Agreement
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/address/addressaffadavit"
                            onClick={closeMenu}
                          >
                            Address Proof Affidavit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/dual-name/dual-name-correction"
                            onClick={closeMenu}
                          >
                            Dual Name/ One and the Same
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/name/name-correction"
                            onClick={closeMenu}
                          >
                            Name Change
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/dob/dob-correction"
                            onClick={closeMenu}
                          >
                            DOB Mismatch
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/gas/gas-document"
                            onClick={closeMenu}
                          >
                            Gas Voucher Lost
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/document-lost/document-lost-correction"
                            onClick={closeMenu}
                          >
                            Document Lost Declaration
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/birth-certificate-parent/birth-certificate-parent-name-correction"
                            onClick={closeMenu}
                          >
                            Birth Certificate Parent's Name Correction
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/birth-certificate/birth-certificate-correction"
                            onClick={closeMenu}
                          >
                            Birth Certificate Name Change
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/gst/gst-document"
                            onClick={closeMenu}
                          >
                            GST NOC Premises by Owner
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/metriculation/metriculation-document"
                            onClick={closeMenu}
                          >
                            Matriculation Certificate Lost
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/khata-transfer/khata-transfer-document"
                            onClick={closeMenu}
                          >
                            Khata Transfer
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/vehicle-insurance/vehicle-insurance-claiming"
                            onClick={closeMenu}
                          >
                            Vehicle Insurance Claiming
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/huf/huf-aggrement"
                            onClick={closeMenu}
                          >
                            HUF PAN Deed
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/gap-period/gap-period"
                            onClick={closeMenu}
                          >
                            Gap Period Tata
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/passport-annaxure/passport-annaxure"
                            onClick={closeMenu}
                          >
                            Passport Annexure-F
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/documents/passport-name/passport-name-change"
                            onClick={closeMenu}
                          >
                            Passport Name Change
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/documents/buy-e-stamp"
                    onClick={closeMenu}
                  >
                    Buy E-Stamp
                  </Link>
                </li>

                {/* Newspaper Ad Dropdown */}
                <li className="nav-item has_dropdown">
                  <a
                    className="nav-link dropdown-toggle-custom"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("newspaper");
                    }}
                  >
                    Newspaper Ad
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("newspaper")}
                  >
                    <i
                      className={`icofont-rounded-down ${
                        activeDropdown === "newspaper" ? "rotate-180" : ""
                      }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu ${
                      activeDropdown === "newspaper" ? "show-dropdown" : ""
                    }`}
                  >
                    <ul>
                      <li>
                        <Link
                          to="/documents/passport-name/passport-name-change"
                          onClick={closeMenu}
                        >
                          Passport Name Change
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          Others
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* In-Shop Services Dropdown */}
                <li className="nav-item has_dropdown">
                  <a
                    className="nav-link dropdown-toggle-custom"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("services");
                    }}
                  >
                    In-Shop Services
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("services")}
                  >
                    <i
                      className={`icofont-rounded-down ${
                        activeDropdown === "services" ? "rotate-180" : ""
                      }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu ${
                      activeDropdown === "services" ? "show-dropdown" : ""
                    }`}
                  >
                    <ul>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          Notary Services
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          Police Verification Certificate
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          Passport Services
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          PAN Card Services
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          Voter ID Services
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={closeMenu}>
                          Jeevan Pramaan Certificate
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item active">
                  <Link
                    className="nav-link dark_btn"
                    to="/documents/upload-document"
                    onClick={closeMenu}
                  >
                    Upload Document{" "}
                    <i
                      className="icofont-upload-alt"
                      style={{ color: "white" }}
                    ></i>
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link
                    className="nav-link dark_btn"
                    to="/documents/track-my-documents"
                    onClick={closeMenu}
                  >
                    Track Order <i className="icofont-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <style jsx>{`
          /* Header Wrapper */
          .header-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            width: 100%;
          }

          .main-header {
            position: relative;
            width: 100%;
          }

          /* Running Message Banner Styles */
          .running-message-banner {
            color: red;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
          }

          .running-message {
            display: inline-flex;
            align-items: center;
            height: 100%;
            animation: scroll-left 15s linear infinite;
            padding-left: 100%;
          }

          .notification-icon {
            color: red;
            font-size: 16px;
            margin-right: 8px;
            animation: pulse 2s infinite;
          }

          .message-text {
            font-weight: 500;
            font-size: 14px;
            margin-right: 40px;
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }

          /* Dropdown Toggle Custom Styles */
          .dropdown-toggle-custom {
            cursor: pointer;
          }

          .drp_btn {
            cursor: pointer;
            transition: transform 0.3s ease;
          }

          .drp_btn i {
            transition: transform 0.3s ease;
          }

          .rotate-180 {
            transform: rotate(180deg);
          }

          /* Submenu Styles */
          .scrollable-submenu {
            position: relative;
          }

          .submenu-scroll-container {
            max-height: 400px;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 5px;
          }

          .submenu-scroll-container::-webkit-scrollbar {
            width: 6px;
          }

          .submenu-scroll-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          .submenu-scroll-container::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }

          .submenu-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }

          /* For Firefox */
          .submenu-scroll-container {
            scrollbar-width: thin;
            scrollbar-color: #c1c1c1 #f1f1f1;
          }

          /* Desktop Dropdown Behavior */
          @media (min-width: 992px) {
            .has_dropdown:hover .sub_menu {
              display: block !important;
              opacity: 1;
              visibility: visible;
            }
          }

          /* Mobile Dropdown Behavior */
          @media (max-width: 991px) {
            .sub_menu {
              display: none;
              position: static !important;
              box-shadow: none !important;
              background: #f8f9fa !important;
              margin-top: 0;
              border-radius: 0;
              width: 100% !important;
              left: 0 !important;
              transform: none !important;
            }

            .sub_menu.show-dropdown {
              display: block !important;
              animation: slideDown 0.3s ease-in-out;
            }

            .submenu-scroll-container {
              max-height: 300px;
            }

            .has_dropdown {
              border-bottom: 1px solid #eee;
            }

            .drp_btn {
              position: absolute;
              right: 15px;
              top: 50%;
              transform: translateY(-50%);
              padding: 5px;
            }

            .nav-link {
              padding-right: 40px !important;
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 500px;
            }
          }

          /* Ensure submenu items have proper spacing */
          .sub_menu ul {
            margin: 0;
            padding: 0;
          }

          .sub_menu ul li {
            list-style: none;
            border-bottom: 1px solid #eee;
          }

          .sub_menu ul li:last-child {
            border-bottom: none;
          }

          .sub_menu ul li a {
            display: block;
            padding: 12px 16px;
            text-decoration: none;
            color: #333;
            transition: background-color 0.3s ease;
          }

          .sub_menu ul li a:hover {
            background-color: #f8f9fa;
            color: #007bff;
          }

          /* Responsive adjustments for running message */
          @media (max-width: 768px) {
            .running-message-banner {
              height: 35px;
            }
            .message-text {
              font-size: 12px;
            }
            .notification-icon {
              font-size: 14px;
            }
          }
        `}</style>
      </header>
    </div>
  );
};

export default Header;
