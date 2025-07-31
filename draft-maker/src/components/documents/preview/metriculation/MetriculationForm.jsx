import React from "react";

const MetriculationForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
        Enter Details
      </h2>

      {/* Personal Details */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Personal Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Full Name
            </label>
            <div className="flex gap-2">
              <select
                name="namePrefix"
                value={formData.namePrefix || ""}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Relation (D/o, S/o, W/o, H/o)
            </label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter relation and relative's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Age (Years)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter permanent address"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0000 0000 0000"
            />
          </div>
        </div>
      </div>

      {/* Document Details */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Lost Document Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 10th"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Semester
              </label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 2nd"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Program/Course Name
            </label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Science, Arts, Commerce"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Issuing Authority
            </label>
            <input
              type="text"
              name="authority"
              value={formData.authority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. State Board of Education"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Name of College/Institution
            </label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter college name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Batch/Year
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter registration number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Document Name
            </label>
            <input
              type="text"
              name="documentName"
              value={formData.documentName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Matriculation Certificate"
            />
          </div>
        </div>
      </div>

      {/* Verification Details */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Verification Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Bangalore"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 15"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. April"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Year
              </label>
              <input
                type="text"
                name="year_verification"
                value={formData.year_verification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 2025"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetriculationForm;
