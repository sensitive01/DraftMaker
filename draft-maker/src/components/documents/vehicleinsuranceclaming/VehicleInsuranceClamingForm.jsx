import { useState } from "react";

const VehicleInsuranceClaimForm = ({ formData, handleChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      <div className="bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold text-center">
          Vehicle Insurance Claim Form
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Please complete all required fields to process your claim
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-red-600 border-b pb-3">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Relation <span className="text-red-500">*</span>
              </label>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0000 0000 0000"
              maxLength="14"
              required
            />
          </div>
        </div>

        {/* Vehicle Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-red-600 border-b pb-3">
            Vehicle Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Vehicle Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Engine Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="engineNo"
                value={formData.engineNo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Chassis Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="chassisNo"
                value={formData.chassisNo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Insurance Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-red-600 border-b pb-3">
            Insurance Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Insurance Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="insurer"
                value={formData.insurer}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Policy Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="policyNo"
                value={formData.policyNo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Policy Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="policyStart"
                value={formData.policyStart}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Policy End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="policyEnd"
                value={formData.policyEnd}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Accident Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-red-600 border-b pb-3">
            Accident Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Driver Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Accident Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="accidentDetails"
                value={formData.accidentDetails}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide detailed information about the accident including date, time, location, and circumstances"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Verification Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-red-600 border-b pb-3">
            Verification Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Place <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Day <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="31"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Month <span className="text-red-500">*</span>
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="2023"
                max="2030"
                required
              />
            </div>
          </div>
        </div>

       
      </form>

      <div className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
        Please ensure all information provided is accurate and complete.
      </div>
    </div>
  );
};

export default VehicleInsuranceClaimForm;
