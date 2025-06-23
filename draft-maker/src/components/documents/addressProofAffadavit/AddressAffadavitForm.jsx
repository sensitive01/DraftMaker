import React from "react";

const AddressAffidavitForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
        Affidavit Form
      </h2>

      {/* Personal Details Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4">
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Mr/Mrs/Ms Full Name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Relationship *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            >
              <option value="">Select Relationship</option>
              <option value="S/O">Son of (S/O)</option>
              <option value="D/O">Daughter of (D/O)</option>
              <option value="W/O">Wife of (W/O)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Age in years"
            />
          </div>
          {formData.gender && (
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                {formData.gender === "S/O"
                  ? "Father's Name *"
                  : formData.gender === "D/O"
                  ? "Father's Name *"
                  : "Husband's Name *"}
              </label>
              <input
                type="text"
                name="relatedPersonName"
                value={formData.relatedPersonName || ""}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder={
                  formData.gender === "W/O"
                    ? "Husband's full name"
                    : "Father's full name"
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Permanent Address Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
          Permanent Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="permanentAddress.line1"
              value={formData.permanentAddress.line1}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="House/Flat No., Building Name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              name="permanentAddress.line2"
              value={formData.permanentAddress.line2}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Street, Area"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              City *
            </label>
            <input
              type="text"
              name="permanentAddress.city"
              value={formData.permanentAddress.city}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              State *
            </label>
            <input
              type="text"
              name="permanentAddress.state"
              value={formData.permanentAddress.state}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              PIN Code *
            </label>
            <input
              type="text"
              name="permanentAddress.pinCode"
              value={formData.permanentAddress.pinCode}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
        </div>
      </div>

      {/* Present Address Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
          Present Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="presentAddress.line1"
              value={formData.presentAddress.line1}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="House/Flat No., Building Name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              name="presentAddress.line2"
              value={formData.presentAddress.line2}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Street, Area"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              City *
            </label>
            <input
              type="text"
              name="presentAddress.city"
              value={formData.presentAddress.city}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              State *
            </label>
            <input
              type="text"
              name="presentAddress.state"
              value={formData.presentAddress.state}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              PIN Code *
            </label>
            <input
              type="text"
              name="presentAddress.pinCode"
              value={formData.presentAddress.pinCode}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
        </div>
      </div>

      {/* Other Details Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
          Other Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Aadhaar Number *
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="12-digit Aadhaar Number"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Residing Since *
            </label>
            <input
              type="text"
              name="currentResidenceAddress"
              value={formData.currentResidenceAddress}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Date since when residing (DD/MM/YYYY)"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Company name for this affidavit"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Purpose of Affidavit *
            </label>
            <input
              type="text"
              name="purposeOfAffidavit"
              value={formData.purposeOfAffidavit}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="e.g. Address Proof"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-red-600 mb-1">
              Place *
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
              placeholder="Place of signing"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAffidavitForm;
