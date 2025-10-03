import { useState } from "react";

const VehicleInsuranceClaimForm = ({ formData, handleChange }) => {
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
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
        Vehicle Insurance Claim Form
      </h2>

      <div>
        {/* Personal Information Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Relation <span className="text-red-500">*</span>
              </label>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              >
                <option value="">Select</option>
                <option value="D/o">Daughter of</option>
                <option value="S/o">Son of</option>
                <option value="W/o">Wife of</option>
                <option value="H/o">Husband of</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Enter guardian name"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Aadhaar Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="aadhaarNo"
                value={formData.aadhaarNo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="0000 0000 0000"
                maxLength="14"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-red-600 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded h-24 focus:ring-1 focus:ring-red-400 focus:border-red-400"
              required
            ></textarea>
          </div>
        </div>

        {/* Vehicle Details Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
            Vehicle Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Vehicle Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Engine Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="engineNo"
                value={formData.engineNo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Chassis Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="chassisNo"
                value={formData.chassisNo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Insurance Details Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
            Insurance Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Insurance Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="insurer"
                value={formData.insurer}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Policy Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="policyNo"
                value={formData.policyNo}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Policy Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="policyStart"
                value={formData.policyStart}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Policy End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="policyEnd"
                value={formData.policyEnd}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Accident Details Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
            Accident Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Driver Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Accident Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="accidentDetails"
                value={formData.accidentDetails}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded h-36 focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Please provide detailed information about the accident including date, time, location, and circumstances"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Party Names & Stamp Duty Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
            Party Names & Stamp Duty
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Who will pay the Stamp Duty?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstParty"
                value={formData.firstParty}
                onChange={handlePartyNameChange}
                maxLength={50}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Enter first party name (letters, spaces, commas only)"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.firstParty?.length || 0}/50 characters
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Second Party Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="secondParty"
                value={formData.secondParty}
                onChange={handlePartyNameChange}
                maxLength={50}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                placeholder="Enter second party name (letters, spaces, commas only)"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.secondParty?.length || 0}/50 characters
              </p>
            </div>

            <p className="text-xs text-red-600 italic">
              ℹ️ Please enter the names of both parties to the agreement. Only
              letters, spaces, and commas are allowed (max 50 characters each).
            </p>
          </div>
        </div>

        {/* Verification Details Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
            Verification Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Place <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Day <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                min="1"
                max="31"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-red-600 mb-1">
                Month <span className="text-red-500">*</span>
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                required
              >
                <option value="">Select</option>
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
              <label className="block text-xs font-medium text-red-600 mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-400 focus:border-red-400"
                min="2023"
                max="2030"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsuranceClaimForm;
