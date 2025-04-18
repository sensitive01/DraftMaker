import { useState } from 'react';
import { Link } from 'react-router-dom';
import draftMakerLogo from "../assets/images/logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
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

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">Rental / Lease Agreements</a>
                <span className="drp_btn"><i className="icofont-rounded-down"></i></span>
                <div className="sub_menu">
                  <ul>
                    <li><Link to="/rental-aggrement">Residential</Link></li>
                    <li><Link to="/commercial-aggrement">Commercial</Link></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">Affidavits</a>
                <span className="drp_btn"><i className="icofont-rounded-down"></i></span>
                <div className="sub_menu">
                  <ul>
                    <li><Link to="/document">Dual Name One and The Same</Link></li>
                    <li><Link to="/document">Name change</Link></li>
                    <li><Link to="/document">DOB MISMATCH</Link></li>
                    <li><Link to="/document">GAS VOUCHER LOST</Link></li>
                    <li><Link to="/document">DOCUMENT LOST DECLARATION</Link></li>
                    <li><Link to="/document">BIRTH CERTIFICATE PARENTS NAME CORRECTION</Link></li>
                    <li><Link to="/document">BIRTH CERTIFICATE NAME CHANGE</Link></li>
                    <li><Link to="/document">GST NOC PREMISES BY OWNER</Link></li>
                    <li><Link to="/document">Matriculation certificate lost</Link></li>
                    <li><Link to="/document">Khata Transfer</Link></li>
                    <li><Link to="/document">Vehicle insurance claiming</Link></li>
                    <li><Link to="/document">HUF</Link></li>
                    <li><Link to="/document">GAP PERIOD TATA</Link></li>
                    <li><Link to="/document">Passport Annexure-F</Link></li>
                    <li><Link to="/document">Passport name change</Link></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">Printing Services</a>
                <span className="drp_btn"><i className="icofont-rounded-down"></i></span>
                <div className="sub_menu">
                  <ul>
                    <li><Link to="/service-list-1">Draft Printing</Link></li>
                    <li><Link to="/service-list-2">E-Stamp Printing</Link></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">E-Stamp</a>
                <span className="drp_btn"><i className="icofont-rounded-down"></i></span>
                <div className="sub_menu">
                  <ul>
                    <li><Link to="/blog-list">Buy E-Stamp Paper</Link></li>
                    <li><Link to="/blog-detail">E-Stamp Printing</Link></li>
                    <li><Link to="/blog-detail">E-Stamp Drafting Services</Link></li>
                    <li><Link to="/blog-detail">Other E-Stamp Services</Link></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link dark_btn" to="/contact-us">Contact Us <i className="icofont-arrow-right"></i></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;