import React from "react";

const DobCorrectionForm = ({ formData, handleChange }) => {
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
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Date of Birth Affidavit Form
      </h1>

      <form className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
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
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
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
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
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
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* First Document Section */}
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            First Document Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob1"
                value={formData.dob1}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Document Name
              </label>
              <input
                type="text"
                name="document1"
                value={formData.document1}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Birth Certificate, School Certificate"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Document Serial No.
              </label>
              <input
                type="text"
                name="documentNo1"
                value={formData.documentNo1}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Second Document Section */}
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Second Document Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob2"
                value={formData.dob2}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Document Name
              </label>
              <input
                type="text"
                name="document2"
                value={formData.document2}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Passport, Aadhar Card"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Document Serial No.
              </label>
              <input
                type="text"
                name="documentNo2"
                value={formData.documentNo2}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Verification Section */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Verification Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Place of Verification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Day <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="day"
                min="1"
                max="31"
                value={formData.day}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Month <span className="text-red-500">*</span>
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              <label className="block text-sm font-medium text-red-600 mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DobCorrectionForm;
