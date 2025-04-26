import React from "react";

const PassportNameChangeForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-3">
        Passport Name Change Affidavit Form
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Mr/Mrs/Ms Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Relationship
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Relationship</option>
              <option value="S/O">Son of (S/O)</option>
              <option value="D/O">Daughter of (D/O)</option>
              <option value="W/O">Wife of (W/O)</option>
              <option value="H/O">Husband of (H/O)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Age in years"
            />
          </div>
        </div>

        {/* Field for parent/spouse name */}
        {formData.gender && (
          <div className="mt-5">
            <label className="block text-sm font-medium text-red-600 mb-2">
              {formData.gender === "S/O"
                ? "Father's Name"
                : formData.gender === "D/O"
                ? "Father's Name"
                : formData.gender === "W/O"
                ? "Husband's Name"
                : "Wife's Name"}
            </label>
            <input
              type="text"
              name="relatedPersonName"
              value={formData.relatedPersonName || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Related person's full name"
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Permanent Address
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              name="permanentAddress.line1"
              value={formData.permanentAddress.line1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="House/Flat No., Building Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="permanentAddress.line2"
              value={formData.permanentAddress.line2}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Street, Area"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                City
              </label>
              <input
                type="text"
                name="permanentAddress.city"
                value={formData.permanentAddress.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                State
              </label>
              <input
                type="text"
                name="permanentAddress.state"
                value={formData.permanentAddress.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                PIN Code
              </label>
              <input
                type="text"
                name="permanentAddress.pinCode"
                value={formData.permanentAddress.pinCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Present Address
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              name="presentAddress.line1"
              value={formData.presentAddress.line1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="House/Flat No., Building Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="presentAddress.line2"
              value={formData.presentAddress.line2}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Street, Area"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                City
              </label>
              <input
                type="text"
                name="presentAddress.city"
                value={formData.presentAddress.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                State
              </label>
              <input
                type="text"
                name="presentAddress.state"
                value={formData.presentAddress.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                PIN Code
              </label>
              <input
                type="text"
                name="presentAddress.pinCode"
                value={formData.presentAddress.pinCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Identification Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="12-digit Aadhaar Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Passport Number
            </label>
            <input
              type="text"
              name="passportNo"
              value={formData.passportNo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Passport Number"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Name Change Details
        </h3>
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                Current Given Name (as per Aadhaar)
              </label>
              <input
                type="text"
                name="currentGivenName"
                value={formData.currentGivenName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="Current Given Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                Current Surname (as per Aadhaar)
              </label>
              <input
                type="text"
                name="currentSurname"
                value={formData.currentSurname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="Current Surname"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                New Given Name
              </label>
              <input
                type="text"
                name="newGivenName"
                value={formData.newGivenName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="New Given Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                New Surname
              </label>
              <input
                type="text"
                name="newSurname"
                value={formData.newSurname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="New Surname"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Additional Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Place of signing"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportNameChangeForm;
