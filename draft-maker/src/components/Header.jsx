import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import draftMakerLogo from "../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header-wrapper">
      <header className="main-header" style={{ background: "white" }}>
        {/* Running Message Banner */}
        <div className="running-message-banner">
          <div className="running-message">
            <i className="icofont-info-circle notification-icon"></i>
            <span className="message-text">Services only available in Karnataka</span>
            <i className="icofont-info-circle notification-icon"></i>
            <span className="message-text">Services only available in Karnataka</span>
            <i className="icofont-info-circle notification-icon"></i>
            <span className="message-text">Services only available in Karnataka</span>
          </div>
        </div>
        <div className="container">
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
                <li className="nav-item has_dropdown">
                  <a className="nav-link" href="#">
                    Document Drafting
                  </a>
                  <span className="drp_btn">
                    <i className="icofont-rounded-down"></i>
                  </span>
                  <div className="sub_menu scrollable-submenu">
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
                <li className="nav-item has_dropdown">
                  <a className="nav-link" href="#">
                    Newspaper Ad
                  </a>
                  <span className="drp_btn">
                    <i className="icofont-rounded-down"></i>
                  </span>
                  <div className="sub_menu">
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
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          Others
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item has_dropdown">
                  <a className="nav-link" href="#">
                    In-Shop Services
                  </a>
                  <span className="drp_btn">
                    <i className="icofont-rounded-down"></i>
                  </span>
                  <div className="sub_menu">
                    <ul>
                      <li>
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          Notary Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          Police Verification Certificate
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          Passport Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          PAN Card Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          Voter ID Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          onClick={closeMenu}
                        >
                          Jeevan Pramaan Certificate
                        </Link>
                      </li>
                    </ul>
                  </div>
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
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
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

          /* Ensure submenu items have proper spacing */
          .scrollable-submenu ul {
            margin: 0;
            padding: 0;
          }

          .scrollable-submenu ul li {
            list-style: none;
            border-bottom: 1px solid #eee;
          }

          .scrollable-submenu ul li:last-child {
            border-bottom: none;
          }

          .scrollable-submenu ul li a {
            display: block;
            padding: 12px 16px;
            text-decoration: none;
            color: #333;
            transition: background-color 0.3s ease;
          }

          .scrollable-submenu ul li a:hover {
            background-color: #f8f9fa;
            color: #007bff;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .submenu-scroll-container {
              max-height: 300px;
            }
          }
        `}</style>
      </header>
    </div>
  );
};

export default Header;