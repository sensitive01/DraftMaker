import React from "react";

const PassportNameChangePreview = ({ formData }) => {
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
    if (!formData.gender) return "D/o, S/o, H/o, W/o _______________";

    const relationshipMap = {
      "S/O": "S/o",
      "D/O": "D/o",
      "W/O": "W/o",
      "H/O": "H/o",
    };

    const relationshipPrefix =
      relationshipMap[formData.gender] || formData.gender;
    const relatedPersonName = formData.relatedPersonName || "_______________";

    return `${relationshipPrefix} ${relatedPersonName}`;
  };

  return (
    <div className="bg-gray-50 p-2 sm:p-6 rounded-lg shadow-lg max-w-5xl mx-auto min-h-[800px]">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2 text-center">
        Passport Name Change Affidavit Preview
      </h2>

      {/* Document Content - This will be captured for PDF */}
      <div className="bg-white p-4 sm:p-9 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden min-h-[700px] font-serif">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-lg sm:text-3xl font-bold transform rotate-45 select-none font-sans">
            DRAFT MAKER (INTERNAL PURPOSE ONLY)
          </div>
        </div>

        {/* Document Content */}
        <div className="relative z-10 mt-6 sm:mt-10">
          {/* Content */}
          <div className="mb-4 sm:mb-6 leading-relaxed sm:leading-loose text-sm sm:text-base">
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
            <p className="mb-4 sm:mb-6">
              My Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaarNo || "0000 0000 0000"}
              </span>
            </p>
            <p className="mb-8 sm:mb-12">
              My Passport No:{" "}
              <span className="font-bold">{formData.passportNo || "0000"}</span>
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
                  That as per My Aadhaar card my given name is{" "}
                  <span className="font-bold">
                    {formData.currentGivenName || "NAME"}
                  </span>{" "}
                  and in my Expired Passport, my given name is{" "}
                  <span className="font-bold">
                    {formData.currentGivenName || "NAME"}
                  </span>
                  , surname is{" "}
                  <span className="font-bold">
                    {formData.currentSurname || "NAME"}
                  </span>
                  .
                </span>
              </div>
              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-4 flex-shrink-0">
                  2.
                </span>
                <span>
                  That I wanted to change my given name as{" "}
                  <span className="font-bold">
                    {formData.newGivenName || "NAME"}
                  </span>{" "}
                  and surname as{" "}
                  <span className="font-bold">
                    {formData.newSurname || "NAME"}
                  </span>{" "}
                  from given name{" "}
                  <span className="font-bold">
                    {formData.currentGivenName || "NAME"}
                  </span>{" "}
                  and surname{" "}
                  <span className="font-bold">
                    {formData.currentSurname || "NAME"}
                  </span>
                  , for getting reissue of PASSPORT.
                </span>
              </div>
              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-4 flex-shrink-0">
                  3.
                </span>
                <span>
                  That I also required this affidavit for Publishing News Paper
                  Advertisement for The Name Change.
                </span>
              </div>
            </div>

            <p className="mt-4 sm:mt-5 text-justify">
              I hereby state that whatever is stated herein above is true to the
              best of my knowledge, information and belief.
            </p>
          </div>

          {/* Space for photo and signature */}
          <div className="flex flex-col sm:flex-row justify-between items-start mt-8 sm:mt-10">
            <div></div>

            <div className="text-right w-full sm:w-auto">
              <p className="mb-2 text-sm sm:text-base">
                Solemnly affirmed at{" "}
                <span className="font-bold">
                  {formData.place || "Bangalore"}
                </span>
              </p>
              <p className="mb-4 sm:mb-5 text-sm sm:text-base">
                Date:{" "}
                <span className="font-bold">{formatDate(formData.date)}</span>
              </p>

              <div className="mt-12 sm:mt-16 border-t-2 border-black pt-2 w-48 sm:w-56 text-center ml-auto mb-40 sm:mb-60">
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

export default PassportNameChangePreview;
