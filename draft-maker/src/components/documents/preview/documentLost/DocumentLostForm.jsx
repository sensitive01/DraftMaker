import React from 'react'

const DocumentLostForm = ({formData,handleChange}) => {
  return (
    <div className="border p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Document Loss Affidavit Form</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-red-600 font-medium mb-1">Title & Name</label>
          <div className="flex gap-2">
            <select 
              name="personTitle"
              value={formData.personTitle} 
              onChange={handleChange}
              className="border p-2 w-24"
            >
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Dr.</option>
            </select>
            <input 
              type="text" 
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              placeholder="Full Name" 
              className="border p-2 flex-1" 
            />
          </div>
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1">Relation Type</label>
          <select 
            name="relationType"
            value={formData.relationType}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option>D/o</option>
            <option>S/o</option>
            <option>W/o</option>
            <option>H/o</option>
          </select>
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Relation Name</label>
          <input 
            type="text" 
            name="relationName"
            value={formData.relationName}
            onChange={handleChange}
            placeholder="Relation's Name" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Age</label>
          <input 
            type="number" 
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age in Years" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Permanent Address</label>
          <textarea 
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete Address with Pin Code" 
            className="border p-2 w-full" 
            rows="3"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Aadhaar Number</label>
          <input 
            type="text" 
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Type of Lost Document</label>
          <input 
            type="text" 
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            placeholder="E.g., Passport, Driving License, Certificate" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Document Serial Number</label>
          <input 
            type="text" 
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            placeholder="Serial/Reference Number" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">FIR Number</label>
          <input 
            type="text" 
            name="firNumber"
            value={formData.firNumber}
            onChange={handleChange}
            placeholder="FIR Number" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-red-600 font-medium mb-1">FIR Day</label>
            <input 
              type="number" 
              name="firDay"
              value={formData.firDay}
              onChange={handleChange}
              min="1" 
              max="31" 
              placeholder="DD" 
              className="border p-2 w-full" 
            />
          </div>
          
          <div>
            <label className="block text-red-600 font-medium mb-1">FIR Month</label>
            <input 
              type="number" 
              name="firMonth"
              value={formData.firMonth}
              onChange={handleChange}
              min="1"
              max="12"
              placeholder="MM" 
              className="border p-2 w-full" 
            />
          </div>
          
          <div>
            <label className="block text-red-600 font-medium mb-1">FIR Year</label>
            <input 
              type="number" 
              name="firYear"
              value={formData.firYear}
              onChange={handleChange}
              placeholder="YYYY" 
              className="border p-2 w-full" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-red-600 font-medium mb-1">Place of Verification</label>
          <input 
            type="text" 
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="City/Town" 
            className="border p-2 w-full" 
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-red-600 font-medium mb-1">Day</label>
            <input 
              type="number" 
              name="day"
              value={formData.day}
              onChange={handleChange}
              min="1" 
              max="31" 
              placeholder="DD" 
              className="border p-2 w-full" 
            />
          </div>
          
          <div>
            <label className="block text-red-600 font-medium mb-1">Month</label>
            <select 
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
          
          <div>
            <label className="block text-red-600 font-medium mb-1">Year</label>
            <input 
              type="number" 
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="YYYY" 
              className="border p-2 w-full" 
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default DocumentLostForm