import React, { useEffect } from "react";
import Header from "../Header";

const HomePage = () => {
  useEffect(() => {
    // This would be where you initialize any libraries like AOS, OwlCarousel, etc.
    // For a real implementation, you'd need to import and configure these libraries
    console.log("Component mounted - would initialize libraries here");

    // Counter animation effect similar to the original
    const animateCounter = () => {
      document.querySelectorAll(".counter-value").forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-count"));
        const count = parseInt(counter.innerText);
        const increment = target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(() => animateCounter(), 30);
        } else {
          counter.innerText = target;
        }
      });
    };

    animateCounter();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      <Header />

      <section className="banner_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="banner_text">
                <div
                  className="ban_inner_text"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  <span>
                    <i className="icofont-rocket-alt-2"></i> Powerful, easier
                    and faster
                  </span>
                  <h1>
                    Make your Document Draft <br />{" "}
                    <span>faster with Draft Maker</span>
                  </h1>
                  <p>
                    The World's simplest and fast platform that brings
                    everything together
                  </p>
                </div>

                <form action="#" data-aos="fade-up" data-aos-duration="1500">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Service Required"
                    />
                    <button className="btn btn_main">
                      Submit <i className="icofont-arrow-right"></i>
                    </button>
                  </div>
                </form>

                <div
                  className="offers"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  <span>
                    <i className="icofont-check-circled"></i> Free trial 14 days
                  </span>
                  <span>
                    <i className="icofont-check-circled"></i> No credit card
                    require
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div
                className="banner_image"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                <img src="images/new/hero_image.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
