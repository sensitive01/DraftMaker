import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

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
    <div className="bg-gray-50 p-10 rounded-lg shadow-lg max-w-5xl mx-auto min-h-[800px]">
      <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden min-h-[700px] font-serif">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-200 text-4xl font-bold transform rotate-45 select-none font-sans">
            INTERNAL PURPOSE ONLY
          </div>
        </div>

        {/* Document Content */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
            Joint Khata Transfer Affidavit
          </h2>

          <div className="mb-6 leading-loose text-base">
            {/* First Applicant */}
            <p className="mb-4">
              I, 1.{" "}
              <span className="font-bold">
                {formData.name1 || "________________________"}
              </span>{" "}
              {formData.relation1 || "D/o, S/o, H/o, W/o ________________"},
              Aged: <span className="font-bold">{formData.age1 || "____"}</span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address:{" "}
              <span className="font-bold">
                {formData.address1 ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-6">
              Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaar1 || "0000 0000 0000"}
              </span>
            </p>

            {/* Second Applicant */}
            <p className="mb-4">
              2.{" "}
              <span className="font-bold">
                {formData.name2 || "________________________"}
              </span>{" "}
              {formData.relation2 || "D/o, S/o, H/o, W/o ________________"},
              Aged: <span className="font-bold">{formData.age2 || "____"}</span>{" "}
              Years,
            </p>

            <p className="mb-4">
              Permanent Address:{" "}
              <span className="font-bold">
                {formData.address2 ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-12">
              Aadhaar No:{" "}
              <span className="font-bold">
                {formData.aadhaar2 || "0000 0000 0000"}
              </span>
            </p>

            <p className="mb-5 font-semibold text-center">
              Do hereby solemnly affirm and declare as under:
            </p>
          </div>

          <div className="mb-16 leading-loose text-base">
            <div className="space-y-8">
              <div className="flex text-justify">
                <span className="font-bold text-lg mr-4 flex-shrink-0">1.</span>
                <span>
                  Are applying for the joint Khatha transfer for property, which
                  is situated at{" "}
                  <span className="font-bold">
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
                <span className="font-bold text-lg mr-4 flex-shrink-0">2.</span>
                <span>
                  <div className="bg-gray-50 p-6 border-l-4 border-blue-600 my-4">
                    <p>
                      We all are the joint applicants for Khatha transfer, and
                      we authorize
                    </p>
                    <p className="font-medium mt-2 mb-2 text-center text-blue-700">
                      {formData.authorizedPerson || "NAME"}
                    </p>
                    <p>
                      for e-signing the application for Khata transfer on our
                      behalf.
                    </p>
                    <p className="mt-4">
                      We swear that the above mentioned is true to the best of
                      our knowledge and belief.
                    </p>
                  </div>
                </span>
              </div>
            </div>

            <div className="mt-8">
              <p>
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
          <div className="flex justify-between mt-24">
            <div></div>

            <div className="text-right">
              <div className="mt-16 border-t-2 border-black pt-2 w-56 text-center ml-auto">
                <p className="font-medium">(Signature of the Applicants)</p>
                <p className="font-bold mt-2">
                  {formData.name1 || "Applicant 1"}
                </p>
                <p className="font-bold mt-1">
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
