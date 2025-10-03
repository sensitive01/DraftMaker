import React from "react";

const HufForm = ({
  formData,
  handleChange,
  handleCoparcenerChange,
  addCoparcener,
  removeCoparcener,
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
              HUF AFFIDAVIT
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill the details below to generate your document in realtime
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Personal Information Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                1
              </span>
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relation <span className="text-red-500">*</span>
                </label>
                <select
                  name="relationTo"
                  value={formData.relationTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                >
                  <option value="">Select</option>
                  <option value="D/o">Daughter of</option>
                  <option value="S/o">Son of</option>
                  <option value="W/o">Wife of</option>
                  <option value="H/o">Husband of</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relation Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="relationName"
                  value={formData.relationName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Father/Mother/Spouse Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Your Age"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhaarNo"
                  value={formData.aadhaarNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="0000 0000 0000"
                />
              </div>
            </div>
          </div>

          {/* Address Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                2
              </span>
              Address Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address.line1"
                  value={formData.address.line1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="House/Flat No., Building Name, Street"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address.line2"
                  value={formData.address.line2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Area, Landmark"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.pinCode"
                    value={formData.address.pinCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Pin Code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* HUF Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                3
              </span>
              HUF Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  HUF Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hufName"
                  value={formData.hufName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="HUF Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  HUF Existence Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="hufExistenceDate"
                  value={formData.hufExistenceDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Coparceners Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-3 sm:mb-0 flex items-center">
                <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                  4
                </span>
                Coparceners Details
              </h2>
              <button
                type="button"
                onClick={addCoparcener}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-sm sm:block hidden"
              >
                + Add Member
              </button>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
              {formData.coparceners.length > 0 ? (
                formData.coparceners.map((coparcener, index) => (
                  <div
                    key={index}
                    className="border border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-base font-bold text-red-700">
                        Member {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCoparcener(index)}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 focus:outline-none transition-all duration-200"
                      >
                        X
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={coparcener.name}
                          onChange={(e) =>
                            handleCoparcenerChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">
                          Relationship <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={coparcener.relationship}
                          onChange={(e) =>
                            handleCoparcenerChange(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Relationship"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={coparcener.address}
                          onChange={(e) =>
                            handleCoparcenerChange(
                              index,
                              "address",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-bold text-red-700">
                      Member 1
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-100 text-red-400 text-sm font-semibold rounded-md opacity-50 cursor-not-allowed"
                      disabled
                    >
                      X
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value=""
                        onChange={(e) =>
                          handleCoparcenerChange(0, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Relationship <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value=""
                        onChange={(e) =>
                          handleCoparcenerChange(
                            0,
                            "relationship",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="Relationship"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value=""
                        onChange={(e) =>
                          handleCoparcenerChange(0, "address", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Add Button */}
              <button
                type="button"
                onClick={addCoparcener}
                className="w-full px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-sm"
              >
                + Add Member
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-2 border-red-200 rounded-lg">
                <thead className="bg-red-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-600 border-b border-red-200">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-600 border-b border-red-200">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-600 border-b border-red-200">
                      Relationship
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-600 border-b border-red-200">
                      Address
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-red-600 border-b border-red-200 w-24">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.coparceners.length > 0 ? (
                    formData.coparceners.map((coparcener, index) => (
                      <tr key={index} className="border-b border-red-100">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={coparcener.name}
                            onChange={(e) =>
                              handleCoparcenerChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                            placeholder="Full Name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={coparcener.relationship}
                            onChange={(e) =>
                              handleCoparcenerChange(
                                index,
                                "relationship",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                            placeholder="Relationship"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={coparcener.address}
                            onChange={(e) =>
                              handleCoparcenerChange(
                                index,
                                "address",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                            placeholder="Address"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeCoparcener(index)}
                            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all duration-200 font-semibold text-sm"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-red-100">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">
                        1
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value=""
                          onChange={(e) =>
                            handleCoparcenerChange(0, "name", e.target.value)
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Full Name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value=""
                          onChange={(e) =>
                            handleCoparcenerChange(
                              0,
                              "relationship",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Relationship"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value=""
                          onChange={(e) =>
                            handleCoparcenerChange(0, "address", e.target.value)
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Address"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          className="px-3 py-2 bg-red-300 text-red-600 rounded-md opacity-50 cursor-not-allowed font-semibold text-sm"
                          disabled
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Details - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                5
              </span>
              Verification Details
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-red-600 mb-1">
                Place <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                placeholder="Place of Execution"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Day <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="DD"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Month <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Month Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="YYYY"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HufForm;
