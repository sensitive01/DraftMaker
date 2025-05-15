import React from "react";

const AddressAffidavitForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3 text-center">
        Affidavit Form
      </h2>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="Mr/Mrs/Ms Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Relationship *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
            >
              <option value="">Select Relationship</option>
              <option value="S/O">Son of (S/O)</option>
              <option value="D/O">Daughter of (D/O)</option>
              <option value="W/O">Wife of (W/O)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="Age in years"
            />
          </div>
        </div>

        {/* Field for parent/spouse name */}
        {formData.gender && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-red-600 mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder={
                formData.gender === "W/O"
                  ? "Husband's full name"
                  : "Father's full name"
              }
            />
          </div>
        )}
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
          Permanent Address
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="permanentAddress.line1"
              value={formData.permanentAddress.line1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="Street, Area"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                City *
              </label>
              <input
                type="text"
                name="permanentAddress.city"
                value={formData.permanentAddress.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                State *
              </label>
              <input
                type="text"
                name="permanentAddress.state"
                value={formData.permanentAddress.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                PIN Code *
              </label>
              <input
                type="text"
                name="permanentAddress.pinCode"
                value={formData.permanentAddress.pinCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
          Present Address
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="presentAddress.line1"
              value={formData.presentAddress.line1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="Street, Area"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                City *
              </label>
              <input
                type="text"
                name="presentAddress.city"
                value={formData.presentAddress.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                State *
              </label>
              <input
                type="text"
                name="presentAddress.state"
                value={formData.presentAddress.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                PIN Code *
              </label>
              <input
                type="text"
                name="presentAddress.pinCode"
                value={formData.presentAddress.pinCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
          Other Details
        </h3>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Aadhaar Number *
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="12-digit Aadhaar Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Residing Since *
            </label>
            <input
              type="text"
              name="currentResidenceAddress"
              value={formData.currentResidenceAddress}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="Date since when residing at present address (DD/MM/YYYY)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="Name of the company this affidavit is for"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">
              Purpose of Affidavit *
            </label>
            <input
              type="text"
              name="purposeOfAffidavit"
              value={formData.purposeOfAffidavit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              placeholder="e.g. Address Proof"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">
                Place *
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400"
                placeholder="Place of signing"
              />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AddressAffidavitForm;
