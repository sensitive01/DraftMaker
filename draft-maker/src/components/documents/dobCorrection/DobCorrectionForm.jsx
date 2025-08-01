import React from "react";

const DobCorrectionForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Date of Birth Affidavit Form
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

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData?.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Relation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="relation"
                    value={formData?.relation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="S/o">Son of</option>
                    <option value="D/o">Daughter of</option>
                    <option value="W/o">Wife of</option>
                    <option value="H/o">Husband of</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Relation's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="relationName"
                    value={formData?.relationName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData?.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadhaarNo"
                    value={formData?.aadhaarNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="0000 0000 0000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData?.permanentAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  rows="3"
                  placeholder="Enter complete permanent address"
                  required
                />
              </div>
            </div>
          </div>

          {/* First Document Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                2
              </span>
              First Document Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob1"
                  value={formData?.dob1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Document Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="document1"
                  value={formData?.document1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="e.g. Birth Certificate, School Certificate"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Document Serial No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="documentNo1"
                  value={formData?.documentNo1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Document serial number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Second Document Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                3
              </span>
              Second Document Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob2"
                  value={formData?.dob2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Document Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="document2"
                  value={formData?.document2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="e.g. Passport, Aadhar Card"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Document Serial No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="documentNo2"
                  value={formData?.documentNo2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Document serial number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Verification Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                4
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
                  value={formData?.place}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Place"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Day <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="day"
                  min="1"
                  max="31"
                  value={formData?.day}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="DD"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Month <span className="text-red-500">*</span>
                </label>
                <select
                  name="month"
                  value={formData?.month}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
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
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData?.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="YYYY"
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

export default DobCorrectionForm;
