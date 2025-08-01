import React from "react";

const PassportNameChangeForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Passport Name Change Affidavit Form
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill the details below to generate your document in realtime
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Personal Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                1
              </span>
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name (as per Aadhaar){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Mr/Mrs/Ms Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                >
                  <option value="">Select Relationship</option>
                  <option value="S/O">Son of (S/O)</option>
                  <option value="D/O">Daughter of (D/O)</option>
                  <option value="W/O">Wife of (W/O)</option>
                  <option value="H/O">Husband of (H/O)</option>
                </select>
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
                  placeholder="Age in years"
                />
              </div>
            </div>

            {/* Dynamic field for parent/spouse name */}
            {formData.gender && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  {formData.gender === "S/O"
                    ? "Father's Name"
                    : formData.gender === "D/O"
                    ? "Father's Name"
                    : formData.gender === "W/O"
                    ? "Husband's Name"
                    : "Wife's Name"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="relatedPersonName"
                  value={formData.relatedPersonName || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Related person's full name"
                />
              </div>
            )}
          </div>

          {/* Permanent Address Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                2
              </span>
              Permanent Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.line1"
                  value={formData.permanentAddress.line1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="House/Flat No., Building Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="permanentAddress.line2"
                  value={formData.permanentAddress.line2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Street, Area"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.city"
                  value={formData.permanentAddress.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.state"
                  value={formData.permanentAddress.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.pinCode"
                  value={formData.permanentAddress.pinCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Present Address Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                3
              </span>
              Present Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="presentAddress.line1"
                  value={formData.presentAddress.line1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="House/Flat No., Building Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="presentAddress.line2"
                  value={formData.presentAddress.line2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Street, Area"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="presentAddress.city"
                  value={formData.presentAddress.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="presentAddress.state"
                  value={formData.presentAddress.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="presentAddress.pinCode"
                  value={formData.presentAddress.pinCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Identification Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                4
              </span>
              Identification Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="12-digit Aadhaar Number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Passport Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="passportNo"
                  value={formData.passportNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Passport Number"
                />
              </div>
            </div>
          </div>

          {/* Name Change Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                5
              </span>
              Name Change Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Current Given Name (as per present passport){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentGivenName"
                    value={formData.currentGivenName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Current Given Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Current Surname (as per present passport){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentSurname"
                    value={formData.currentSurname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Current Surname"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    New Correct Given Name (for passport){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="newGivenName"
                    value={formData.newGivenName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="New Given Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    New Correct Surname (for passport){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="newSurname"
                    value={formData.newSurname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="New Surname"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                6
              </span>
              Additional Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
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
                  placeholder="Place of signing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportNameChangeForm;
