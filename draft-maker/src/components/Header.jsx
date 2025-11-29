import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import draftMakerLogo from "../assets/images/logo.png";
import { getDocumentName } from "../api/service/axiosService";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [visibleDocuments, setVisibleDocuments] = useState([]);

  // Static document configuration with API mapping
  const documentConfig = [
    {
      id: 1,
      title: "Residential Rental/Lease Agreement",
      path: "/documents/rental/residential-lease",
      apiTitle: "Rental Agreement (residential)",
      category: "agreement",
    },
    {
      id: 2,
      title: "Commercial Rental/Lease Agreement",
      path: "/documents/commercial/commercial-lease",
      apiTitle: "Rental Agreement  (commercial)",
      category: "agreement",
    },
    {
      id: 3,
      title: "Address Proof Affidavit",
      path: "/documents/address/addressaffadavit",
      apiTitle: "Address Proof Affidavit",
      category: "affidavit",
    },
    {
      id: 4,
      title: "Dual Name/ One and the Same",
      path: "/documents/dual-name/dual-name-correction",
      apiTitle: "Dual Name Change",
      category: "affidavit",
    },
    {
      id: 5,
      title: "Name Change",
      path: "/documents/name/name-correction",
      apiTitle: "Name Correction Change",
      category: "affidavit",
    },
    {
      id: 6,
      title: "DOB Mismatch",
      path: "/documents/dob/dob-correction",
      apiTitle: "Date Of Birth Correction",
      category: "affidavit",
    },
    {
      id: 7,
      title: "Gas Voucher Lost",
      path: "/documents/gas/gas-document",
      apiTitle: "Gas",
      category: "affidavit",
    },
    {
      id: 8,
      title: "Document Lost Declaration",
      path: "/documents/document-lost/document-lost-correction",
      apiTitle: "Document Lost",
      category: "affidavit",
    },
    {
      id: 9,
      title: "Birth Certificate Parent's Name Correction",
      path: "/documents/birth-certificate-parent/birth-certificate-parent-name-correction",
      apiTitle: "Birth Cert Name Correction Minor Parents",
      category: "affidavit",
    },
    {
      id: 10,
      title: "Birth Certificate Name Change",
      path: "/documents/birth-certificate/birth-certificate-correction",
      apiTitle: "Birth Cert Minor Name Correction",
      category: "affidavit",
    },
    {
      id: 11,
      title: "GST NOC Premises by Owner",
      path: "/documents/gst/gst-document",
      apiTitle: "Gst Noc By Owner",
      category: "affidavit",
    },
    {
      id: 12,
      title: "Matriculation Certificate Lost",
      path: "/documents/metriculation/metriculation-document",
      apiTitle: "Matriculation Certificate Lost",
      category: "affidavit",
    },
    {
      id: 13,
      title: "Khata Transfer",
      path: "/documents/khata-transfer/khata-transfer-document",
      apiTitle: "Joint Khata Transfer",
      category: "affidavit",
    },
    {
      id: 14,
      title: "Vehicle Insurance Claiming",
      path: "/documents/vehicle-insurance/vehicle-insurance-claiming",
      apiTitle: "Vehicle Insurance Claiming",
      category: "affidavit",
    },
    {
      id: 15,
      title: "HUF PAN Deed",
      path: "/documents/huf/huf-aggrement",
      apiTitle: "Huf Correction",
      category: "affidavit",
    },
    {
      id: 16,
      title: "Gap Period Tata",
      path: "/documents/gap-period/gap-period",
      apiTitle: "Gap Period",
      category: "affidavit",
    },
    {
      id: 17,
      title: "Passport Annexure-F",
      path: "/documents/passport-annaxure/passport-annaxure",
      apiTitle: "Passport Annexure F",
      category: "affidavit",
    },
    {
      id: 18,
      title: "Passport Name Change",
      path: "/documents/passport-name/passport-name-change",
      apiTitle: "Passport Name Change",
      category: "affidavit",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocumentName();
        console.log("Response documents service", response.data.data);

        if (response.status === 200) {
          const visibleDocs = documentConfig.filter((doc) => {
            const apiDoc = response.data.data.find(
              (apiItem) =>
                apiItem.documentType === doc.apiTitle && apiItem.status === true
            );
            return apiDoc !== undefined;
          });

          setVisibleDocuments(visibleDocs);
        }
      } catch (error) {
        console.error("Error fetching document data:", error);
        // Fallback to show all documents if API fails
        setVisibleDocuments(documentConfig);
      }
    };

    fetchData();
  }, []);

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

  // Function to render agreement documents (Residential and Commercial)
  const renderAgreementLinks = () => {
    const agreements = visibleDocuments.filter(
      (doc) => doc.category === "agreement"
    );
    return agreements.map((doc) => (
      <li key={doc.id}>
        <Link to={doc.path} onClick={closeMenu}>
          {doc.title}
        </Link>
      </li>
    ));
  };

  // Function to render affidavit documents (all others)
  const renderAffidavitLinks = () => {
    const affidavits = visibleDocuments.filter(
      (doc) => doc.category === "affidavit"
    );
    return affidavits.map((doc) => (
      <li key={doc.id}>
        <Link to={doc.path} onClick={closeMenu}>
          {doc.title}
        </Link>
      </li>
    ));
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

                {/* Agreements Dropdown */}
                <li className="nav-item has_dropdown">
                  <a
                    className="nav-link dropdown-toggle-custom"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("agreements");
                    }}
                  >
                    Rental/Lease Agreement
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("agreements")}
                  >
                    <i
                      className={`icofont-rounded-down ${activeDropdown === "agreements" ? "rotate-180" : ""
                        }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu ${activeDropdown === "agreements" ? "show-dropdown" : ""
                      }`}
                  >
                    <ul>
                      {visibleDocuments.filter(
                        (doc) => doc.category === "agreement"
                      ).length > 0 ? (
                        renderAgreementLinks()
                      ) : (
                        <li>
                          <span
                            style={{
                              padding: "12px 16px",
                              display: "block",
                              color: "#666",
                            }}
                          >
                            Loading agreements...
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>

                {/* Affidavits Dropdown */}
                <li className="nav-item has_dropdown">
                  <a
                    className="nav-link dropdown-toggle-custom"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("affidavits");
                    }}
                  >
                    Affidavits
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("affidavits")}
                  >
                    <i
                      className={`icofont-rounded-down ${activeDropdown === "affidavits" ? "rotate-180" : ""
                        }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu scrollable-submenu ${activeDropdown === "affidavits" ? "show-dropdown" : ""
                      }`}
                  >
                    <div className="submenu-scroll-container">
                      <ul>
                        {visibleDocuments.filter(
                          (doc) => doc.category === "affidavit"
                        ).length > 0 ? (
                          renderAffidavitLinks()
                        ) : (
                          <li>
                            <span
                              style={{
                                padding: "12px 16px",
                                display: "block",
                                color: "#666",
                              }}
                            >
                              Loading affidavits...
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/documents/home/buy-e-stamp"
                    onClick={closeMenu}
                  >
                    Buy E-Stamp
                  </Link>

                </li>

                {/* Services Dropdown (formerly Newspaper Ad) */}
                <li className="nav-item has_dropdown">
                  <a
                    className="nav-link dropdown-toggle-custom"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("services");
                    }}
                  >
                    Services
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("services")}
                  >
                    <i
                      className={`icofont-rounded-down ${activeDropdown === "services" ? "rotate-180" : ""
                        }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu ${activeDropdown === "services" ? "show-dropdown" : ""
                      }`}
                  >
                    <ul>
                      {/* Passport Name Change with pricing */}
                      {visibleDocuments.find(
                        (doc) => doc.apiTitle === "Passport Name Change"
                      ) && (
                          <li>
                            <Link to="/home/contact-us" onClick={closeMenu}>
                              News Paper Ad (Passport Name Change - Rs 3000)
                            </Link>
                          </li>
                        )}
                      {/* HUF Deed and Pan with pricing */}
                      {visibleDocuments.find(
                        (doc) => doc.apiTitle === "Huf Correction"
                      ) && (
                          <li>
                            <Link to="/home/contact-us" onClick={closeMenu}>
                              HUF Deed and PAN - Rs 1500
                            </Link>
                          </li>
                        )}
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
                      toggleDropdown("inShopServices");
                    }}
                  >
                    In-Shop Services
                  </a>
                  <span
                    className="drp_btn"
                    onClick={() => toggleDropdown("inShopServices")}
                  >
                    <i
                      className={`icofont-rounded-down ${activeDropdown === "inShopServices" ? "rotate-180" : ""
                        }`}
                    ></i>
                  </span>
                  <div
                    className={`sub_menu ${activeDropdown === "inShopServices" ? "show-dropdown" : ""
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
                    to="/documents/home/upload-document"
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

          /* Navigation Layout - Keep consistent height */
          .navbar {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            min-height: 60px;
          }

          .navbar-nav {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
          }

          .nav-item {
            display: flex;
            align-items: center;
          }

          .nav-link {
            padding: 0.5rem 0.75rem !important;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.2;
            transition: all 0.3s ease;
            border-radius: 6px;
            display: flex;
            align-items: center;
            height: 40px;
            white-space: nowrap;
          }

          .nav-link:hover {
            background-color: #f8f9fa;
            color: #007bff !important;
            text-decoration: none;
          }

          /* Dark Button Styles - Same height as nav links */
          .dark_btn {
            background: #dc3545 !important; /* Red color for both buttons */
            color: white !important;
            border-radius: 25px !important; /* Pill-shaped rounded corners */
            font-weight: 600 !important;
            padding: 0.6rem 1.2rem !important;
            height: 40px !important;
            font-size: 13px !important;
            line-height: 1.2 !important;
            margin-left: 0.25rem !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.4rem !important;
            border: none !important;
            min-width: 140px !important;
            justify-content: center !important;
          }

          .dark_btn:hover {
            background: #c82333 !important; /* Darker red on hover */
            color: white !important;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);
            text-decoration: none;
          }

          .nav-item:last-child .dark_btn {
            background: #dc3545 !important; /* Same red color for Track Order */
          }

          .nav-item:last-child .dark_btn:hover {
            background: #c82333 !important; /* Same hover effect */
            box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);
          }

          .dark_btn i {
            font-size: 12px;
            margin-left: 0.25rem;
          }

          /* Dropdown Toggle Custom Styles */
          .dropdown-toggle-custom {
            cursor: pointer;
          }

          .drp_btn {
            cursor: pointer;
            transition: transform 0.3s ease;
            margin-left: 0.25rem;
            padding: 0.125rem;
          }

          .drp_btn i {
            transition: transform 0.3s ease;
            font-size: 12px;
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

            .dark_btn {
              height: auto !important;
              width: 100% !important;
              justify-content: center !important;
              margin: 0.5rem 0 !important;
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
