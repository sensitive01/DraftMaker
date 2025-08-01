const JoinKhataTransferForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Join Khata Transfer Form
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill the details below to generate your document in realtime
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* First Applicant Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">1</span>
              First Applicant
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name1"
                  value={formData.name1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relation (D/o, S/o, W/o, H/o) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="relation1"
                  value={formData.relation1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter relation and relative's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age1"
                  value={formData.age1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  placeholder="Enter permanent address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhaar1"
                  value={formData.aadhaar1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="0000 0000 0000"
                />
              </div>
            </div>
          </div>

          {/* Second Applicant Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">2</span>
              Second Applicant
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name2"
                  value={formData.name2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Relation (D/o, S/o, W/o, H/o) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="relation2"
                  value={formData.relation2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter relation and relative's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age2"
                  value={formData.age2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  placeholder="Enter permanent address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhaar2"
                  value={formData.aadhaar2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="0000 0000 0000"
                />
              </div>
            </div>
          </div>

          {/* Property Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">3</span>
              Property Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Property Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  placeholder="Enter property address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Ward Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="wardNumber"
                    value={formData.wardNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. 123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Zone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. East"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Khata Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="khataNo"
                    value={formData.khataNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter Khata No."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    SAS Application Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sasNumber"
                    value={formData.sasNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter SAS No."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Authorization Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">4</span>
              Authorization
            </h2>
            
            <div>
              <label className="block text-sm font-semibold text-red-600 mb-1">
                Name of Authorized Person for e-signing <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="authorizedPerson"
                value={formData.authorizedPerson}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                placeholder="Enter authorized person's name"
              />
            </div>
          </div>

          {/* Verification Details Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">5</span>
              Verification Details
            </h2>
            
            <div className="space-y-4">
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
                  placeholder="e.g. Bangalore"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Day <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. 15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Month <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. April"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="e.g. 2025"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinKhataTransferForm;