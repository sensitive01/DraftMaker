
export default function GapPeriodForm({ formData,handleGapPeriodChange,handleChange,addGapPeriod,removeGapPeriod}) {
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Gap Period Affidavit Form</h1>
      
      <form >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Full Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relation Type</label>
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="S/o">Son of</option>
              <option value="D/o">Daughter of</option>
              <option value="W/o">Wife of</option>
              <option value="H/o">Husband of</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relation Name</label>
            <input
              type="text"
              name="relationName"
              value={formData.relationName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Father/Mother/Spouse Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Age"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Your Complete Address"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="0000 0000 0000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Authority Name</label>
            <input
              type="text"
              name="authority"
              value={formData.authority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Authority Name"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Gap Period Details</h2>
        
        {formData.gapPeriods.map((period, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Gap Period {index + 1}</h3>
              <button 
                type="button"
                onClick={() => removeGapPeriod(index)}
                className="text-red-500 hover:text-red-700"
                disabled={formData.gapPeriods.length === 1}
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={period.from}
                  onChange={(e) => handleGapPeriodChange(index, 'from', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={period.to}
                  onChange={(e) => handleGapPeriodChange(index, 'to', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  value={period.reason}
                  onChange={(e) => handleGapPeriodChange(index, 'reason', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Reason for gap"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button 
          type="button"
          onClick={addGapPeriod}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Another Gap Period
        </button>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Verification Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Verification Place"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="DD"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Month Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="YYYY"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
          >
            Generate Affidavit
          </button>
        </div>
      </form>
    </div>
  );
}