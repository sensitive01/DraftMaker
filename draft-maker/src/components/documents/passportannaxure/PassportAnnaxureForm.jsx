export default function PassportAnnaxureForm({
  formData,
  handleChange,
  handleDetailChange,
  handleResidenceChange,
  handleSignatureCheck,
}) {
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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-5 border-t-3 border-red-500">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              ANNEXURE 'F'
            </h1>
            <h2 className="text-sm sm:text-base text-gray-600 leading-relaxed">
              SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU
              OF LOST/DAMAGED PASSPORT
            </h2>
          </div>
        </div>

        <div className="space-y-5">
          {/* Personal Information Section - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                1
              </span>
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Relation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="relationType"
                    value={formData.relationType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="">Select</option>
                    <option value="S/o">S/o (Son of)</option>
                    <option value="D/o">D/o (Daughter of)</option>
                    <option value="W/o">W/o (Wife of)</option>
                    <option value="H/o">H/o (Husband of)</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Age (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadhaarNo"
                    value={formData.aadhaarNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter your Aadhaar number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Passport Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="passportNo"
                    value={formData.passportNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Enter your passport number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter place"
                />
              </div>
            </div>
          </div>

          {/* Address Information - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                2
              </span>
              Address Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  rows="3"
                  placeholder="Enter your permanent address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-600 mb-1">
                  Present Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
                  rows="3"
                  placeholder="Enter your present address"
                />
              </div>
            </div>
          </div>

          {/* Declaration Details - Compact sections */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                3
              </span>
              Details of Lost/Damaged Passport
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              State how and when the passport was lost/damaged and when FIR was
              lodged
            </p>
            <textarea
              name="incidentDetails"
              value={formData.incidentDetails}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
              rows="3"
              placeholder="Provide details of the incident"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                4
              </span>
              Travel on Lost/Damaged Passport
            </h2>
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="travelNo"
                  className="text-sm font-medium text-red-600"
                >
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="travelYes"
                  className="text-sm font-medium text-red-600"
                >
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
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                5
              </span>
              TR Concessions/FTs Allowance
            </h2>
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="concessionNo"
                  className="text-sm font-medium text-red-600"
                >
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="concessionYes"
                  className="text-sm font-medium text-red-600"
                >
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
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                6
              </span>
              Non-Resident Indian Status
            </h2>
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="nriNo"
                  className="text-sm font-medium text-red-600"
                >
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="nriYes"
                  className="text-sm font-medium text-red-600"
                >
                  Yes
                </label>
              </div>
            </div>
            {formData.nonResidentIndian === "YES" && (
              <div className="overflow-x-auto mt-3">
                <table className="w-full border-2 border-red-200 rounded-lg">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="border border-red-200 p-2 text-sm font-semibold text-red-600">
                        S. No.
                      </th>
                      <th className="border border-red-200 p-2 text-sm font-semibold text-red-600">
                        Country
                      </th>
                      <th className="border border-red-200 p-2 text-sm font-semibold text-red-600">
                        Period of Residence
                      </th>
                      <th className="border border-red-200 p-2 text-sm font-semibold text-red-600">
                        Passport Page Nos.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.residences.map((residence, index) => (
                      <tr key={index}>
                        <td className="border border-red-200 p-2 text-center text-sm">
                          {index + 1}
                        </td>
                        <td className="border border-red-200 p-2">
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
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                            placeholder="Country name"
                          />
                        </td>
                        <td className="border border-red-200 p-2">
                          <div className="flex gap-2 items-center">
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
                              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                              placeholder="From"
                            />
                            <span className="text-sm">to</span>
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
                              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                              placeholder="To"
                            />
                          </div>
                        </td>
                        <td className="border border-red-200 p-2">
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
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
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

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                7
              </span>
              Passport Objection
            </h2>
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="objectionNo"
                  className="text-sm font-medium text-red-600"
                >
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="objectionYes"
                  className="text-sm font-medium text-red-600"
                >
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
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-600 text-xs font-bold">
                8
              </span>
              Deportation Status
            </h2>
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="deportedNo"
                  className="text-sm font-medium text-red-600"
                >
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
                  className="mr-2 text-red-600"
                />
                <label
                  htmlFor="deportedYes"
                  className="text-sm font-medium text-red-600"
                >
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
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            )}
          </div>

          {/* Final Declaration - Compact */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border-l-3 border-red-500">
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              I further affirm that I will take utmost care of my passport if
              issued and the Government will be at liberty to take any legal
              action under the Passports Act, 1967, if the lapse is repeated.
            </p>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="useNameAsSignature"
                checked={formData.useNameAsSignature}
                onChange={handleSignatureCheck}
                className="h-5 w-5 text-red-600 border-2 border-gray-300 rounded focus:ring-1 focus:ring-red-500 mt-1"
              />
              <label
                htmlFor="useNameAsSignature"
                className="text-sm text-gray-700 leading-relaxed font-medium"
              >
                Use my full name as signature in the declaration
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
