import { Link } from "react-router-dom";
import animaeIng from "../assets/images/anim_line_2.png"
import contactImg from "../assets/images/contact.png"
import logoImg from "../assets/images/logo.png" 


const Footer = () => {
  return (
    <footer>
      <div className="top_footer" id="contact">
        <div className="container">
          {/* vertical line animation */}
          <div className="anim_line dark_bg">
            {[...Array(9)].map((_, index) => (
              <span key={index}>
                <img src={animaeIng} alt="anim_line" />
              </span>
            ))}
          </div>
        </div>

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
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/drafting-services">Drafting Services</Link>
                  </li>
                  <li>
                    <Link to="/printing-services">Printing Services</Link>
                  </li>
                  <li>
                    <Link to="/e-stamp-services">E-Stamp Services</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* footer link 3 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="links">
                <h3>Draft Maker</h3>
                <hr />
                <ul>
                  <li>
                    <Link to="/rental-lease">Rental / Lease Agreement</Link>
                  </li>
                  <li>
                    <Link to="/affidavits">Affidavits</Link>
                  </li>
                  <li>
                    <Link to="/buy-e-stamp">Buy E-Stamp</Link>
                  </li>
                  <li>
                    <Link to="/how-it-works">How it works</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms & conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy policy</Link>
                  </li>
                  <li>
                    <Link to="/sign-in">Sign In</Link>
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
                      <img src={contactImg} alt="image" />
                    </span>
                    <div className="text">
                      <p>
                        Reach us <br /> 599, Vilium Crossing, NJ
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={contactImg} alt="image" />
                    </span>
                    <div className="text">
                      <p>
                        Call us <a href="tel:+1-900-1234567">+1-900-123 4567</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={contactImg} alt="image" />
                    </span>
                    <div className="text">
                      <p>
                        Email us{" "}
                        <a href="mailto:support@example.com">
                          support@example.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
        {/* container end */}
      </div>

      {/* last footer */}
      <div className="bottom_footer">
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-md-4">
              <p>© Copyrights 2023. All rights reserved.</p>
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
                Design & developed by{" "}
                <a href="" target="blank">
                  Sensitive Technologies
                </a>
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
