import React from "react";

const AddressAffidavitForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Address Affidavit
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
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
              
              {formData.gender && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    {formData.gender === "S/O"
                      ? "Father's Name"
                      : formData.gender === "D/O"
                      ? "Father's Name"
                      : "Husband's Name"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="relatedPersonName"
                    value={formData.relatedPersonName || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
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

          {/* Permanent Address Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">2</span>
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
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">3</span>
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

          {/* Other Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">4</span>
              Other Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Residing Since <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="currentResidenceAddress"
                  value={formData.currentResidenceAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Date since when residing (DD/MM/YYYY)"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Company name for this affidavit"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Purpose of Affidavit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="purposeOfAffidavit"
                  value={formData.purposeOfAffidavit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="e.g. Address Proof"
                />
              </div>
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

export default AddressAffidavitForm;