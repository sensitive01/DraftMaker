export default function GapPeriodForm({
  formData,
  handleGapPeriodChange,
  handleChange,
  addGapPeriod,
  removeGapPeriod,
}) {
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
              Gap Period Affidavit Form
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Name <span className="text-red-500">*</span>
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

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relation Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white"
                >
                  <option value="S/o">Son of</option>
                  <option value="D/o">Daughter of</option>
                  <option value="W/o">Wife of</option>
                  <option value="H/o">Husband of</option>
                </select>
              </div>

              <div>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  rows="3"
                  placeholder="Your Complete Address"
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

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Authority Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Authority Name"
                />
              </div>
            </div>
          </div>

          {/* Gap Period Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-3 sm:mb-0 flex items-center">
                <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                  2
                </span>
                Gap Period Details
              </h2>
              <button
                type="button"
                onClick={addGapPeriod}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transform hover:scale-105 transition-all duration-200 shadow-sm"
              >
                + Add Gap Period
              </button>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
              {formData.gapPeriods.map((period, index) => (
                <div
                  key={index}
                  className="border border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-bold text-red-700">
                      Period #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeGapPeriod(index)}
                      className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 focus:outline-none transition-all duration-200"
                      disabled={formData.gapPeriods.length === 1}
                    >
                      X
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        From <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={period.from}
                        onChange={(e) =>
                          handleGapPeriodChange(index, "from", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        To <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={period.to}
                        onChange={(e) =>
                          handleGapPeriodChange(index, "to", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-red-600 mb-1">
                        Reason <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={period.reason}
                        onChange={(e) =>
                          handleGapPeriodChange(index, "reason", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="Reason for gap period"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
                      From
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-600 border-b border-red-200">
                      To
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-600 border-b border-red-200">
                      Reason
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-red-600 border-b border-red-200 w-20">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.gapPeriods.map((period, index) => (
                    <tr key={index} className="border-b border-red-100">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          value={period.from}
                          onChange={(e) =>
                            handleGapPeriodChange(index, "from", e.target.value)
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="date"
                          value={period.to}
                          onChange={(e) =>
                            handleGapPeriodChange(index, "to", e.target.value)
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={period.reason}
                          onChange={(e) =>
                            handleGapPeriodChange(
                              index,
                              "reason",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          placeholder="Reason for gap period"
                        />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeGapPeriod(index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all duration-200 font-semibold text-sm"
                          disabled={formData.gapPeriods.length === 1}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Party Names & Stamp Duty Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                📄
              </span>
              Party Names & Stamp Duty
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Who will pay the Stamp Duty?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstParty"
                  value={formData.firstParty}
                  onChange={handlePartyNameChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter first party name (letters, spaces, commas only)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.firstParty?.length || 0}/50 characters
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Second Party Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="secondParty"
                  value={formData.secondParty}
                  onChange={handlePartyNameChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter second party name (letters, spaces, commas only)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.secondParty?.length || 0}/50 characters
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-red-600 italic">
              ℹ️ Please enter the names of both parties to the agreement. Only
              letters, spaces, and commas are allowed (max 50 characters each).
            </p>
          </div>

          {/* Verification Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                3
              </span>
              Verification Details
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Place"
                />
              </div>
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
                  placeholder="Month"
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
}
