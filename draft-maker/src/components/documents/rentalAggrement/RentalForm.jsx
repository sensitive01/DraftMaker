import React from "react";
import "./RentalAgreement.css";

const RentalForm = ({
  formData,
  handleChange,
  handleFixtureChange,
  addFixture,
  removeFixture,
}) => {
  return (
    <div className="rental-form">
      <h2 className="rental-form-title">Rental Agreement Form</h2>
      <form className="rental-form-content">
        {/* Agreement Details */}
        <div className="rental-form-section">
          <h3 className="rental-form-section-title">Agreement Details</h3>
          <div className="rental-form-field">
            <label className="rental-form-label">Agreement Date</label>
            <input
              type="date"
              name="agreementDate"
              value={formData.agreementDate}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
        </div>

        {/* Lessor Details */}
        <div className="rental-form-section">
          <h3 className="rental-form-section-title">Lessor (Owner) Details</h3>
          <div className="rental-form-field">
            <label className="rental-form-label">Lessor Name</label>
            <input
              type="text"
              name="lessorName"
              value={formData.lessorName}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">Address Line 1</label>
            <input
              type="text"
              name="lessorAddressLine1"
              value={formData.lessorAddressLine1}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">Address Line 2</label>
            <input
              type="text"
              name="lessorAddressLine2"
              value={formData.lessorAddressLine2}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field-group">
            <div className="rental-form-field-third">
              <label className="rental-form-label">City</label>
              <input
                type="text"
                name="lessorCity"
                value={formData.lessorCity}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">State</label>
              <input
                type="text"
                name="lessorState"
                value={formData.lessorState}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">Pin Code</label>
              <input
                type="text"
                name="lessorPinCode"
                value={formData.lessorPinCode}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
          </div>
        </div>

        {/* Lessee Details */}
        <div className="rental-form-section">
          <h3 className="rental-form-section-title">Lessee (Tenant) Details</h3>
          <div className="rental-form-field">
            <label className="rental-form-label">Lessee Name</label>
            <input
              type="text"
              name="lesseeName"
              value={formData.lesseeName}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">Aadhaar Number</label>
            <input
              type="text"
              name="lesseeAadhaar"
              value={formData.lesseeAadhaar}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">
              Permanent Address Line 1
            </label>
            <input
              type="text"
              name="lesseePermanentAddressLine1"
              value={formData.lesseePermanentAddressLine1}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">
              Permanent Address Line 2
            </label>
            <input
              type="text"
              name="lesseePermanentAddressLine2"
              value={formData.lesseePermanentAddressLine2}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field-group">
            <div className="rental-form-field-third">
              <label className="rental-form-label">City</label>
              <input
                type="text"
                name="lesseePermanentCity"
                value={formData.lesseePermanentCity}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">State</label>
              <input
                type="text"
                name="lesseePermanentState"
                value={formData.lesseePermanentState}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">Pin Code</label>
              <input
                type="text"
                name="lesseePermanentPinCode"
                value={formData.lesseePermanentPinCode}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
          </div>
        </div>

        {/* Rent Details */}
        <div className="rental-form-section">
          <h3 className="rental-form-section-title">Rent & Deposit</h3>
          <div className="rental-form-field-group">
            <div className="rental-form-field-half">
              <label className="rental-form-label">Rent Amount</label>
              <input
                type="text"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-half">
              <label className="rental-form-label">In Words</label>
              <input
                type="text"
                name="rentAmountWords"
                value={formData.rentAmountWords}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
          </div>
          <div className="rental-form-field-group">
            <div className="rental-form-field-half">
              <label className="rental-form-label">Deposit Amount</label>
              <input
                type="text"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-half">
              <label className="rental-form-label">In Words</label>
              <input
                type="text"
                name="depositAmountWords"
                value={formData.depositAmountWords}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">Agreement Start Date</label>
            <input
              type="date"
              name="agreementStartDate"
              value={formData.agreementStartDate}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field-group">
            <div className="rental-form-field-half">
              <label className="rental-form-label">Rent Increase (%)</label>
              <input
                type="text"
                name="rentIncreasePercentage"
                value={formData.rentIncreasePercentage}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-half">
              <label className="rental-form-label">
                Notice Period (months)
              </label>
              <input
                type="text"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
          </div>
          <div className="rental-form-field">
            <label className="rental-form-label">Painting Charges</label>
            <input
              type="text"
              name="paintingCharges"
              value={formData.paintingCharges}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
        </div>

        {/* BHK Configuration */}
        <div className="rental-form-section">
          <h3 className="rental-form-section-title">BHK Configuration</h3>
          <div className="rental-form-field">
            <label className="rental-form-label">
              Configuration (e.g., 2BHK)
            </label>
            <input
              type="text"
              name="bhkConfig"
              value={formData.bhkConfig}
              onChange={handleChange}
              className="rental-form-input"
            />
          </div>
          <div className="rental-form-field-group">
            <div className="rental-form-field-third">
              <label className="rental-form-label">Bedrooms</label>
              <input
                type="text"
                name="bedroomCount"
                value={formData.bedroomCount}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">Halls</label>
              <input
                type="text"
                name="hallCount"
                value={formData.hallCount}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">Kitchens</label>
              <input
                type="text"
                name="kitchenCount"
                value={formData.kitchenCount}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
            <div className="rental-form-field-third">
              <label className="rental-form-label">Toilets</label>
              <input
                type="text"
                name="toiletCount"
                value={formData.toiletCount}
                onChange={handleChange}
                className="rental-form-input"
              />
            </div>
          </div>
        </div>

        {/* Fixtures */}
        <div className="rental-form-section">
          <h3 className="rental-form-section-title">Fixtures and Fittings</h3>
          {formData.fixtures.map((fixture, index) => (
            <div key={index} className="rental-form-fixture">
              <input
                type="text"
                value={fixture.item}
                onChange={(e) =>
                  handleFixtureChange(index, "item", e.target.value)
                }
                placeholder="Item name"
                className="rental-form-input"
              />
              <input
                type="text"
                value={fixture.quantity}
                onChange={(e) =>
                  handleFixtureChange(index, "quantity", e.target.value)
                }
                placeholder="Qty"
                className="rental-form-input"
              />
              <button
                type="button"
                onClick={() => removeFixture(index)}
                className="rental-form-remove-button"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFixture}
            className="rental-form-add-button"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalForm;
