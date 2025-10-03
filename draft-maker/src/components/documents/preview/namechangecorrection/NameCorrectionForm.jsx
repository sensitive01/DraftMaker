import React from "react";

const NameCorrectionForm = ({ formData, handleChange }) => {
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
    <div className="p-3 sm:p-5 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
      <h1 className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-600">
        Name Change Affidavit Form
      </h1>

      <div className="space-y-6 sm:space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white p-3 sm:p-5 rounded-md shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Full Name (New Name)
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Relation
              </label>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              >
                <option value="S/o">Son of</option>
                <option value="D/o">Daughter of</option>
                <option value="W/o">Wife of</option>
                <option value="H/o">Husband of</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Relation's Name
              </label>
              <input
                type="text"
                name="relationName"
                value={formData.relationName}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                required
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
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              rows="3"
              required
            />
          </div>

          <div className="mt-4 sm:mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Name Change Details Section */}
        <div className="bg-white p-3 sm:p-5 rounded-md shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
            Name Change Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Old Name
              </label>
              <input
                type="text"
                name="oldName"
                value={formData.oldName}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                New Name
              </label>
              <input
                type="text"
                name="newName"
                value={formData.newName}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                required
              />
            </div>
          </div>
        </div>

        {/* Verification Section */}
        <div className="bg-white p-3 sm:p-5 rounded-md shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b-2 border-red-200 pb-2">
            Verification Details
          </h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 pr-0 md:pr-3 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-red-600 mb-1">
                Place of Verification
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="block w-full border border-red-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="flex w-full md:w-2/3 gap-2">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Day
                </label>
                <input
                  type="number"
                  name="day"
                  min="1"
                  max="31"
                  value={formData.day}
                  onChange={handleChange}
                  className="block w-full border border-red-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  required
                />
              </div>

              <div className="w-1/3">
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Month
                </label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="block w-full border border-red-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div className="w-1/3">
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="block w-full border border-red-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCorrectionForm;
