


const AddressAffadavitForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Affidavit Form</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Mr/Mrs/Ms Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="S/O">Son of (S/O)</option>
              <option value="D/O">Daughter of (D/O)</option>
              <option value="W/O">Wife of (W/O)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Age in years"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Permanent Address</h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
            <input
              type="text"
              name="permanentAddress.line1"
              value={formData.permanentAddress.line1}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="House/Flat No., Building Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
            <input
              type="text"
              name="permanentAddress.line2"
              value={formData.permanentAddress.line2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Street, Area"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="permanentAddress.city"
                value={formData.permanentAddress.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="permanentAddress.state"
                value={formData.permanentAddress.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
              <input
                type="text"
                name="permanentAddress.pinCode"
                value={formData.permanentAddress.pinCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Present Address</h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
            <input
              type="text"
              name="presentAddress.line1"
              value={formData.presentAddress.line1}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="House/Flat No., Building Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
            <input
              type="text"
              name="presentAddress.line2"
              value={formData.presentAddress.line2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Street, Area"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="presentAddress.city"
                value={formData.presentAddress.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="presentAddress.state"
                value={formData.presentAddress.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
              <input
                type="text"
                name="presentAddress.pinCode"
                value={formData.presentAddress.pinCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Other Details</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="12-digit Aadhaar Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Residence Address</label>
            <textarea
              name="currentResidenceAddress"
              value={formData.currentResidenceAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 h-20"
              placeholder="Complete address where you are currently residing"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="Name of the company this affidavit is for"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Affidavit</label>
            <input
              type="text"
              name="purposeOfAffidavit"
              value={formData.purposeOfAffidavit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Address Proof"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="Place of signing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AddressAffadavitForm;