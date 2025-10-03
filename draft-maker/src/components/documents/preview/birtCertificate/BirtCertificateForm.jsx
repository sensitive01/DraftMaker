import React from "react";

const BirtCertificateForm = ({ formData, handleChange }) => {
  const handlePartyNameChange = (e) => {
    const { name, value } = e.target;
    // Allow only letters, spaces, and commas, max 50 characters
    const filteredValue = value.replace(/[^a-zA-Z\s,]/g, "").slice(0, 50);
    handleChange({
      target: {
        name: name,
        value: filteredValue,
      },
    });
  };
  return (
    <div className="border p-4 sm:p-6 bg-white shadow-md max-w-4xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        Birth Certificate Correction Form
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Parent Title & Name
          </label>
          <div className="flex gap-2">
            <select
              name="parentTitle"
              value={formData.parentTitle}
              onChange={handleChange}
              className="border p-2 w-20 sm:w-24 text-sm sm:text-base"
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
              className="border p-2 flex-1 text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Spouse Title & Name
          </label>
          <div className="flex gap-2">
            <select
              name="spouseTitle"
              value={formData.spouseTitle}
              onChange={handleChange}
              className="border p-2 w-20 sm:w-24 text-sm sm:text-base"
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
              className="border p-2 flex-1 text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Permanent Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete Address with Pin Code"
            className="border p-2 w-full text-sm sm:text-base"
            rows="3"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
              Parent's Aadhaar No.
            </label>
            <input
              type="text"
              name="parentAadhaar"
              value={formData.parentAadhaar}
              onChange={handleChange}
              placeholder="0000 0000 0000"
              className="border p-2 w-full text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
              Spouse's Aadhaar No.
            </label>
            <input
              type="text"
              name="spouseAadhaar"
              value={formData.spouseAadhaar}
              onChange={handleChange}
              placeholder="0000 0000 0000"
              className="border p-2 w-full text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Child Relation
          </label>
          <select
            name="childRelation"
            value={formData.childRelation}
            onChange={handleChange}
            className="border p-2 w-full text-sm sm:text-base"
          >
            <option>Daughter</option>
            <option>Son</option>
          </select>
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Child's Name
          </label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            placeholder="Child's Name"
            className="border p-2 w-full text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Certificate Number
          </label>
          <input
            type="text"
            name="certificateNumber"
            value={formData.certificateNumber}
            onChange={handleChange}
            placeholder="Birth Certificate Number"
            className="border p-2 w-full text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Incorrect Name (as per Birth Certificate)
          </label>
          <input
            type="text"
            name="incorrectName"
            value={formData.incorrectName}
            onChange={handleChange}
            placeholder="Incorrect Name"
            className="border p-2 w-full text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Correct Name (as per Aadhaar)
          </label>
          <input
            type="text"
            name="correctName"
            value={formData.correctName}
            onChange={handleChange}
            placeholder="Correct Name"
            className="border p-2 w-full text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
            Place of Verification
          </label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="City/Town"
            className="border p-2 w-full text-sm sm:text-base"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div>
            <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
              Day
            </label>
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
              min="1"
              max="31"
              placeholder="DD"
              className="border p-2 w-full text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
              Month
            </label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="border p-2 w-full text-sm sm:text-base"
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
            <label className="block text-red-600 font-medium mb-1 text-sm sm:text-base">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="YYYY"
              className="border p-2 w-full text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirtCertificateForm;
