import React from "react";
import { getDayWithSuffix } from "../../../../utils/dateFormat";

const JoinKhataTransferPreview = ({ formData }) => {
  // Check if all form data exists
  const isFormDataEmpty = !formData;

  if (isFormDataEmpty) {
    return (
      <div className="bg-gray-50 p-10 rounded-lg shadow-lg max-w-5xl mx-auto min-h-[800px] flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p className="mt-4 text-lg text-gray-500 font-medium">
            Fill the form to see your affidavit preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-10 rounded-lg shadow-lg max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
      <div className="bg-white p-3 sm:p-4 md:p-6 lg:p-10 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] font-serif">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-200 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform rotate-45 select-none font-sans">
            INTERNAL PURPOSE ONLY
          </div>
        </div>

        {/* Document Content */}
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-800 border-b pb-2 text-center">
            Joint Khata Transfer Affidavit
          </h2>

          <div className="mb-4 sm:mb-5 md:mb-6 leading-relaxed sm:leading-loose text-sm sm:text-base">
            {/* First Applicant */}
            <p className="mb-2 sm:mb-3 md:mb-4">
              I, 1.{" "}
              <span className="font-bold break-words">
                {formData.name1 || "________________________"}
              </span>{" "}
              <span className="break-words">
                {formData.relation1 || "D/o, S/o, H/o, W/o ________________"}
              </span>
              , Aged:{" "}
              <span className="font-bold">{formData.age1 || "____"}</span>{" "}
              Years,
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4">
              Permanent Address:{" "}
              <span className="font-bold break-words">
                {formData.address1 ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-4 sm:mb-5 md:mb-6">
              Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaar1 || "0000 0000 0000"}
              </span>
            </p>

            {/* Second Applicant */}
            <p className="mb-2 sm:mb-3 md:mb-4">
              2.{" "}
              <span className="font-bold break-words">
                {formData.name2 || "________________________"}
              </span>{" "}
              <span className="break-words">
                {formData.relation2 || "D/o, S/o, H/o, W/o ________________"}
              </span>
              , Aged:{" "}
              <span className="font-bold">{formData.age2 || "____"}</span>{" "}
              Years,
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4">
              Permanent Address:{" "}
              <span className="font-bold break-words">
                {formData.address2 ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-6 sm:mb-8 md:mb-12">
              Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaar2 || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-3 sm:mb-4 md:mb-5 font-semibold text-center">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          <div className="mb-8 sm:mb-12 md:mb-16 leading-relaxed sm:leading-loose text-sm sm:text-base">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                  1.
                </span>
                <span className="break-words">
                  Are applying for the joint Khatha transfer for property, which
                  is situated at{" "}
                  <span className="font-bold break-words">
                    {formData.propertyAddress ||
                      "...................................................................................."}
                  </span>{" "}
                  in the ward number{" "}
                  <span className="font-bold">
                    {formData.wardNumber || "XXX"}
                  </span>{" "}
                  and zone{" "}
                  <span className="font-bold">{formData.zone || "XXX"}</span> of{" "}
                  <span className="font-bold">
                    {formData.authority || "BBMP"}
                  </span>
                  , Khata No is{" "}
                  <span className="font-bold">
                    {formData.khataNo || "XXXX"}
                  </span>
                  , SAS Base Application number is{" "}
                  <span className="font-bold">
                    {formData.sasNumber || "XXXXX"}
                  </span>
                </span>
              </div>

              <div className="flex text-justify">
                <span className="font-bold text-base sm:text-lg mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                  2.
                </span>
                <span className="w-full">
                  <div className="bg-gray-50 p-3 sm:p-4 md:p-6 border-l-4 border-blue-600 my-2 sm:my-3 md:my-4">
                    <p className="text-sm sm:text-base">
                      We all are the joint applicants for Khatha transfer, and
                      we authorize
                    </p>
                    <p className="font-medium mt-2 mb-2 text-center text-blue-700 break-words text-sm sm:text-base">
                      {formData.authorizedPerson || "NAME"}
                    </p>
                    <p className="text-sm sm:text-base">
                      for e-signing the application for Khata transfer on our
                      behalf.
                    </p>
                    <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base">
                      We swear that the above mentioned is true to the best of
                      our knowledge and belief.
                    </p>
                  </div>
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 md:mt-8">
              <p className="text-sm sm:text-base break-words">
                Verified at{" "}
                <span className="font-bold">{formData.place || "PLACE"}</span>{" "}
                on this{" "}
                <span className="font-bold">
                  {getDayWithSuffix(formData.day) || "XX"}
                </span>{" "}
                day of{" "}
                <span className="font-bold">{formData.month || "XXXX"}</span>,{" "}
                <span className="font-bold">{formData.year || "XXXX"}</span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>
          </div>

          {/* Signature Block */}
          <div className="flex justify-end mt-12 sm:mt-16 md:mt-24">
            <div className="text-right">
              <div className="mt-8 sm:mt-12 md:mt-16 border-t-2 border-black pt-2 w-40 sm:w-48 md:w-56 text-center ml-auto">
                <p className="font-medium text-sm sm:text-base">
                  (Signature of the Applicants)
                </p>
                <p className="font-bold mt-1 sm:mt-2 text-sm sm:text-base break-words">
                  {formData.name1 || "Applicant 1"}
                </p>
                <p className="font-bold mt-1 text-sm sm:text-base break-words">
                  {formData.name2 || "Applicant 2"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinKhataTransferPreview;
