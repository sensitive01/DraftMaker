import { useState } from "react";
import { Link } from "react-router-dom";
import draftMakerLogo from "../assets/images/logo.png";

const Header = () => {
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
                        Adress Affadavit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/dual-name/dual-name-correction"
                        onClick={closeMenu}
                      >
                        Dual Name One and The Same
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/name/name-corrections"
                        onClick={closeMenu}
                      >
                        Name change
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/dob/dob-correction"
                        onClick={closeMenu}
                      >
                        DOB MISMATCH
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/gas/gas-document"
                        onClick={closeMenu}
                      >
                        GAS VOUCHER LOST
                      </Link>
                    </li>
                    <li>
                      <Link to="" onClick={closeMenu}>
                        DOCUMENT LOST DECLARATION
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/birth-certificate-parent/birth-certificate-parent-name-correction"
                        onClick={closeMenu}
                      >
                        BIRTH CERTIFICATE PARENTS NAME CORRECTION
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/birth-certificate/birth-certificate-correction"
                        onClick={closeMenu}
                      >
                        BIRTH CERTIFICATE NAME CHANGE
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/gst/gst-document"
                        onClick={closeMenu}
                      >
                        GST NOC PREMISES BY OWNER
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/metriculation/metriculation-document"
                        onClick={closeMenu}
                      >
                        Matriculation certificate lost
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
                        Vehicle insurance claiming
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/huf/huf-aggrement"
                        onClick={closeMenu}
                      >
                        HUF
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/documents/gap-period/gap-period"
                        onClick={closeMenu}
                      >
                        GAP PERIOD TATA
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
                        Passport name change
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
                <Link className="nav-link dark_btn" to="#" onClick={closeMenu}>
                  Contact Us <i className="icofont-arrow-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
