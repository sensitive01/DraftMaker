const JoinKhataTransferForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
        Enter Details
      </h2>

      {/* First Applicant */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          First Applicant
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name1"
              value={formData.name1}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Relation (D/o, S/o, W/o, H/o)
            </label>
            <input
              type="text"
              name="relation1"
              value={formData.relation1}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter relation and relative's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Age (Years)
            </label>
            <input
              type="number"
              name="age1"
              value={formData.age1}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Address
            </label>
            <textarea
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter permanent address"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaar1"
              value={formData.aadhaar1}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0000 0000 0000"
            />
          </div>
        </div>
      </div>

      {/* Second Applicant */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Second Applicant
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name2"
              value={formData.name2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Relation (D/o, S/o, W/o, H/o)
            </label>
            <input
              type="text"
              name="relation2"
              value={formData.relation2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter relation and relative's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Age (Years)
            </label>
            <input
              type="number"
              name="age2"
              value={formData.age2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Address
            </label>
            <textarea
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter permanent address"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaar2"
              value={formData.aadhaar2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0000 0000 0000"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Property Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Property Address
            </label>
            <textarea
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter property address"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Ward Number
              </label>
              <input
                type="text"
                name="wardNumber"
                value={formData.wardNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Zone
              </label>
              <input
                type="text"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. East"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Khata Number
              </label>
              <input
                type="text"
                name="khataNo"
                value={formData.khataNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Khata No."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                SAS Application Number
              </label>
              <input
                type="text"
                name="sasNumber"
                value={formData.sasNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter SAS No."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Authorization */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Authorization
        </h3>
        <div>
          <label className="block text-sm font-medium text-red-600 mb-1">
            Name of Authorized Person for e-signing
          </label>
          <input
            type="text"
            name="authorizedPerson"
            value={formData.authorizedPerson}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter authorized person's name"
          />
        </div>
      </div>

      {/* Verification Details */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-4 text-indigo-700">
          Verification Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Bangalore"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Month
              </label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. April"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 2025"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinKhataTransferForm;
