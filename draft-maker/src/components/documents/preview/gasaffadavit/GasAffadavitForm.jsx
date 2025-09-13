import React from "react";

const GasAffidavitForm = ({ formData, handleChange }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Gas Affidavit Form
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
                name="fatherName"
                value={formData.fatherName || ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
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

            <div>
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
        </div>

        {/* Connection Details Section */}
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Connection Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Gas Company Name
              </label>
              <input
                type="text"
                name="gasCompanyName"
                value={formData.gasCompanyName}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Date of Connection
              </label>
              <input
                type="date"
                name="connectionDate"
                value={formData.connectionDate}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Gas Consumer Address 
            </label>
            <textarea
              name="serviceAddress"
              value={formData.serviceAddress}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Consumer Number
              </label>
              <input
                type="text"
                name="consumerNumber"
                value={formData.consumerNumber}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Subscription Voucher No
              </label>
              <input
                type="text"
                name="subscriptionVoucher"
                value={formData.subscriptionVoucher}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Deposit Amount (₹)
              </label>
              <input
                type="number"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Number of Cylinders
              </label>
              <input
                type="number"
                name="cylinderCount"
                value={formData.cylinderCount}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Number of Regulators
              </label>
              <input
                type="number"
                name="regulatorCount"
                value={formData.regulatorCount}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Additional Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Previous Address (before shifting)
            </label>
            <textarea
              name="previousAddress"
              value={formData.previousAddress}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Reason for Termination
            </label>
            <div className="mt-2 space-y-2 pl-4">
              <div className="flex items-center">
                <input
                  id="reason-shifting"
                  name="reason"
                  type="radio"
                  value="shifting"
                  checked={formData.reason === "shifting"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="reason-shifting"
                  className="ml-3 block text-sm text-gray-700"
                >
                  I am shifting my residence from this town
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="reason-terminate"
                  name="reason"
                  type="radio"
                  value="terminate"
                  checked={formData.reason === "terminate"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="reason-terminate"
                  className="ml-3 block text-sm text-gray-700"
                >
                  I want to terminate the agreement
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-red-600 mb-1">
              Lost Item
            </label>
            <div className="mt-2 space-y-2 pl-4">
              <div className="flex items-center">
                <input
                  id="lost-subscription"
                  name="lostItem"
                  type="radio"
                  value="subscription"
                  checked={formData.lostItem === "subscription"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="lost-subscription"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Subscription Voucher is misplaced/lost
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="lost-termination"
                  name="lostItem"
                  type="radio"
                  value="termination"
                  checked={formData.lostItem === "termination"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="lost-termination"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Termination Voucher is misplaced/lost
                </label>
              </div>
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

export default GasAffidavitForm;
