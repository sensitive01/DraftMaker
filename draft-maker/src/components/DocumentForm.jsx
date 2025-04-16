import { useState } from 'react';

const DocumentForm = () => {
  const [formData, setFormData] = useState({
    documentType: '',
    firstPartyName: '',
    secondPartyName: '',
    documentFor: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className="blog_detail_section" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200" style={{marginBottom: '150px'}}>
      <div className="container">
        <div className="blog_inner_pannel">
          <div className="blog_info" data-aos="fade-up" data-aos-duration="2000">
            <div className="comment_form_section">
              <div className="section_title" data-aos="fade-up" data-aos-duration="1500">
                <p>Realtime Document Drafting Online, Fill the below details to see your realtime document.</p>
              </div>
              <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="1500">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select 
                        className="form-control" 
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                      >
                        <option value="">Choose Document Type</option>
                        <option value="commercial">Commercial Rental / Lease Agreement</option>
                        <option value="residential">Residential Rental / Lease Agreement</option>
                        <option value="affidavits">AFFIDAVITS</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="1st Party Name"
                        name="firstPartyName"
                        value={formData.firstPartyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="2nd Party Name"
                        name="secondPartyName"
                        value={formData.secondPartyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Document For"
                        name="documentFor"
                        value={formData.documentFor}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea 
                        className="form-control" 
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 text-left">
                    <button className="btn btn_main" type="submit">Submit <i className="icofont-arrow-right"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentForm;