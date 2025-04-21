export default function GapPeriodForm({
  formData,
  handleGapPeriodChange,
  handleChange,
  addGapPeriod,
  removeGapPeriod,
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center text-red-600">
        Gap Period Affidavit Form
      </h1>

      <form>
        {/* Personal Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3 text-red-600">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Relation Type
              </label>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
              >
                <option value="S/o">Son of</option>
                <option value="D/o">Daughter of</option>
                <option value="W/o">Wife of</option>
                <option value="H/o">Husband of</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Relation Name
              </label>
              <input
                type="text"
                name="relationName"
                value={formData.relationName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Father/Mother/Spouse Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Your Age"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-red-600 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                rows="2"
                placeholder="Your Complete Address"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Aadhaar Number
              </label>
              <input
                type="text"
                name="aadhaarNo"
                value={formData.aadhaarNo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="0000 0000 0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Authority Name
              </label>
              <input
                type="text"
                name="authority"
                value={formData.authority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Authority Name"
              />
            </div>
          </div>
        </div>

        {/* Gap Period Details */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-red-600">
              Gap Period Details
            </h2>
            <button
              type="button"
              onClick={addGapPeriod}
              className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-red-600">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-red-600">
                    From
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-red-600">
                    To
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-red-600">
                    Reason
                  </th>
                  <th className="px-4 py-2 text-xs font-medium text-red-600 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {formData.gapPeriods.map((period, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={period.from}
                        onChange={(e) =>
                          handleGapPeriodChange(index, "from", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={period.to}
                        onChange={(e) =>
                          handleGapPeriodChange(index, "to", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={period.reason}
                        onChange={(e) =>
                          handleGapPeriodChange(index, "reason", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        placeholder="Reason"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        onClick={() => removeGapPeriod(index)}
                        className="p-1 text-red-500 hover:text-red-700 rounded-full"
                        disabled={formData.gapPeriods.length === 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Details */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3 text-red-600">
            Verification Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Place
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Place"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="DD"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Month
              </label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Month"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="YYYY"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
