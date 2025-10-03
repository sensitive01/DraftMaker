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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mx-2 sm:mx-4 lg:mx-auto lg:max-w-6xl">
      <div className="p-3 sm:p-6">
        {/* Personal Information Section */}
        <div className="mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Title*
              </label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
            </div>

            <div className="sm:col-span-1 lg:col-span-2">
              <label className="block text-xs font-medium text-red-600 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Your Full Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Relation*
              </label>
              <select
                name="relationTo"
                value={formData.relationTo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              >
                <option value="">Select</option>
                <option value="D/o">Daughter of</option>
                <option value="S/o">Son of</option>
                <option value="W/o">Wife of</option>
                <option value="H/o">Husband of</option>
              </select>
            </div>

            <div className="sm:col-span-1 lg:col-span-2">
              <label className="block text-xs font-medium text-red-600 mb-1">
                Relation Name*
              </label>
              <input
                type="text"
                name="relationName"
                value={formData.relationName}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Father/Mother/Spouse Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Your Age"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Aadhaar Number*
              </label>
              <input
                type="text"
                name="aadhaarNo"
                value={formData.aadhaarNo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="0000 0000 0000"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
            Address Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Address Line 1*
              </label>
              <input
                type="text"
                name="address.line1"
                value={formData.address.line1}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="House/Flat No., Building Name, Street"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                name="address.line2"
                value={formData.address.line2}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Area, Landmark"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-red-600 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-red-600 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                  placeholder="State"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-red-600 mb-1">
                  Pin Code*
                </label>
                <input
                  type="text"
                  name="address.pinCode"
                  value={formData.address.pinCode}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                  placeholder="Pin Code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* HUF Details */}
        <div className="mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
            HUF Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                HUF Name*
              </label>
              <input
                type="text"
                name="hufName"
                value={formData.hufName}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="HUF Name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                HUF Existence Date*
              </label>
              <input
                type="date"
                name="hufExistenceDate"
                value={formData.hufExistenceDate}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              />
            </div>
          </div>
        </div>

        {/* Coparceners Section - Mobile-first responsive design */}
        <div className="mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-l-4 border-red-500 pl-3">
              Coparceners Details
            </h3>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {formData.coparceners.length > 0 ? (
              formData.coparceners.map((coparcener, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Member {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCoparcener(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      title="Remove Coparcener"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={coparcener.name}
                        onChange={(e) =>
                          handleCoparcenerChange(index, "name", e.target.value)
                        }
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Relationship
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
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                        placeholder="Relationship"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Address
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
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Member 1
                  </span>
                  <button
                    type="button"
                    className="text-red-400 opacity-50 cursor-not-allowed p-1"
                    disabled
                    title="Cannot remove first row"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value=""
                      onChange={(e) =>
                        handleCoparcenerChange(0, "name", e.target.value)
                      }
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Relationship
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
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                      placeholder="Relationship"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value=""
                      onChange={(e) =>
                        handleCoparcenerChange(0, "address", e.target.value)
                      }
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                      placeholder="Address"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            {/* Table Header */}
            <div className="bg-gray-100 p-2 rounded-t-lg border border-gray-200 text-xs font-medium text-gray-700 flex items-center">
              <div className="w-12 text-center">#</div>
              <div className="flex-1 px-2">Name</div>
              <div className="flex-1 px-2">Relationship</div>
              <div className="flex-1 px-2">Address</div>
              <div className="w-16 text-center">Actions</div>
            </div>

            {/* Coparceners Table */}
            <div className="border-x border-gray-200">
              {formData.coparceners.length > 0 ? (
                formData.coparceners.map((coparcener, index) => (
                  <div
                    key={index}
                    className={`flex items-center border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <div className="w-12 text-center font-medium text-gray-700 p-2 text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1 px-2 py-1">
                      <input
                        type="text"
                        value={coparcener.name}
                        onChange={(e) =>
                          handleCoparcenerChange(index, "name", e.target.value)
                        }
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="flex-1 px-2 py-1">
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
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                        placeholder="Relationship"
                      />
                    </div>
                    <div className="flex-1 px-2 py-1">
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
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                        placeholder="Address"
                      />
                    </div>
                    <div className="w-16 flex justify-center space-x-1">
                      <button
                        type="button"
                        onClick={() => removeCoparcener(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        title="Remove Coparcener"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Default first row
                <div className="flex items-center border-b border-gray-200 bg-white">
                  <div className="w-12 text-center font-medium text-gray-700 p-2 text-xs">
                    1
                  </div>
                  <div className="flex-1 px-2 py-1">
                    <input
                      type="text"
                      value=""
                      onChange={(e) =>
                        handleCoparcenerChange(0, "name", e.target.value)
                      }
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="flex-1 px-2 py-1">
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
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                      placeholder="Relationship"
                    />
                  </div>
                  <div className="flex-1 px-2 py-1">
                    <input
                      type="text"
                      value=""
                      onChange={(e) =>
                        handleCoparcenerChange(0, "address", e.target.value)
                      }
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                      placeholder="Address"
                    />
                  </div>
                  <div className="w-16 flex justify-center">
                    <button
                      type="button"
                      className="text-red-400 opacity-50 cursor-not-allowed p-1"
                      disabled
                      title="Cannot remove first row"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Table footer with add button */}
            <div className="border border-t-0 border-gray-200 rounded-b-lg py-2 px-3 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={addCoparcener}
                className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 flex items-center text-xs"
                title="Add Coparcener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Member
              </button>
            </div>
          </div>

          {/* Mobile Add Button */}
          <div className="block sm:hidden">
            <button
              type="button"
              onClick={addCoparcener}
              className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 flex items-center justify-center text-sm"
              title="Add Coparcener"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Member
            </button>
          </div>
        </div>

        {/* Verification Details */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
            Verification Details
          </h3>

          <div className="mb-4">
            <label className="block text-xs font-medium text-red-600 mb-1">
              Place*
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Place of Execution"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Day*
              </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="DD"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Month*
              </label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Month Name"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-medium text-red-600 mb-1">
                Year*
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="YYYY"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HufForm;
