import React from "react";

const CommercialForm = ({
  formData,
  handleChange,
  handleFixtureChange,
  addFixture,
  removeFixture,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 bg-white">
      <h1 className="text-xl sm:text-2xl font-semibold text-center mb-4">
        Realtime Document Drafting - Commercial Agreement
      </h1>
      <p className="text-sm text-center text-gray-600 mb-4">
        Fill the details below to generate your document in realtime.
      </p>

      <form className="space-y-4">
        {/* Multi-tab Navigation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {[
              "Agreement",
              "Lessor",
              "Lessee",
              "Rent",
              "Property",
              "Fixtures",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                onClick={() => {
                  // Navigation logic would go here in a real implementation
                  document
                    .getElementById(tab.toLowerCase())
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Agreement Details */}
          <div id="agreement" className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              Agreement Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Agreement Date
                </label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="agreementStartDate"
                  value={formData.agreementStartDate || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Lessor Details */}
          <div id="lessor" className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              Lessor (Owner) Details
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Lessor Name
                  </label>
                  <input
                    type="text"
                    name="lessorName"
                    value={formData.lessorName || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="lessorCity"
                      value={formData.lessorCity || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="lessorState"
                      value={formData.lessorState || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="lessorAddressLine1"
                    value={formData.lessorAddressLine1 || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="lessorPinCode"
                    value={formData.lessorPinCode || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="lessorAddressLine2"
                  value={formData.lessorAddressLine2 || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Lessee Details */}
          <div id="lessee" className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              Lessee (Tenant) Details
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Lessee Name
                  </label>
                  <input
                    type="text"
                    name="lesseeName"
                    value={formData.lesseeName || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="lesseeAadhaar"
                    value={formData.lesseeAadhaar || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">
                    Permanent Address Line 1
                  </label>
                  <input
                    type="text"
                    name="lesseePermanentAddressLine1"
                    value={formData.lesseePermanentAddressLine1 || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="lesseePermanentPinCode"
                    value={formData.lesseePermanentPinCode || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="lesseePermanentCity"
                    value={formData.lesseePermanentCity || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="lesseePermanentState"
                    value={formData.lesseePermanentState || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="lesseePermanentAddressLine2"
                    value={formData.lesseePermanentAddressLine2 || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rent & Deposit Details */}
          <div id="rent" className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              Rent & Deposit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Rent Amount (₹)
                </label>
                <input
                  type="text"
                  name="rentAmount"
                  value={formData.rentAmount || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  In Words
                </label>
                <input
                  type="text"
                  name="rentAmountWords"
                  value={formData.rentAmountWords || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Deposit (₹)
                </label>
                <input
                  type="text"
                  name="depositAmount"
                  value={formData.depositAmount || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  In Words
                </label>
                <input
                  type="text"
                  name="depositAmountWords"
                  value={formData.depositAmountWords || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Rent Increase (%)
                </label>
                <input
                  type="text"
                  name="rentIncreasePercentage"
                  value={formData.rentIncreasePercentage || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Notice Period (months)
                </label>
                <input
                  type="text"
                  name="noticePeriod"
                  value={formData.noticePeriod || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Painting Charges (₹)
                </label>
                <input
                  type="text"
                  name="paintingCharges"
                  value={formData.paintingCharges || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div id="property" className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              Property Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Property Address
                </label>
                <textarea
                  name="propertyAddress"
                  value={formData.propertyAddress || ""}
                  onChange={handleChange}
                  placeholder="Complete property address"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Configuration
                    </label>
                    <input
                      type="text"
                      name="bhkConfig"
                      value={formData.bhkConfig || ""}
                      onChange={handleChange}
                      placeholder="e.g. 2BHK"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="text"
                      name="bedroomCount"
                      value={formData.bedroomCount || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Halls
                    </label>
                    <input
                      type="text"
                      name="hallCount"
                      value={formData.hallCount || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Toilets
                    </label>
                    <input
                      type="text"
                      name="toiletCount"
                      value={formData.toiletCount || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixtures */}
          <div id="fixtures" className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              Fixtures and Fittings
            </h2>
            <div className="space-y-2">
              {formData.fixtures &&
                formData.fixtures.map((fixture, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={fixture.item}
                      onChange={(e) =>
                        handleFixtureChange(index, "item", e.target.value)
                      }
                      placeholder="Item name"
                      className="flex-grow p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={fixture.quantity}
                      onChange={(e) =>
                        handleFixtureChange(index, "quantity", e.target.value)
                      }
                      placeholder="Qty"
                      className="w-16 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFixture(index)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>
                ))}

              <button
                type="button"
                onClick={addFixture}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-900 focus:outline-none"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms || false}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "agreeTerms",
                      value: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600"
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree to the terms and conditions of this rental agreement
              </label>
            </div>
          </div>

          
        </div>
      </form>
    </div>
  );
};

export default CommercialForm;
