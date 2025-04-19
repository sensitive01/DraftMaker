import React from "react";

const CommercialForm = ({
  formData,
  handleChange,
  addFixture,
  removeFixture,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Realtime Document Drafting Online - Tenancy Agreement
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Fill the below details to see your realtime document.
      </p>

      <form className="space-y-8">
        {/* Lessor Details */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lessor (Owner) Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Agreement Date
                </label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lessee (Tenant) Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="lesseeAadhaar"
                  value={formData.lesseeAadhaar || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address Line 1</label>
              <input
                type="text"
                name="lesseePermanentAddressLine1"
                value={formData.lesseePermanentAddressLine1 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address Line 2</label>
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

        {/* Premises Details */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Premises Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Address Line 1</label>
              <input
                type="text"
                name="propertyAddressLine1"
                value={formData.propertyAddressLine1 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Address Line 2</label>
              <input
                type="text"
                name="propertyAddressLine2"
                value={formData.propertyAddressLine2 || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="propertyCity"
                  value={formData.propertyCity || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="propertyState"
                  value={formData.propertyState || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pin Code</label>
                <input
                  type="text"
                  name="propertyPinCode"
                  value={formData.propertyPinCode || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  BHK Configuration
                </label>
                <input
                  type="text"
                  name="bhkConfig"
                  value={formData.bhkConfig || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Bedroom Count
                </label>
                <input
                  type="number"
                  name="bedroomCount"
                  value={formData.bedroomCount || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Hall Count</label>
                <input
                  type="number"
                  name="hallCount"
                  value={formData.hallCount || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Kitchen Count
                </label>
                <input
                  type="number"
                  name="kitchenCount"
                  value={formData.kitchenCount || ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Toilet Count</label>
              <input
                type="number"
                name="toiletCount"
                value={formData.toiletCount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Rent Details */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rent Details
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
              <label className="block text-gray-700 mb-2">Rent in Words</label>
              <input
                type="text"
                name="rentAmountWords"
                value={formData.rentAmountWords || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Security Deposit */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Security Deposit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Security Deposit
              </label>
              <input
                type="text"
                name="depositAmount"
                value={formData.depositAmount || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Deposit in Words
              </label>
              <input
                type="text"
                name="depositAmountWords"
                value={formData.depositAmountWords || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tenancy Terms */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tenancy Terms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Tenancy Start Date
              </label>
              <input
                type="date"
                name="agreementStartDate"
                value={formData.agreementStartDate || ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
            <div>
              <label className="block text-gray-700 mb-2">
                Default Period (months)
              </label>
              <input
                type="text"
                name="defaultPeriod"
                value={formData.defaultPeriod || ""}
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

        {/* Fixtures */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Fixtures and Fittings
          </h2>
          {formData.fixtures &&
            formData.fixtures.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 mb-3">
                <input
                  type="text"
                  name="item"
                  value={item.item || ""}
                  onChange={(e) => handleChange(e, index, "fixtures")}
                  placeholder="Item name"
                  className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="quantity"
                  value={item.quantity || ""}
                  onChange={(e) => handleChange(e, index, "fixtures")}
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

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none flex items-center font-medium"
          >
            Preview Agreement <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommercialForm;
