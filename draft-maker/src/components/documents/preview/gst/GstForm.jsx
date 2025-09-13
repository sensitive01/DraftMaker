import React from "react";

const GstForm = ({ formData, handleChange }) => {
  const requiredFieldStyle = "text-red-600 font-medium";

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700 border-b pb-2">
        GST NOC Form
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Fields marked with <span className="text-red-600">*</span> are required
      </p>

      <div className="space-y-4">
        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Property Owner Name *
          </label>
          <input
            type="text"
            name="ownerName"
            value={formData?.ownerName}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Aadhaar Number *
          </label>
          <input
            type="text"
            name="aadhaarNo"
            value={formData?.aadhaarNo}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Owner Address *
          </label>
          <textarea
            name="ownerAddress"
            value={formData?.ownerAddress}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            rows="2"
            required
          ></textarea>
        </div>

        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Premises Address *
          </label>
          <textarea
            name="premisesAddress"
            value={formData?.premisesAddress}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            rows="2"
            required
          ></textarea>
        </div>

        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Proprietor Name *
          </label>
          <input
            type="text"
            name="tenantName"
            value={formData?.tenantName}
            onChange={handleChange}
            placeholder="Enter Proprietor Name"
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Company/Firm Name *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData?.companyName}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label
            className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
          >
            Office Address *
          </label>
          <textarea
            name="officeAddress"
            value={formData?.officeAddress}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
            rows="2"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
            >
              Place *
            </label>
            <input
              type="text"
              name="place"
              value={formData?.place}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
            >
              Day *
            </label>
            <input
              type="text"
              name="day"
              value={formData?.day}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
              placeholder="DD"
              required
            />
          </div>
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
            >
              Month *
            </label>
            <input
              type="text"
              name="month"
              value={formData?.month}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
              placeholder="Month"
              required
            />
          </div>
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base ${requiredFieldStyle}`}
            >
              Year *
            </label>
            <input
              type="text"
              name="year"
              value={formData?.year}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition text-sm sm:text-base"
              placeholder="YYYY"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstForm;
