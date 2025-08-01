import React from "react";

const BirthCertificateParentNameCorrectionForm = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Birth Certificate Parents' Name Correction Form
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill the details below to generate your document in realtime
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Parent Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                1
              </span>
              Parent Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Father's Title & Name <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="fatherTitle"
                    value={formData.fatherTitle}
                    onChange={handleChange}
                    className="px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 w-24"
                  >
                    <option>Mr.</option>
                    <option>Dr.</option>
                  </select>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Father's Full Name"
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Mother's Title & Name <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="motherTitle"
                    value={formData.motherTitle}
                    onChange={handleChange}
                    className="px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 w-24"
                  >
                    <option>Mrs.</option>
                    <option>Dr.</option>
                    <option>Ms.</option>
                  </select>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Mother's Full Name"
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete Address with Pin Code"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Father's Aadhaar No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherAadhaar"
                    value={formData.fatherAadhaar}
                    onChange={handleChange}
                    placeholder="0000 0000 0000"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Mother's Aadhaar No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherAadhaar"
                    value={formData.motherAadhaar}
                    onChange={handleChange}
                    placeholder="0000 0000 0000"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Child Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                2
              </span>
              Child Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Child Relation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="childRelation"
                    value={formData.childRelation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option>Daughter's</option>
                    <option>Son's</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Child's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Child's Name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Certificate Serial Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="certificateNumber"
                  value={formData.certificateNumber}
                  onChange={handleChange}
                  placeholder="Birth Certificate Serial Number"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Name Correction Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                3
              </span>
              Name Correction Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Incorrect Father's Name (on Birth Certificate){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="incorrectFatherName"
                    value={formData.incorrectFatherName}
                    onChange={handleChange}
                    placeholder="Incorrect Father's Name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Incorrect Mother's Name (on Birth Certificate){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="incorrectMotherName"
                    value={formData.incorrectMotherName}
                    onChange={handleChange}
                    placeholder="Incorrect Mother's Name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Correct Father's Name (as per Aadhaar){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="correctFatherName"
                    value={formData.correctFatherName}
                    onChange={handleChange}
                    placeholder="Correct Father's Name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Correct Mother's Name (as per Aadhaar){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="correctMotherName"
                    value={formData.correctMotherName}
                    onChange={handleChange}
                    placeholder="Correct Mother's Name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Place of Verification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="City/Town"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Day <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    min="1"
                    max="31"
                    placeholder="DD"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Month <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="YYYY"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCertificateParentNameCorrectionForm;
