import React from "react";

const CommercialForm = ({
  formData,
  handleChange,
  handleFixtureChange,
  addFixture,
  removeFixture,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Realtime Document Drafting Online - Rental Agreement
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Fill the below details to see your realtime document.
      </p>

      <form className="space-y-8">
        {/* Agreement Details */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Agreement Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Agreement Date</label>
              <input
                type="date"
                name="agreementDate"
                value={formData.agreementDate || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Agreement Start Date
              </label>
              <input
                type="date"
                name="agreementStartDate"
                value={formData.agreementStartDate || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Lessor Details */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lessor (Owner) Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Lessor Name</label>
              <input
                type="text"
                name="lessorName"
                value={formData.lessorName || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address Line 1</label>
              <input
                type="text"
                name="lessorAddressLine1"
                value={formData.lessorAddressLine1 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address Line 2</label>
              <input
                type="text"
                name="lessorAddressLine2"
                value={formData.lessorAddressLine2 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="lessorCity"
                  value={formData.lessorCity || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="lessorState"
                  value={formData.lessorState || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pin Code</label>
                <input
                  type="text"
                  name="lessorPinCode"
                  value={formData.lessorPinCode || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lessee Details */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lessee (Tenant) Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Lessee Name</label>
              <input
                type="text"
                name="lesseeName"
                value={formData.lesseeName || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Aadhaar Number</label>
              <input
                type="text"
                name="lesseeAadhaar"
                value={formData.lesseeAadhaar || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Permanent Address Line 1
              </label>
              <input
                type="text"
                name="lesseePermanentAddressLine1"
                value={formData.lesseePermanentAddressLine1 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Permanent Address Line 2
              </label>
              <input
                type="text"
                name="lesseePermanentAddressLine2"
                value={formData.lesseePermanentAddressLine2 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="lesseePermanentCity"
                  value={formData.lesseePermanentCity || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="lesseePermanentState"
                  value={formData.lesseePermanentState || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pin Code</label>
                <input
                  type="text"
                  name="lesseePermanentPinCode"
                  value={formData.lesseePermanentPinCode || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rent & Deposit Details */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rent & Deposit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Rent Amount</label>
              <input
                type="text"
                name="rentAmount"
                value={formData.rentAmount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">In Words</label>
              <input
                type="text"
                name="rentAmountWords"
                value={formData.rentAmountWords || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 mb-2">Deposit Amount</label>
              <input
                type="text"
                name="depositAmount"
                value={formData.depositAmount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">In Words</label>
              <input
                type="text"
                name="depositAmountWords"
                value={formData.depositAmountWords || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Rent Increase (%)
              </label>
              <input
                type="text"
                name="rentIncreasePercentage"
                value={formData.rentIncreasePercentage || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Notice Period (months)
              </label>
              <input
                type="text"
                name="noticePeriod"
                value={formData.noticePeriod || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Painting Charges</label>
            <input
              type="text"
              name="paintingCharges"
              value={formData.paintingCharges || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* BHK Configuration */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            BHK Configuration
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Configuration (e.g., 2BHK)
            </label>
            <input
              type="text"
              name="bhkConfig"
              value={formData.bhkConfig || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Bedrooms</label>
              <input
                type="text"
                name="bedroomCount"
                value={formData.bedroomCount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Halls</label>
              <input
                type="text"
                name="hallCount"
                value={formData.hallCount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Kitchens</label>
              <input
                type="text"
                name="kitchenCount"
                value={formData.kitchenCount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Toilets</label>
              <input
                type="text"
                name="toiletCount"
                value={formData.toiletCount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Fixtures */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Fixtures and Fittings
          </h2>
          {formData.fixtures &&
            formData.fixtures.map((fixture, index) => (
              <div key={index} className="flex items-center space-x-4 mb-3">
                <input
                  type="text"
                  value={fixture.item}
                  onChange={(e) =>
                    handleFixtureChange(index, "item", e.target.value)
                  }
                  placeholder="Item name"
                  className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={fixture.quantity}
                  onChange={(e) =>
                    handleFixtureChange(index, "quantity", e.target.value)
                  }
                  placeholder="Qty"
                  className="w-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeFixture(index)}
                  className="p-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none"
                >
                  ✕
                </button>
              </div>
            ))}

          <button
            type="button"
            onClick={addFixture}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Add Item
          </button>
        </div>

        {/* Additional Address for document */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Property Address
          </h2>
          <textarea
            name="propertyAddress"
            value={formData.propertyAddress || ""}
            onChange={handleChange}
            placeholder="Complete property address"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
        </div>

        {/* Terms and Conditions */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Terms and Conditions
          </h2>
          <div className="mb-4">
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
                className="h-5 w-5 text-blue-600"
              />
              <label className="ml-2 text-gray-700">
                I agree to the terms and conditions of this rental agreement
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none flex items-center font-medium"
          >
            Submit <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommercialForm;
