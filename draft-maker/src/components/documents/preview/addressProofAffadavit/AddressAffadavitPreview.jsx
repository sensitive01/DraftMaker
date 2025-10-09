import React, { useRef } from "react";

const AffidavitPreview = ({ formData }) => {
  const affidavitRef = useRef(null);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "xx/xx/xxxx";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Format permanent address
  const formatPermanentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.permanentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format present address
  const formatPresentAddress = () => {
    const { line1, line2, city, state, pinCode } =
      formData.presentAddress || {};
    const parts = [line1, line2, city, state, pinCode].filter((part) => part);
    return parts.length
      ? parts.join(", ")
      : "[Address Line 1, Address Line 2, City, State, Pin Code]";
  };

  // Format the relationship part of the declaration
  const formatRelationship = () => {
    if (!formData.gender) return "D/o, S/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
  };

  return (
    <div className="bg-gray-50 p-2 sm:p-6 rounded-lg shadow-lg max-w-5xl mx-auto min-h-[600px]">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2 text-center">
        Affidavit Preview
      </h2>

      {/* Document Content - This will be captured for PDF */}
      <div
        ref={affidavitRef}
        className="bg-white p-3 sm:p-8 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden min-h-[600px] font-serif"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-600 text-6xl sm:text-5xl font-bold transform rotate-45 select-none font-sans">
            INTERNAL PURPOSE ONLY
          </div>
        </div>
        {formData.firstParty && formData.secondParty && (
          <div className="mb-6 relative z-10">
            <table className="w-full border-collapse border border-gray-400 text-sm">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                    First Party
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    {formData.firstParty}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                    Second Party
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    {formData.secondParty}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-400 px-3 py-2 font-semibold w-1/3">
                    Stamp Duty Paid By
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    {formData.stampDutyPaidBy === "firstParty"
                      ? formData.firstParty
                      : formData.stampDutyPaidBy === "secondParty"
                      ? formData.secondParty
                      : "Not Selected"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Document Content */}
        <div className="relative z-10">
          {/* Content */}
          <div className="mb-6 sm:mb-8 leading-relaxed sm:leading-loose text-sm sm:text-base">
            <p className="mb-4 sm:mb-6 text-justify">
              I,{" "}
              <span className="font-bold">
                {formData.name || "Mr/Mrs/Ms ........................."}
              </span>
              , <span>{formatRelationship()}</span>, Aged:{" "}
              <span className="font-bold">{formData.age || "......"}</span>{" "}
              Years,
            </p>
            <p className="mb-4 sm:mb-6">
              Permanent Address:{" "}
              <span className="font-bold">{formatPermanentAddress()}</span>
            </p>
            <p className="mb-4 sm:mb-6">
              Present Address:{" "}
              <span className="font-bold">{formatPresentAddress()}</span>
            </p>
            <p className="mb-8 sm:mb-12">
              My Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaarNo || "536709665679"}
              </span>
              .
            </p>
            <p className="mb-4 sm:mb-5 font-semibold text-center">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          <div className="mb-12 sm:mb-16 leading-relaxed sm:leading-loose text-sm sm:text-base">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-4 flex-shrink-0">
                  1.
                </span>
                <span>
                  I hereby declare that I am presently residing at above address
                  since{" "}
                  <span className="font-bold">
                    {formData.currentResidenceAddress || "XX/XX/XXXX"}.
                  </span>
                </span>
              </div>
              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-4 flex-shrink-0">
                  2.
                </span>
                <span>
                  I further declare that I am swearing this affidavit to produce
                  before the concerned{" "}
                  <span className="font-bold">
                    {formData.companyName || "COMPANY NAME"}
                  </span>
                  .
                </span>
              </div>
              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-4 flex-shrink-0">
                  3.
                </span>
                <span>
                  That this affidavit is being made to serve as proof of my
                  <span className="font-bold"> Address </span> for the purpose
                  of{" "}
                  <span className="font-bold">
                    {formData.purposeOfAffidavit || "XXXX"}
                  </span>
                  .
                </span>
              </div>
            </div>

            <p className="mt-4 sm:mt-6 text-justify">
              I do hereby verify and declare that what is stated above are true
              and correct to the best of my knowledge, information and belief.
            </p>
          </div>

          {/* Space for stamp and signature */}
          <div className="flex flex-col sm:flex-row justify-between items-start mt-12 sm:mt-18">
            <div></div>

            <div className="text-right w-full sm:w-auto">
              <p className="mb-2 text-sm sm:text-base">
                Solemnly affirmed at{" "}
                <span className="font-bold">
                  {formData.place || "Bangalore"}
                </span>
              </p>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                Date:{" "}
                <span className="font-bold">{formatDate(formData.date)}</span>
              </p>

              <div className="mt-12 sm:mt-16 border-t-2 border-black pt-2 w-48 sm:w-56 text-center ml-auto">
                <p className="font-medium text-sm sm:text-base">
                  (Signature of the Applicant)
                </p>
                <p className="font-bold mt-2 text-sm sm:text-base">Deponent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffidavitPreview;
