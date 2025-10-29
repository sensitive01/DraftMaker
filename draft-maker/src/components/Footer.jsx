import { Link } from "react-router-dom";
import animaeIng from "../assets/images/anim_line_2.png";
import contactImg from "../assets/images/new/contact_01.png";
import phoneImg from "../assets/images/new/contact_02.png";
import emailImg from "../assets/images/new/contact_03.png";
import logoImg from "../assets/images/logo.png";

const Footer = () => {
  // Function to handle map click - opens Google Maps in new tab

  return (
    <footer>
      <div className="top_footer" id="contact">
        {/* <div className="container">
          <div className="anim_line dark_bg">
            {[...Array(9)].map((_, index) => (
              <span key={index}>
                <img src={animaeIng} alt="anim_line" />
              </span>
            ))}
          </div>
        </div> */}

        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            {/* footer link 1 */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="abt_side">
                <div className="logo">
                  {" "}
                  <img src={logoImg} alt="image" />
                </div>
                <hr />
                <p align="justify">
                  Draft Maker is a Document drafting service provider with
                  printing and E-Stamping services in and around Bengaluru.
                </p>
                <div className="news_letter_block">
                  <form action="">
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control"
                      />
                      <button className="btn">
                        <i className="icofont-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* footer link 2 */}
            <div className="col-lg-2 col-md-6 col-12">
              <div className="links">
                <h3>Quick Links</h3>
                <hr />
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/home/all-about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/">Our Services</Link>
                  </li>
                  <li>
                    <Link to="/home/terms-and-conditions">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/home/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/home/refund-and-cancellation">
                      Refund Policy
                    </Link>
                  </li>

                  <li>
                    <Link to="/home/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/documents/track-my-documents">
                      Track Your Order
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* footer link 3 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="links">
                <h3>Services</h3>
                <hr />
                <ul>
                  <li>
                    <Link to="/documents/buy-e-stamp">Buy E-Stamp</Link>
                  </li>
                  <li>
                    <Link to="/documents/rental/residential-lease">
                      Document Drafting
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/rental/residential-lease">
                      Printing Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/rental/residential-lease">
                      Document Delivery
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/rental/residential-lease">
                      Notary Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents/rental/residential-lease">
                      PAN & Passport Services
                    </Link>
                  </li>
                  <li>
                    <Link to="#">Jeevan Pramaan </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* footer link 4 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="try_out">
                <h3>Contact us</h3>
                <hr />
                <ul>
                  <li>
                    <span className="icon">
                      <img
                        src={contactImg}
                        alt="image"
                        style={{ width: "150px" }}
                      />
                    </span>
                    <div className="text">
                      <p>
                        <span style={{ color: "yellow" }}>Visit us</span>
                        <br />
                        No 5, 1st floor, Site no 200, Muniraju Complex, Panathur
                        Main Road, Kadubisanahalli, Bengaluru, Karnataka-560103
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={phoneImg} alt="image" />
                    </span>
                    <div className="text">
                      <p>
                        <span style={{ color: "yellow" }}>Call us </span>
                        <a href="tel:+91 8088774711">
                          <span className="mr-1">(+91)</span> 8088774711
                        </a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={emailImg} alt="image" />
                    </span>
                    <div className="text">
                      <p>
                        <span style={{ color: "yellow" }}> Email us </span>

                        <a href="mailto:info@draftmaker.in">
                          info@draftmaker.in
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="full_width_map"
          style={{
            width: "100%",
            marginTop: "50px",
            background: "linear-gradient(135deg, #8B0000 0%, #8B0000 100%)",
            padding: "40px 0",
            borderTop: "3px solid #FFD700",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h3
                  style={{
                    marginBottom: "30px",
                    color: "#fff",
                    fontSize: "2.2rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Find us on Map
                </h3>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mb-3">
              <div className="col-12 text-center">
                <button
                  onClick={handleMapClick}
                  style={{
                    backgroundColor: "#FFD700",
                    color: "#8B0000",
                    border: "none",
                    padding: "10px 25px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    marginRight: "10px",
                    marginBottom: "15px",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#FFA500";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#FFD700";
                    e.target.style.transform = "translateY(0px)";
                  }}
                >
                  View on Google Maps
                </button>

                <button
                  onClick={handleGetDirections}
                  style={{
                    backgroundColor: "transparent",
                    color: "#FFD700",
                    border: "2px solid #FFD700",
                    padding: "8px 23px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    marginBottom: "15px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#FFD700";
                    e.target.style.color = "#8B0000";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#FFD700";
                  }}
                >
                  Get Directions
                </button>
              </div>
            </div>

            <div
              className="map_container"
              style={{
                width: "100%",
                height: "400px",
                border: "3px solid #FFD700",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={handleMapClick}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 215, 0, 0.05)",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  borderRadius: "12px",
                }}
                onMouseOver={(e) => (e.target.style.opacity = "1")}
                onMouseOut={(e) => (e.target.style.opacity = "0")}
              >
                <div
                  style={{
                    backgroundColor: "rgba(139, 0, 0, 0.9)",
                    color: "#FFD700",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textAlign: "center",
                    border: "2px solid #FFD700",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Click to Open in Google Maps
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.3174687726!2d77.69890269999999!3d12.9383209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13287dc4a509%3A0x3487ef268a483d31!2sRental%20Agreement%20E%20stamp%20Notary%20Pan%20Card%20Passport%20Jeevan%20Pramaan%20Aadhaar%20Pan%20Linking!5e0!3m2!1sen!2sin!4v1719155200000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{
                  border: 0,
                  borderRadius: "12px",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Draft Maker Location"
              ></iframe>
            </div>
          </div>
        </div> */}
      </div>

      <div className="bottom_footer">
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-md-4">
              <p>© Copyrights 2025. All rights reserved.</p>
            </div>
            <div className="col-md-4">
              <ul className="social_media">
                <li>
                  <a href="#">
                    <i className="icofont-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icofont-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icofont-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icofont-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="developer_text">
                Managed by <strong>Nagaraj Ajay Kumar</strong>
              </p>
            </div>
          </div>
          {/* row end */}
        </div>
        {/* container end */}
      </div>
    </footer>
  );
};

export default Footer;
