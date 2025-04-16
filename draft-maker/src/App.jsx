import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DocumentForm from "./components/DocumentForm";
import DocumentPreview from "./components/DocumentPreview";
import NeedSupport from "./components/NeedSupport";
import Preloader from "./components/Preloader";
import draftLogo from "./images/anim_line.png";
import RentalAgreementForm from "./components/documents/rentalAggrement/RentalAgreementForm";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="page_wrapper">
        {loading && <Preloader />}

        <div className="top_home_wraper white_option">
          {/* Animated line background */}
          <div className="container">
            <div className="anim_line dark_bg">
              {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="/src/assets/images/anim_line.png" alt="anim_line" />
                </span>
              ))}
            </div>
          </div>

          <Header />

          {/* Bread Crumb */}
          <div
            className="bread_crumb"
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="100"
            style={{ paddingBottom: "150px" }}
          >
            <div className="anim_line dark_bg">
              {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src={draftLogo} alt="anim_line" />
                </span>
              ))}
            </div>
            <div className="container">
              <div className="bred_text">
                <h1>Draft Document</h1>
                <ul>
                  <li>
                    <a href="/">Document</a>
                  </li>
                  <li>
                    <span>»</span>
                  </li>
                  <li>
                    <a href="/rental-lease">Rental / Lease Agreement</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <DocumentForm />
                <DocumentPreview />
                <NeedSupport />
              </>
            }
          />
          <Route
            path="/service-list-1"
            element={
              <>
                <RentalAgreementForm />
              </>
            }
          />
        </Routes>

        <Footer />

        {/* Go to top button */}
        <GoTop />

        {/* Video modal */}
        <VideoModal />
      </div>
    </Router>
  );
}

// Go Top Button Component
const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`go_top ${isVisible ? "visible" : ""}`}
      id="Gotop"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <span>
        <i className="icofont-arrow-up"></i>
      </span>
    </div>
  );
};

// Video Modal Component
const VideoModal = () => {
  return (
    <div
      className="modal fade youtube-video"
      id="myModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <button
            id="close-video"
            type="button"
            className="button btn btn-default text-right"
            data-dismiss="modal"
          >
            <i className="icofont-close-line-circled"></i>
          </button>
          <div className="modal-body">
            <div id="video-container" className="video-container">
              <iframe
                id="youtubevideo"
                width="640"
                height="360"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
