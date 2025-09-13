import React from "react";

const DualNameChangeForm = ({ 
  formData, 
  handleChange,
  handleAdditionalDocumentChange = () => {},
  addDocument = () => {},
  removeDocument = () => {}
}) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-4">
        Dual Name Affidavit Form
      </h1>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="namePrefix"
                value={formData?.namePrefix || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
              <input
                type="text"
                name="fullName"
                value={formData?.fullName || ""}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Relation <span className="text-red-500">*</span>
            </label>
            <select
              name="relation"
              value={formData?.relation || "S/o"}
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
            <label className="block text-sm font-medium text-red-600 mb-1">
              Relation's Name <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="relationNamePrefix"
                value={formData?.relationNamePrefix || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
              <input
                type="text"
                name="relationName"
                value={formData?.relationName || ""}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData?.age || ""}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-red-600 mb-1">
            Permanent Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="permanentAddress"
            value={formData?.permanentAddress || ""}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-600 mb-1">
            Aadhaar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="aadhaarNo"
            value={formData?.aadhaarNo || ""}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="border-t border-b py-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            First Document Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Name in Document <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name1"
                value={formData?.name1 || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Document Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="document1"
                value={formData?.document1 || ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Passport, School Certificate"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">
                Document Serial No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="documentNo1"
                value={formData?.documentNo1 || ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Additional Document Details
            </h2>
            <button
              type="button"
              onClick={addDocument}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Document
            </button>
          </div>

          <div className="space-y-6">
            {formData?.additionalDocuments?.map((document, index) => (
              <div key={document.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-md font-semibold text-gray-700">
                    Document #{index + 2}
                  </h3>
                  {formData.additionalDocuments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium text-sm transition-all duration-200 flex items-center gap-1 shadow-sm"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Name in Document <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={document.name}
                      onChange={(e) => handleAdditionalDocumentChange(index, 'name', e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Document Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={document.document}
                      onChange={(e) => handleAdditionalDocumentChange(index, 'document', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. Aadhar Card, PAN Card"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Document Serial No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={document.documentNo}
                      onChange={(e) => handleAdditionalDocumentChange(index, 'documentNo', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                value={formData?.place || ""}
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
                value={formData?.day || ""}
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
                value={formData?.month || ""}
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
                value={formData?.year || ""}
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

export default DualNameChangeForm;