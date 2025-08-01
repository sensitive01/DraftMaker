import React from "react";

const MetriculationForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Matriculation Certificate Form
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
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">1</span>
              Personal Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="namePrefix"
                    value={formData.namePrefix || ""}
                    onChange={handleChange}
                    className="px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="">Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relation (D/o, S/o, W/o, H/o) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter relation and relative's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  placeholder="Enter permanent address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="0000 0000 0000"
                />
              </div>
            </div>
          </div>

          {/* Document Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">2</span>
              Lost Document Details
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="e.g. 10th"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. 2nd"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Program/Course Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="e.g. Science, Arts, Commerce"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Issuing Authority <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="e.g. State Board of Education"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Name of College/Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter college name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Batch/Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. 2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="regNumber"
                    value={formData.regNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter registration number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Document Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="documentName"
                  value={formData.documentName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="e.g. Matriculation Certificate"
                />
              </div>
            </div>
          </div>

          {/* Verification Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">3</span>
              Verification Details
            </h2>
            
            <div className="space-y-4">
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
                  placeholder="e.g. Bangalore"
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
                    placeholder="e.g. 15"
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
                    placeholder="e.g. April"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="year_verification"
                    value={formData.year_verification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. 2025"
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

export default MetriculationForm;