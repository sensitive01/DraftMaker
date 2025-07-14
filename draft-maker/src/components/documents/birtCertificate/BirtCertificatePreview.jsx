import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const BirthCertificatePreview = ({ formData }) => {
  // Function to highlight empty fields
  const highlightIfEmpty = (value) => {
    return value ? "" : "bg-yellow-100";
  };

  return (
    <div className="bg-red-100 min-h-screen px-2 sm:px-4 lg:px-6 py-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 relative max-w-4xl mx-auto">
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

        {/* Document content */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 print-container font-serif">
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center underline mb-6 sm:mb-8">
              AFFIDAVIT
            </h2>

            <p className="leading-relaxed text-justify break-words">
              We, {formData.parentTitle}{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.parentName
                )} px-1 inline-block min-w-0`}
              >
                {formData.parentName || "___________________"}
              </span>{" "}
              H/O {formData.spouseTitle}{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.spouseName
                )} px-1 inline-block min-w-0`}
              >
                {formData.spouseName || "___________________"}
              </span>
              , Permanent Address{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.address
                )} px-1 inline-block min-w-0`}
              >
                {formData.address ||
                  "[Address Line 1, Address Line 2, City, State, Pin Code]"}
              </span>
            </p>

            <p className="leading-relaxed text-justify break-words">
              Our Aadhaar No:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.parentAadhaar
                )} px-1 inline-block min-w-0`}
              >
                {formData.parentAadhaar || "0000 0000 0000"}
              </span>
              , Aadhaar No:{" "}
              <span
                className={`font-serif ${highlightIfEmpty(
                  formData.spouseAadhaar
                )} px-1 inline-block min-w-0`}
              >
                {formData.spouseAadhaar || "0000 0000 0000"}
              </span>
            </p>

            <p className="leading-relaxed text-justify">
              Do hereby solemnly affirm and declare as under:
            </p>

            {/* Manual Numbered List */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2">
                <span className="font-bold w-4 sm:w-6 flex-shrink-0">1.</span>
                <p className="text-justify leading-relaxed break-words">
                  That Birth Certificate No:{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.certificateNumber
                    )} px-1 inline-block min-w-0`}
                  >
                    {formData.certificateNumber || "_______"}
                  </span>{" "}
                  issued for our {formData.childRelation}{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.childName
                    )} px-1 inline-block min-w-0`}
                  >
                    {formData.childName || "_______"}
                  </span>{" "}
                  from (Chief Registrar of Births and Deaths, Govt of
                  Karnataka), the name of our {formData.childRelation} mentioned
                  as{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.incorrectName
                    )} px-1 inline-block min-w-0`}
                  >
                    {formData.incorrectName || "Incorrect Name"}
                  </span>
                  .
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold w-4 sm:w-6 flex-shrink-0">2.</span>
                <p className="text-justify leading-relaxed break-words">
                  That as per our {formData.childRelation}'s Aadhaar card the
                  given name is{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.correctName
                    )} px-1 inline-block min-w-0`}
                  >
                    {formData.correctName || "Correct Name"}
                  </span>
                  .
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold w-4 sm:w-6 flex-shrink-0">3.</span>
                <p className="text-justify leading-relaxed break-words">
                  We state that we wanted to change our {formData.childRelation}
                  's name in{" "}
                  {formData.childRelation === "Daughter" ? "her" : "his"} Birth
                  Certificate as per{" "}
                  {formData.childRelation === "Daughter" ? "her" : "his"}{" "}
                  Aadhaar Card that is{" "}
                  <span
                    className={`font-serif ${highlightIfEmpty(
                      formData.correctName
                    )} px-1 inline-block min-w-0`}
                  >
                    {formData.correctName || "Correct Name"}
                  </span>{" "}
                  which is correct name.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold w-4 sm:w-6 flex-shrink-0">4.</span>
                <p className="text-justify leading-relaxed break-words">
                  That we also required this affidavit for RE ISSUE the Birth
                  Certificate with correct name.
                </p>
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <p className="leading-relaxed text-justify break-words">
                Verified at{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.place
                  )} px-1 inline-block min-w-0`}
                >
                  {formData.place || "PLACE"}
                </span>{" "}
                on this{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.day
                  )} px-1 inline-block min-w-0`}
                >
                  {getDayWithSuffix(formData.day) || "XX"}
                </span>{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.month
                  )} px-1 inline-block min-w-0`}
                >
                  {formData.month || "XXXX"}
                </span>
                ,{" "}
                <span
                  className={`font-serif ${highlightIfEmpty(
                    formData.year
                  )} px-1 inline-block min-w-0`}
                >
                  {formData.year || "XXXX"}
                </span>
                , that the contents of the above said affidavit are true and
                correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="text-right mt-8 sm:mt-12 md:mt-16">
              <div className="inline-block">
                <p className="border-t border-black pt-1 text-sm sm:text-base">
                  (Signature of the Deponent)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCertificatePreview;
