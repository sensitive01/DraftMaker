import React from 'react'

const DualNameChangeForm = ({formData, handleChange}) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-4">Dual Name Affidavit Form</h1>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">Relation <span className="text-red-500">*</span></label>
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="S/o">Son of</option>
              <option value="D/o">Daughter of</option>
              <option value="W/o">Wife of</option>
              <option value="H/o">Husband of</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">Relation's Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="relationName"
              value={formData.relationName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">Age <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-red-600 mb-1">Permanent Address <span className="text-red-500">*</span></label>
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-red-600 mb-1">Aadhaar Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="aadhaarNo"
            value={formData.aadhaarNo}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="border-t border-b py-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">First Document Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Name in Document <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name1"
                value={formData.name1}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Document Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="document1"
                value={formData.document1}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Passport, School Certificate"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Document Serial No. <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="documentNo1"
                value={formData.documentNo1}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Second Document Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Name in Document <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name2"
                value={formData.name2}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Document Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="document2"
                value={formData.document2}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Aadhar Card, PAN Card"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Document Serial No. <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="documentNo2"
                value={formData.documentNo2}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Verification Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Place of Verification <span className="text-red-500">*</span></label>
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
              <label className="block text-sm font-medium text-red-600 mb-1">Day <span className="text-red-500">*</span></label>
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
              <label className="block text-sm font-medium text-red-600 mb-1">Month <span className="text-red-500">*</span></label>
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
              <label className="block text-sm font-medium text-red-600 mb-1">Year <span className="text-red-500">*</span></label>
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
  )
}

export default DualNameChangeForm