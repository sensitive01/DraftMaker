import React from "react";

const NeedSupport = () => {
  return (
    <section className="need_section">
      <div className="need_section_inner">
        <div className="container">
          <div className="need_block">
            <div className="need_text">
              <div className="section_title">
                <h2>Need support ? contact our team</h2>
                <p><i className="icofont-clock-time"></i> Mon - Fri: 9 am to 5 am</p>
              </div>
            </div>
            <div className="need_action">
              <a href="tel:1234567899" className="btn"><i className="icofont-phone-circle"></i> +1 123 456 7890</a>
              <a href="#faqBlock" className="faq_btn">Read The FAQ </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS to ensure proper z-index behavior */}
      <style jsx>{`
        .need_section {
          position: relative;
          z-index: 5; /* Lower z-index than modal popups */
        }
        
        /* Target modals to ensure they have higher z-index */
        :global(.modal), :global(.modal-backdrop) {
          z-index: 1050 !important; /* Bootstrap default modal z-index is 1050 */
        }
      `}</style>
    </section>
  );
};

export default NeedSupport;