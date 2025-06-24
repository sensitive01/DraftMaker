import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import draftMakerLogo from "../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };



  return (
    <header className="fixed">
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
                  Home
                </Link>
              </li>
              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">
                  Rental / Lease Agreements
                </a>
                <span className="drp_btn">
                  <i className="icofont-rounded-down"></i>
                </span>
                <div className="sub_menu">
                  <ul>
                    <li>
                      <Link
                        to="/documents/rental/residential-lease"
                        onClick={closeMenu}
                      >
                        Residential
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/commercial/commercial-lease"
                        onClick={closeMenu}
                      >
                        Commercial
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">
                  Affidavits
                </a>
                <span className="drp_btn">
                  <i className="icofont-rounded-down"></i>
                </span>
                <div className="sub_menu">
                  <ul>
                    <li>
                      <Link
                        to="/documents/address/addressaffadavit"
                        onClick={closeMenu}
                      >
                        Address Affidavit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/dual-name/dual-name-correction"
                        onClick={closeMenu}
                      >
                        Dual Name One and the Same
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
                      <Link to="/documents/document-lost/document-lost-correction" onClick={closeMenu}>
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
                        HUF Agreement
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
              </li>

              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">
                  E-Stamp
                </a>
                <span className="drp_btn">
                  <i className="icofont-rounded-down"></i>
                </span>
                <div className="sub_menu">
                  <ul>
                    <li>
                      <Link to="/documents/buy-e-stamp" onClick={closeMenu}>
                        Buy E-Stamp Paper
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link dark_btn"
                  to="/documents/track-my-documents"
                  onClick={closeMenu}
                >
                  Track <i className="icofont-arrow-right"></i>
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link dark_btn" onClick={()=>navigate("/home/contact-us")}>
                  Contact Us <i className="icofont-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;