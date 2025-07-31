import React from "react";
import { getDayWithSuffix } from "../../../../utils/dateFormat";

const MetriculationPreview = ({ formData }) => {
  // Function to highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-100";
  };

  return (
    <div className="bg-white min-h-[500px] sm:min-h-[600px] md:min-h-[700px] p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 relative max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform rotate-45 select-none font-sans opacity-80">
            INTERNAL PURPOSE ONLY
          </div>
        </div>

        {/* Print-specific styles */}
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
              font-family: "Times New Roman", Times, serif;
            }
            .no-print {
              display: none;
            }
            .print-container {
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .bg-yellow-100 {
              background-color: transparent !important;
              border-bottom: 1px dotted #000;
            }
          }
        `}</style>

        {/* Affidavit content */}
        <div className="p-3 sm:p-4 md:p-6 print-container font-serif">
          {/* Official Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2 sm:mb-3">
              AFFIDAVIT
            </h1>
            <div className="border-b-2 border-black w-32 sm:w-40 md:w-48 mx-auto mb-2"></div>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-800 leading-relaxed text-sm sm:text-base">
            {/* Personal Details */}
            <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words">
              I,{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.name
                )} px-1 break-words`}
              >
                {formData.name || "Mr/Mrs/Ms ................................"}
              </span>{" "}
              {formData.relation ? (
                <span className="break-words">{formData.relation}</span>
              ) : (
                <span
                  className={`${highlightIfEmpty(
                    formData.relation
                  )} px-1 font-serif break-words`}
                >
                  D/o, S/o, H/o, W/o ........................
                </span>
              )}
              , Aged:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(formData.age)} px-1`}
              >
                {formData.age || "......"}
              </span>{" "}
              Years,
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words">
              Permanent Address:{" "}
              <span
                className={`${highlightIfEmpty(
                  formData.address
                )} px-1 font-serif break-words`}
              >
                {formData.address ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              My Aadhaar No:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.aadhaar
                )} px-1`}
              >
                {formData.aadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="font-medium text-lg sm:text-xl my-4 sm:my-5 md:my-6 leading-relaxed">
              Do hereby solemnly affirm and declare as under:
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words">
              Hereby affirm and declare that I have irrecoverable Lost my{" "}
              <span
                className={`font-serif ${highlightIfEmpty(formData.year)} px-1`}
              >
                {formData.year || "X"}
              </span>{" "}
              year,{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.semester
                )} px-1`}
              >
                {formData.semester || "X"}
              </span>{" "}
              Semester, marks card of{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.program
                )} px-1 break-words`}
              >
                {formData.program || "..........................,"}
              </span>{" "}
              issued to me by{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.authority
                )} px-1 break-words`}
              >
                {formData.authority ||
                  "........................................................"}
              </span>
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words">
              Name of the college/Institution:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.collegeName
                )} px-1 break-words`}
              >
                {formData.collegeName || "XXXX"}
              </span>
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed">
              Batch: In the year{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.batch
                )} px-1`}
              >
                {formData.batch || "XXXX"}
              </span>
              .
            </p>

            <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words">
              Registration Number:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.regNumber
                )} px-1 break-words`}
              >
                {formData.regNumber || "..........................,"}
              </span>
            </p>

            <div className="my-4 sm:my-5 md:my-6">
              <p className="mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words">
                In the event of the above mentioned Statement of{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.documentName
                  )} px-1 break-words`}
                >
                  {formData.documentName || "DOCUMENT NAME"}
                </span>{" "}
                being found subsequently, I hereby undertake to return the
                duplicate issued. It is at my own risk the Statement of{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.documentName
                  )} px-1 break-words`}
                >
                  {formData.documentName || "DOCUMENT NAME"}
                </span>{" "}
                may be sent the address given by me.
              </p>
            </div>

            <div className="mt-6 sm:mt-7 md:mt-8 pt-4">
              <p className="mb-6 sm:mb-8 md:mb-10 leading-relaxed break-words">
                Verified at{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.place
                  )} px-1 break-words`}
                >
                  {formData.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.day
                  )} px-1`}
                >
                  {getDayWithSuffix(formData.day) || "XX"}
                </span>{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.month
                  )} px-1`}
                >
                  {formData.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.year_verification
                  )} px-1`}
                >
                  {formData.year_verification || "XXXX"}
                </span>{" "}
                that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            {/* Signature Block */}
            <div className="text-right mt-8 sm:mt-12 md:mt-16">
              <p className="border-t border-black inline-block pt-1 text-sm sm:text-base">
                (Signature of the Deponent)
              </p>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                <p className="break-words">
                  {formData.name ? formData.name : ""}
                </p>
              </div>
            </div>

            {/* Stamp/Seal Placeholder */}
            <div className="mt-8 sm:mt-10 md:mt-12 mb-4 text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-full h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 mx-auto flex items-center justify-center text-gray-400">
                <p className="text-xs sm:text-sm">Notary Seal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetriculationPreview;
