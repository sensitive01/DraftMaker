import React from "react";

const GstForm = ({ formData, handleChange }) => {
  const requiredFieldStyle = "text-red-600 font-medium";

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">
        GST NOC Form
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Fields marked with <span className="text-red-600">*</span> are required
      </p>

      <form className="space-y-4">
        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Property Owner Name *
          </label>
          <input
            type="text"
            name="ownerName"
            value={formData?.ownerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Aadhaar Number *
          </label>
          <input
            type="text"
            name="aadhaarNo"
            value={formData?.aadhaarNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Owner Address *
          </label>
          <textarea
            name="ownerAddress"
            value={formData?.ownerAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            rows="2"
            required
          ></textarea>
        </div>

        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Premises Address *
          </label>
          <textarea
            name="premisesAddress"
            value={formData?.premisesAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            rows="2"
            required
          ></textarea>
        </div>

        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Tenant Name *
          </label>
          <input
            type="text"
            name="tenantName"
            value={formData?.tenantName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Company/Firm Name *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData?.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className={`block mb-1 ${requiredFieldStyle}`}>
            Office Address *
          </label>
          <textarea
            name="officeAddress"
            value={formData?.officeAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            rows="2"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1">
            <label className={`block mb-1 ${requiredFieldStyle}`}>
              Place *
            </label>
            <input
              type="text"
              name="place"
              value={formData?.place}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
              required
            />
          </div>
          <div className="col-span-1">
            <label className={`block mb-1 ${requiredFieldStyle}`}>Day *</label>
            <input
              type="text"
              name="day"
              value={formData?.day}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
              placeholder="DD"
              required
            />
          </div>
          <div className="col-span-1">
            <label className={`block mb-1 ${requiredFieldStyle}`}>
              Month *
            </label>
            <input
              type="text"
              name="month"
              value={formData?.month}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
              placeholder="Month"
              required
            />
          </div>
          <div className="col-span-1">
            <label className={`block mb-1 ${requiredFieldStyle}`}>Year *</label>
            <input
              type="text"
              name="year"
              value={formData?.year}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
              placeholder="YYYY"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GstForm;
