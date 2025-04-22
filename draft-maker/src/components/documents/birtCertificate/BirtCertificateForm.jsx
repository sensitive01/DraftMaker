import React from 'react'

const BirtCertificateForm = ({formData,handleChange}) => {
  return (
    <div className="border p-6 bg-white shadow-md">
    <h2 className="text-xl font-bold mb-4">
      Birth Certificate Correction Form
    </h2>
    <form className="space-y-4">
      <div>
        <label className="block text-red-600 font-medium mb-1">
          Parent Title & Name
        </label>
        <div className="flex gap-2">
          <select
            name="parentTitle"
            value={formData.parentTitle}
            onChange={handleChange}
            className="border p-2 w-24"
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Dr.</option>
          </select>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Parent's Full Name"
            className="border p-2 flex-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Spouse Title & Name
        </label>
        <div className="flex gap-2">
          <select
            name="spouseTitle"
            value={formData.spouseTitle}
            onChange={handleChange}
            className="border p-2 w-24"
          >
            <option>Mrs.</option>
            <option>Mr.</option>
            <option>Dr.</option>
          </select>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName}
            onChange={handleChange}
            placeholder="Spouse's Full Name"
            className="border p-2 flex-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Permanent Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Complete Address with Pin Code"
          className="border p-2 w-full"
          rows="3"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-red-600 font-medium mb-1">
            Parent's Aadhaar No.
          </label>
          <input
            type="text"
            name="parentAadhaar"
            value={formData.parentAadhaar}
            onChange={handleChange}
            placeholder="0000 0000 0000"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1">
            Spouse's Aadhaar No.
          </label>
          <input
            type="text"
            name="spouseAadhaar"
            value={formData.spouseAadhaar}
            onChange={handleChange}
            placeholder="0000 0000 0000"
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Child Relation
        </label>
        <select
          name="childRelation"
          value={formData.childRelation}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>Daughter</option>
          <option>Son</option>
        </select>
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Child's Name
        </label>
        <input
          type="text"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          placeholder="Child's Name"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Certificate Number
        </label>
        <input
          type="text"
          name="certificateNumber"
          value={formData.certificateNumber}
          onChange={handleChange}
          placeholder="Birth Certificate Number"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Incorrect Name (as per Birth Certificate)
        </label>
        <input
          type="text"
          name="incorrectName"
          value={formData.incorrectName}
          onChange={handleChange}
          placeholder="Incorrect Name"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Correct Name (as per Aadhaar)
        </label>
        <input
          type="text"
          name="correctName"
          value={formData.correctName}
          onChange={handleChange}
          placeholder="Correct Name"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-red-600 font-medium mb-1">
          Place of Verification
        </label>
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

export default BirtCertificateForm