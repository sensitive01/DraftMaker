import React from "react";

const RentalForm = ({
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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Realtime Document Drafting - Rental Agreement
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill the details below to generate your document in realtime
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Agreement Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                1
              </span>
              Agreement Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Agreement Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="agreementDate"
                  value={formData.agreementDate || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="agreementStartDate"
                  value={formData.agreementStartDate || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="agreementEndDate"
                  value={formData.agreementEndDate || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div> */}
            </div>
          </div>

          {/* Lessor Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-3 sm:mb-0 flex items-center">
                <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                  2
                </span>
                Lessor (Owner) Details
              </h2>
              <button
                type="button"
                onClick={addLessor}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-sm"
              >
                + Add Lessor
              </button>
            </div>

            <div className="space-y-4">
              {formData.lessors.map((lessor, index) => (
                <div
                  key={index}
                  className="border border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <h3 className="text-base font-bold text-red-700 mb-2 sm:mb-0">
                      Lessor {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLessor(index)}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 focus:outline-none transition-all duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="md:col-span-2 xl:col-span-3">
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Lessor Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={lessor.name || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={lessor.city || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={lessor.state || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Pin Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        value={lessor.pinCode || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={lessor.addressLine1 || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={lessor.addressLine2 || ""}
                        onChange={(e) => handleLessorChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lessee Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-3 sm:mb-0 flex items-center">
                <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                  3
                </span>
                Lessee (Tenant) Details
              </h2>
              <button
                type="button"
                onClick={addLessee}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-sm"
              >
                + Add Lessee
              </button>
            </div>

            <div className="space-y-4">
              {formData.lessees.map((lessee, index) => (
                <div
                  key={index}
                  className="border border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <h3 className="text-base font-bold text-red-700 mb-2 sm:mb-0">
                      Lessee {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLessee(index)}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 focus:outline-none transition-all duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Lessee Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={lessee.name || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Aadhaar Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="aadhaar"
                        value={lessee.aadhaar || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="permanentCity"
                        value={lessee.permanentCity || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="permanentState"
                        value={lessee.permanentState || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Pin Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="permanentPinCode"
                        value={lessee.permanentPinCode || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Permanent Address Line 1{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="permanentAddressLine1"
                        value={lessee.permanentAddressLine1 || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>

                    <div className="md:col-span-2 xl:col-span-3">
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="permanentAddressLine2"
                        value={lessee.permanentAddressLine2 || ""}
                        onChange={(e) => handleLesseeChange(index, e)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-500 mb-4 flex items-center">
              <span className="w-6 h-6 text-black bg-red-100 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                📄
              </span>
              Party Names & Stamp Duty
            </h2>

            <div className="bg-white p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-500 mb-2">
                  First Party Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstParty"
                  value={formData.firstParty || ""}
                  onChange={handlePartyNameChange}
                  maxLength={50}
                  placeholder="Enter first party name (letters, spaces, commas only)"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.firstParty?.length || 0}/50 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-500 mb-2">
                  Second Party Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="secondParty"
                  value={formData.secondParty || ""}
                  onChange={handlePartyNameChange}
                  maxLength={50}
                  placeholder="Enter second party name (letters, spaces, commas only)"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.secondParty?.length || 0}/50 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-500 mb-2">
                  Who will pay the Stamp Duty?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="stampDutyPayer"
                  value={formData.stampDutyPayer || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white"
                >
                  <option value="">Select who will pay the stamp duty</option>
                  <option value="First Party">First Party</option>
                  <option value="Second Party">Second Party</option>
                </select>
              </div>

              <p className="mt-3 text-xs text-red-600 italic">
                ℹ️ Please enter the names of both parties and select who will
                pay the stamp duty. Only letters, spaces, and commas are allowed
                (max 50 characters each).
              </p>
            </div>
          </div>

          {/* Rent & Deposit Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                4
              </span>
              Rent & Deposit
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Rent Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rentAmount"
                  value={formData.rentAmount || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  In Words <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rentAmountWords"
                  value={formData.rentAmountWords || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Deposit (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="depositAmount"
                  value={formData.depositAmount || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  In Words <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="depositAmountWords"
                  value={formData.depositAmountWords || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Rent Due Date
                </label>
                <input
                  type="text"
                  name="rentDueDate"
                  value={formData.rentDueDate || ""}
                  onChange={handleChange}
                  placeholder="e.g., 5th of every month"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Rent Increase (%)
                </label>
                <input
                  type="text"
                  name="rentIncreasePercentage"
                  value={formData.rentIncreasePercentage || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Notice Period (months)
                </label>
                <input
                  type="text"
                  name="noticePeriod"
                  value={formData.noticePeriod || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Termination Period (months)
                </label>
                <input
                  type="text"
                  name="terminationPeriod"
                  value={formData.terminationPeriod || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Painting Charges (₹)
                </label>
                <input
                  type="text"
                  name="paintingCharges"
                  value={formData.paintingCharges || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Use Purpose
                </label>
                <input
                  type="text"
                  name="usePurpose"
                  value={formData.usePurpose || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Property Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                5
              </span>
              Property Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Property Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="propertyAddress"
                  value={formData.propertyAddress || ""}
                  onChange={handleChange}
                  placeholder="Complete property address"
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Additional Details
                </label>
                <textarea
                  name="additionaldetails"
                  value={formData.additionaldetails || ""}
                  onChange={handleChange}
                  placeholder="Additional property details"
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-2">
                  Property Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-red-600 mb-1">
                      Configuration
                    </label>
                    <input
                      type="text"
                      name="bhkConfig"
                      value={formData.bhkConfig || ""}
                      onChange={handleChange}
                      placeholder="e.g. 2BHK"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-red-600 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="text"
                      name="bedroomCount"
                      value={formData.bedroomCount || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-red-600 mb-1">
                      Halls
                    </label>
                    <input
                      type="text"
                      name="hallCount"
                      value={formData.hallCount || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-red-600 mb-1">
                      Kitchen
                    </label>
                    <input
                      type="text"
                      name="kitchenCount"
                      value={formData.kitchenCount || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-red-600 mb-1">
                      Toilets
                    </label>
                    <input
                      type="text"
                      name="toiletCount"
                      value={formData.toiletCount || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixtures - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                6
              </span>
              Fixtures and Fittings
            </h2>

            <div className="space-y-3">
              {formData.fixtures &&
                formData.fixtures.map((fixture, index) => (
                  <div
                    key={index}
                    className="bg-red-50 border border-red-200 rounded-md p-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-7">
                        <label className="block text-sm font-semibold text-red-600 mb-1">
                          Item Name
                        </label>
                        <input
                          type="text"
                          value={fixture.item}
                          onChange={(e) =>
                            handleFixtureChange(index, "item", e.target.value)
                          }
                          placeholder="Enter item name"
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-semibold text-red-600 mb-1">
                          Quantity
                        </label>
                        <input
                          type="text"
                          value={fixture.quantity}
                          onChange={(e) =>
                            handleFixtureChange(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                          placeholder="Qty"
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="button"
                          onClick={() => removeFixture(index)}
                          className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all duration-200 font-semibold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={addFixture}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-sm"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Terms and Conditions - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <div className="flex items-start space-x-3">
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
                className="h-5 w-5 text-red-600 border-2 border-gray-300 rounded focus:ring-1 focus:ring-red-500 mt-1"
              />
              <label className="text-sm text-gray-700 leading-relaxed font-medium">
                I agree to the terms and conditions of this rental agreement and
                confirm that all the information provided is accurate and
                complete.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
