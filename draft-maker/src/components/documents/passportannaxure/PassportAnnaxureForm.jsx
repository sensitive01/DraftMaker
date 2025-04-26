// Improved Annexure F Form with better layout and red labels
export default function PassportAnnaxureForm({
  formData,
  handleChange,
  handleDetailChange,
  handleResidenceChange,
  handleSignatureCheck,
}) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">ANNEXURE 'F'</h1>
        <h2 className="text-xl font-semibold mt-2">
          SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU OF
          LOST/DAMAGED PASSPORT
        </h2>
      </div>

      {/* Improved Personal Information Section */}
      <div className="bg-gray-50 p-6 rounded-md mb-8">
        <h3 className="text-lg font-medium mb-5 border-b pb-3">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-5 gap-3">
            <div className="form-group col-span-2">
              <label className="block text-sm font-medium text-red-600 mb-2">
                Relation Type
              </label>
              <select
                name="relationType"
                value={formData.relationType}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="S/o">S/o (Son of)</option>
                <option value="D/o">D/o (Daughter of)</option>
                <option value="W/o">W/o (Wife of)</option>
                <option value="H/o">H/o (Husband of)</option>
              </select>
            </div>

            <div className="form-group col-span-3">
              <label className="block text-sm font-medium text-red-600 mb-2">
                Guardian's Name
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Enter guardian's name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Age (Years)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your age"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your Aadhaar number"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Passport Number
            </label>
            <input
              type="text"
              name="passportNo"
              value={formData.passportNo}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your passport number"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter place"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gray-50 p-6 rounded-md mb-8">
        <h3 className="text-lg font-medium mb-5 border-b pb-3">
          Address Information
        </h3>

        <div className="space-y-5">
          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none min-h-20"
              placeholder="Enter your permanent address"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-red-600 mb-2">
              Present Address
            </label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none min-h-20"
              placeholder="Enter your present address"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Declaration Details */}
      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-3">
            1. Details of Lost/Damaged Passport
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            State how and when the passport was lost/damaged and when FIR was
            lodged
          </p>
          <textarea
            name="incidentDetails"
            value={formData.incidentDetails}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none min-h-24"
            placeholder="Provide details of the incident"
          ></textarea>
        </div>

        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-3">
            2. Travel on Lost/Damaged Passport
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Did you travel on the lost/damaged passport?
          </p>
          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="travelNo"
                name="travelled"
                value="NO"
                checked={formData.travelled === "NO"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="travelNo" className="text-red-600">
                No
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="travelYes"
                name="travelled"
                value="YES"
                checked={formData.travelled === "YES"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="travelYes" className="text-red-600">
                Yes
              </label>
            </div>
          </div>
          {formData.travelled === "YES" && (
            <input
              type="text"
              value={formData.travelDetails}
              onChange={(e) =>
                handleDetailChange("travelDetails", e.target.value)
              }
              placeholder="Flight number, date and port of entry"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-3">
            3. TR Concessions/FTs Allowance
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Did you avail of any TR concessions/FTs allowance?
          </p>
          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="concessionNo"
                name="trConcessions"
                value="NO"
                checked={formData.trConcessions === "NO"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="concessionNo" className="text-red-600">
                No
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="concessionYes"
                name="trConcessions"
                value="YES"
                checked={formData.trConcessions === "YES"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="concessionYes" className="text-red-600">
                Yes
              </label>
            </div>
          </div>
          {formData.trConcessions === "YES" && (
            <input
              type="text"
              value={formData.concessionDetails}
              onChange={(e) =>
                handleDetailChange("concessionDetails", e.target.value)
              }
              placeholder="Details of TR concessions/FTs allowance"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-3">
            4. Non-Resident Indian Status
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Are you a non-resident Indian?
          </p>
          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="nriNo"
                name="nonResidentIndian"
                value="NO"
                checked={formData.nonResidentIndian === "NO"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="nriNo" className="text-red-600">
                No
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="nriYes"
                name="nonResidentIndian"
                value="YES"
                checked={formData.nonResidentIndian === "YES"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="nriYes" className="text-red-600">
                Yes
              </label>
            </div>
          </div>
          {formData.nonResidentIndian === "YES" && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-sm">S. No.</th>
                    <th className="border p-3 text-sm">Country</th>
                    <th className="border p-3 text-sm">Period of Residence</th>
                    <th className="border p-3 text-sm">Passport Page Nos.</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.residences.map((residence, index) => (
                    <tr key={index}>
                      <td className="border p-3 text-center">{index + 1}</td>
                      <td className="border p-3">
                        <input
                          type="text"
                          value={residence.country}
                          onChange={(e) =>
                            handleResidenceChange(
                              index,
                              "country",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded"
                          placeholder="Country name"
                        />
                      </td>
                      <td className="border p-3">
                        <div className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={residence.periodFrom}
                            onChange={(e) =>
                              handleResidenceChange(
                                index,
                                "periodFrom",
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 border rounded"
                            placeholder="From"
                          />
                          <span>to</span>
                          <input
                            type="text"
                            value={residence.periodTo}
                            onChange={(e) =>
                              handleResidenceChange(
                                index,
                                "periodTo",
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 border rounded"
                            placeholder="To"
                          />
                        </div>
                      </td>
                      <td className="border p-3">
                        <input
                          type="text"
                          value={residence.pageNos}
                          onChange={(e) =>
                            handleResidenceChange(
                              index,
                              "pageNos",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded"
                          placeholder="Page numbers"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-3">5. Passport Objection</h3>
          <p className="text-sm text-gray-600 mb-3">
            Did the Passport have any objection by the PIA?
          </p>
          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="objectionNo"
                name="passportObjection"
                value="NO"
                checked={formData.passportObjection === "NO"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="objectionNo" className="text-red-600">
                No
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="objectionYes"
                name="passportObjection"
                value="YES"
                checked={formData.passportObjection === "YES"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="objectionYes" className="text-red-600">
                Yes
              </label>
            </div>
          </div>
          {formData.passportObjection === "YES" && (
            <input
              type="text"
              value={formData.objectionDetails}
              onChange={(e) =>
                handleDetailChange("objectionDetails", e.target.value)
              }
              placeholder="Details of objection"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-3">6. Deportation Status</h3>
          <p className="text-sm text-gray-600 mb-3">
            Were you deported at any time at the expenses of the Government?
          </p>
          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="deportedNo"
                name="deported"
                value="NO"
                checked={formData.deported === "NO"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="deportedNo" className="text-red-600">
                No
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="deportedYes"
                name="deported"
                value="YES"
                checked={formData.deported === "YES"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="deportedYes" className="text-red-600">
                Yes
              </label>
            </div>
          </div>
          {formData.deported === "YES" && (
            <input
              type="text"
              value={formData.deportationDetails}
              onChange={(e) =>
                handleDetailChange("deportationDetails", e.target.value)
              }
              placeholder="Details of deportation and reimbursement"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-md">
        <p className="text-sm mb-5">
          I further affirm that I will take utmost care of my passport if issued
          and the Government will be at liberty to take any legal action under
          the Passports Act, 1967, if the lapse is repeated.
        </p>

        {/* Add signature checkbox */}
        <div className="form-group mt-5">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useNameAsSignature"
              checked={formData.useNameAsSignature}
              onChange={handleSignatureCheck}
              className="mr-3"
            />
            <label
              htmlFor="useNameAsSignature"
              className="text-sm text-red-600"
            >
              Use my full name as signature in the declaration
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
