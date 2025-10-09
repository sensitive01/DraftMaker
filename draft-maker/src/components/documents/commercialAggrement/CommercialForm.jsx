import React from "react";

const CommercialForm = ({
  formData,
  handleChange,
  handleFixtureChange,
  addFixture,
  removeFixture,
  addLessor,
  removeLessor,
  addLessee,
  removeLessee,
  handleLessorChange,
  handleLesseeChange,
}) => {
  const handlePartyNameChange = (e) => {
    const { name, value } = e.target;
    // Allow only letters, spaces, and commas, max 50 characters
    const filteredValue = value.replace(/[^a-zA-Z\s,]/g, "").slice(0, 50);
    handleChange({
      target: {
        name: name,
        value: filteredValue,
      },
    });
  };
  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center mb-3 sm:mb-4 px-2">
        Realtime Document Drafting - Commercial Agreement
      </h1>
      <p className="text-xs sm:text-sm text-center text-gray-600 mb-4 sm:mb-6 px-2">
        Fill the details below to generate your document in realtime.
      </p>

      <div className="space-y-4 sm:space-y-6">
        {/* Multi-tab Navigation */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-6">
          {/* Agreement Details */}
          <div id="agreement" className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 pb-2 border-b">
              Agreement Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Agreement Date
                </label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="agreementStartDate"
                  value={formData.agreementStartDate || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Lessor Details */}
          <div id="lessor" className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 pb-2 border-b gap-3 sm:gap-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-800">
                Lessor (Owner) Details
              </h2>
              <button
                type="button"
                onClick={addLessor}
                className="px-3 py-2 bg-red-500 text-white text-xs sm:text-sm rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Add Lessor
              </button>
            </div>

            {formData.lessors.map((lessor, index) => (
              <div
                key={index}
                className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-3 sm:gap-0">
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                    Lessor {index + 1}
                  </h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLessor(index)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Lessor Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={lessor.name || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={lessor.city || ""}
                          onChange={(e) => handleLessorChange(index, e)}
                          className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={lessor.state || ""}
                          onChange={(e) => handleLessorChange(index, e)}
                          className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
                    <div className="sm:col-span-3">
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={lessor.addressLine1 || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        value={lessor.pinCode || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={lessor.addressLine2 || ""}
                      onChange={(e) => handleLessorChange(index, e)}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lessee Details */}
          <div id="lessee" className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 pb-2 border-b gap-3 sm:gap-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-800">
                Lessee (Tenant) Details
              </h2>
              <button
                type="button"
                onClick={addLessee}
                className="px-3 py-2 bg-red-500 text-white text-xs sm:text-sm rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Add Lessee
              </button>
            </div>

            {formData.lessees.map((lessee, index) => (
              <div
                key={index}
                className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-3 sm:gap-0">
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                    Lessee {index + 1}
                  </h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLessee(index)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Lessee Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={lessee.name || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        name="aadhaar"
                        value={lessee.aadhaar || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
                    <div className="sm:col-span-3">
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Permanent Address Line 1
                      </label>
                      <input
                        type="text"
                        name="permanentAddressLine1"
                        value={lessee.permanentAddressLine1 || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        name="permanentPinCode"
                        value={lessee.permanentPinCode || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="permanentCity"
                        value={lessee.permanentCity || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="permanentState"
                        value={lessee.permanentState || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                        Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="permanentAddressLine2"
                        value={lessee.permanentAddressLine2 || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Party Names & Stamp Duty */}
          {/* Party Names & Stamp Duty */}
          <div id="party-stamp" className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 pb-2 border-b">
              Party Names & Stamp Duty
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  First Party Name
                </label>
                <input
                  type="text"
                  name="firstParty"
                  value={formData.firstParty || ""}
                  onChange={handlePartyNameChange}
                  maxLength={50}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter first party name (letters, spaces, commas only)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.firstParty?.length || 0}/50 characters
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Second Party Name
                </label>
                <input
                  type="text"
                  name="secondParty"
                  value={formData.secondParty || ""}
                  onChange={handlePartyNameChange}
                  maxLength={50}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter second party name (letters, spaces, commas only)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.secondParty?.length || 0}/50 characters
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Who will pay the Stamp Duty?
                </label>
                <select
                  name="stampDutyPayer"
                  value={formData.stampDutyPayer || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select who will pay the stamp duty</option>
                  <option value="First Party">First Party</option>
                  <option value="Second Party">Second Party</option>
                </select>
              </div>

              <p className="text-xs text-red-600 italic">
                ℹ️ Please enter the names of both parties and select who will
                pay the stamp duty. Only letters, spaces, and commas are allowed
                (max 50 characters each).
              </p>
            </div>
          </div>

          {/* Rent & Deposit Details */}
          <div id="rent" className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 pb-2 border-b">
              Rent & Deposit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Rent Amount (₹)
                </label>
                <input
                  type="text"
                  name="rentAmount"
                  value={formData.rentAmount || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  In Words
                </label>
                <input
                  type="text"
                  name="rentAmountWords"
                  value={formData.rentAmountWords || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Deposit (₹)
                </label>
                <input
                  type="text"
                  name="depositAmount"
                  value={formData.depositAmount || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  In Words
                </label>
                <input
                  type="text"
                  name="depositAmountWords"
                  value={formData.depositAmountWords || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Rent Increase (%)
                </label>
                <input
                  type="text"
                  name="rentIncreasePercentage"
                  value={formData.rentIncreasePercentage || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Notice Period (months)
                </label>
                <input
                  type="text"
                  name="noticePeriod"
                  value={formData.noticePeriod || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Painting Charges (₹)
                </label>
                <input
                  type="text"
                  name="paintingCharges"
                  value={formData.paintingCharges || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div id="property" className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 pb-2 border-b">
              Property Details
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Property Address
                </label>
                <textarea
                  name="propertyAddress"
                  value={formData.propertyAddress || ""}
                  onChange={handleChange}
                  placeholder="Complete property address"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 h-20 sm:h-24"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                  Additional Details
                </label>
                <textarea
                  name="additionaldetails"
                  value={formData.additionaldetails || ""}
                  onChange={handleChange}
                  placeholder="Additional Details"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 h-20 sm:h-24"
                ></textarea>
              </div>

              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                      Commercial Type
                    </label>
                    <select
                      name="commercialType"
                      value={formData.commercialType || ""}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="shop">Shop</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-red-600 mb-2">
                      Square Feet
                    </label>
                    <input
                      type="number"
                      name="squareFeet"
                      value={formData.squareFeet || ""}
                      onChange={handleChange}
                      placeholder="Enter area in sq ft"
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixtures */}
          <div id="fixtures" className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 pb-2 border-b">
              Fixtures and Fittings
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {formData.fixtures &&
                formData.fixtures.map((fixture, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
                  >
                    <input
                      type="text"
                      value={fixture.item}
                      onChange={(e) =>
                        handleFixtureChange(index, "item", e.target.value)
                      }
                      placeholder="Item name"
                      className="w-full flex-grow p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex w-full sm:w-auto space-x-2">
                      <input
                        type="text"
                        value={fixture.quantity}
                        onChange={(e) =>
                          handleFixtureChange(index, "quantity", e.target.value)
                        }
                        placeholder="Qty"
                        className="w-20 sm:w-16 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFixture(index)}
                        className="p-2 sm:p-3 bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none text-sm sm:text-base"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={addFixture}
                className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-red-500 text-white text-sm sm:text-base rounded hover:bg-red-600 focus:outline-none transition-colors duration-200"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6 sm:mt-8">
            <div className="flex items-start sm:items-center mb-2">
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
                className="h-4 w-4 text-blue-600 mt-0.5 sm:mt-0 flex-shrink-0"
              />
              <label className="ml-3 text-xs sm:text-sm text-red-600 font-medium leading-relaxed">
                I agree to the terms and conditions of this rental agreement
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialForm;
