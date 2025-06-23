export default function PassportAnnaxurePreview({ formData }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-9 shadow-lg border border-gray-300 rounded-lg relative min-h-[900px] font-serif">
      {/* Watermark */}
      <div className="mb-96 p-9">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-200 text-4xl font-bold transform rotate-45 select-none font-sans opacity-50">
            INTERNAL PURPOSE ONLY
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">ANNEXURE 'F'</h1>
            <h2 className="text-xl font-semibold mt-2">
              SPECIMEN DECLARATION OF APPLICANT FOR OBTAINING A PASSPORT IN LIEU
              OF LOST/DAMAGED PASSPORT
            </h2>
          </div>

          <div className="space-y-8 text-base p-4">
            {/* Personal Details */}
            <div className="mb-10">
              <p className="leading-relaxed">
                I,{" "}
                <span className="font-medium  px-1">
                  {formData.name || "_________________"}
                </span>{" "}
                {formData.relationType || "_________________"}{" "}
                <span className="font-medium  px-1">
                  {formData.guardianName || "_________________"}
                </span>
                , Aged:{" "}
                <span className="font-medium  px-1">
                  {formData.age || "___"}
                </span>{" "}
                Years,
              </p>
            </div>

            {/* Addresses */}
            <div className="mb-10">
              <p className="mb-2 leading-relaxed">Permanent Address:</p>
              <p className=" pb-2 leading-relaxed">
                {formData.permanentAddress ||
                  "___________________________________________"}
              </p>
            </div>

            <div className="mb-10">
              <p className="mb-2 leading-relaxed">Present Address:</p>
              <p className=" pb-2 leading-relaxed">
                {formData.presentAddress ||
                  "______________________________________________"}
              </p>
            </div>

            {/* Aadhaar/Passport */}
            <div className="flex flex-wrap gap-8 mb-6">
              <p className="leading-relaxed">
                My Aadhaar No:{" "}
                <span className="font-medium  px-1">
                  {formData.aadhaarNo || "____ ____ ____"}
                </span>
              </p>
              <p className="leading-relaxed">
                My Passport No:{" "}
                <span className="font-medium  px-1">
                  {formData.passportNo || "_________________"}
                </span>
              </p>
            </div>

            {/* Questions */}
            <div className="mb-6">
              <p className="font-medium mb-2 leading-relaxed">
                1. State how and when the passport was lost/damaged and when FIR
                was lodged at which Police Station and how many passports were
                lost/ damaged earlier?
              </p>
              <p className="mb-2 leading-relaxed">DETAILS OF INCIDENT:</p>
              <div className=" pb-2 min-h-16">
                <p className="leading-relaxed">
                  {formData.incidentDetails ||
                    "_____________________________________________"}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2 leading-relaxed">
                2. State whether you travelled on the lost/damaged passport, if
                so state flight number and date and port of entry into India?
              </p>
              <p className="leading-relaxed">
                {formData.travelled || "NO"}
                {formData.travelled === "YES"
                  ? `: ${formData.travelDetails || "_________________"}`
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2 leading-relaxed">
                3. State whether you availed of any TR concessions/FTs allowance
                and if so details thereof?
              </p>
              <p className="leading-relaxed">
                {formData.trConcessions || "NO"}
                {formData.trConcessions === "YES"
                  ? `: ${formData.concessionDetails || "_________________"}`
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2 leading-relaxed">
                4. State whether non-resident Indian and if resident abroad, the
                details of the residence as follows:
              </p>
              <p className="leading-relaxed">
                {formData.nonResidentIndian || "NO"}
              </p>

              {formData.nonResidentIndian === "YES" && (
                <table className="w-full  mt-4">
                  <thead>
                    <tr>
                      <th className=" p-3 text-left w-16">S. No.</th>
                      <th className=" p-3 text-left">Name of the Country</th>
                      <th className=" p-3 text-left">
                        Length of residence from... To...
                      </th>
                      <th className=" p-3 text-left">
                        Page Nos. of passport bearing departure and arrival
                        stamps
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.residences || []).map(
                      (residence, index) =>
                        residence.country && (
                          <tr key={index}>
                            <td className=" p-3">{index + 1}.</td>
                            <td className=" p-3">{residence.country}</td>
                            <td className=" p-3">
                              {residence.periodFrom || "___"} to{" "}
                              {residence.periodTo || "___"}
                            </td>
                            <td className=" p-3">
                              {residence.pageNos || "___"}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2 leading-relaxed">
                5. State whether the Passport had any objection by the PIA and
                if so the details thereof.
              </p>
              <p className="leading-relaxed">
                {formData.passportObjection || "NO"}
                {formData.passportObjection === "YES"
                  ? `: ${formData.objectionDetails || "_________________"}`
                  : ""}
              </p>
            </div>

            <div className="mb-8">
              <p className="font-medium mb-2 leading-relaxed">
                6. State whether you were deported at any time at the expenses
                of the Government and if so was the expenditure incurred
                reimbursed to Government of India.
              </p>
              <p className="leading-relaxed">
                {formData.deported || "NO"}
                {formData.deported === "YES"
                  ? `: ${formData.deportationDetails || "_________________"}`
                  : ""}
              </p>
            </div>

            {/* Closing Declaration */}
            <div className="mt-8">
              <p className="text-base leading-relaxed">
                I further affirm that I will take utmost care of my passport if
                issued and the Government will be at liberty to take any legal
                action under the Passports Act, 1967, if the lapse is repeated.
              </p>
            </div>

            {/* Signature & Date */}
            <div className="flex justify-between mt-16">
              <div>
                <p className="leading-relaxed">
                  Date:{" "}
                  <span className="font-medium">
                    {formatDate(formData.date) || "___/___/_______"}
                  </span>
                </p>
                <p className="leading-relaxed">
                  PLACE:{" "}
                  <span className="font-medium">
                    {formData.place || "_________________"}
                  </span>
                </p>
              </div>

              <div className="text-center ">
                <div className="h-10">
                  {formData.useNameAsSignature ? (
                    <p className="font-medium italic leading-relaxed">
                      {formData.name || "_________________"}
                    </p>
                  ) : (
                    <div className="h-10"></div>
                  )}
                </div>
                <div className="border-t border-black w-48"></div>
                <p className="leading-relaxed">(Signature of applicant)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
